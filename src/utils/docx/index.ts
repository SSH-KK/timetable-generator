import { LessonsType, TimetableT } from "@type/timetable"
import {
  Document,
  AlignmentType,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  VerticalMergeType,
  WidthType,
  ShadingType,
} from "docx"
import {
  shouldColSpan,
  generateDayHeader,
  generateEventContent,
  getDate,
  getGroupNumber,
  shouldRowSpan,
} from "./utils"
import assets from "@assets/docx"

const header = (date: number) => [
  new Paragraph({
    alignment: AlignmentType.RIGHT,
    text: "утверждён".toUpperCase(),
  }),
  new Paragraph({
    alignment: AlignmentType.RIGHT,
    text: "приказом БОУ «Югорский физико-математический лицей-интернат»",
  }),
  new Paragraph({
    text: `№ от ${getDate(date)}`,
    alignment: AlignmentType.RIGHT,
  }),
]

const generateTable = (
  classNumber: number,
  generation: number,
  timetableState: TimetableT,
  firstDay: number
) =>
  new Table({
    rows: [
      new TableRow({
        children: [
          ...[
            { text: "Пара", width: 4.2 },
            { text: "Урок", width: 4 },
            { text: "Время", width: 9 },
            ...["А", "Б", "В"].map(char => ({
              text: `${classNumber} «${char}» класс`,
              width: 13.8,
            })),
          ].map(
            (content, index) =>
              new TableCell({
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: content.width,
                  type: WidthType.PERCENTAGE,
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: content.text,
                        bold: true,
                      }),
                    ],
                  }),
                ],
                verticalMerge: index <= 2 ? VerticalMergeType.RESTART : undefined,
                columnSpan: index >= 3 ? 2 : undefined,
              })
          ),
        ],
      }),
      new TableRow({
        children: [
          ...Array(3).fill(
            new TableCell({
              children: [],
              verticalMerge: VerticalMergeType.CONTINUE,
            })
          ),
          ...Array(6)
            .fill("")
            .map(
              (_, groupLastNumberIndex) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({
                          text: `${getGroupNumber(generation)}${groupLastNumberIndex + 1} группа`,
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                })
            ),
        ],
      }),
      ...formatData(timetableState, firstDay, classNumber),
    ],

    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
  })

const formatData = (data: TimetableT, firstDay: number, classNumber: number): TableRow[] =>
  data.days.flatMap((day, dayIndex) => [
    new TableRow({
      children: [
        new TableCell({
          shading: { fill: "A6A6A6", val: ShadingType.CLEAR, color: "auto" },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: generateDayHeader(firstDay, dayIndex), bold: true })],
            }),
          ],
          columnSpan: 9,
        }),
      ],
    }),
    ...day.events.flatMap((event, eventIndex) =>
      event[`lessons${classNumber}` as LessonsType].map(
        (lesson, lessonIndex) =>
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph((eventIndex + 1).toString())],
                verticalMerge:
                  lessonIndex === 0 ? VerticalMergeType.RESTART : VerticalMergeType.CONTINUE,
              }),
              new TableCell({
                children: [new Paragraph((eventIndex * 2 + lessonIndex + 1).toString())],
              }),
              new TableCell({
                children: [new Paragraph(assets.lessonTimes[eventIndex * 2 + lessonIndex])],
              }),
              ...lesson.flatMap((lessonElement, groupIndex) =>
                (groupIndex > 0 &&
                  shouldColSpan(event, lessonIndex, groupIndex - 1, classNumber)) ||
                (lessonIndex == 1 && shouldRowSpan(event, 0, groupIndex, classNumber))
                  ? []
                  : [
                      data.cards[lessonElement]
                        ? new TableCell({
                            children: [new Paragraph(generateEventContent(data, lessonElement))],
                            rowSpan: shouldRowSpan(event, lessonIndex, groupIndex, classNumber)
                              ? 2
                              : 1,
                            columnSpan: shouldColSpan(event, lessonIndex, groupIndex, classNumber)
                              ? 2
                              : 1,
                          })
                        : new TableCell({
                            children: [],
                            verticalMerge: !data.cards[
                              event[`lessons${classNumber}` as LessonsType][1][groupIndex]
                            ]
                              ? lessonIndex === 0
                                ? VerticalMergeType.RESTART
                                : VerticalMergeType.CONTINUE
                              : undefined,
                          }),
                    ]
              ),
            ],
          })
      )
    ),
  ])

export default (
  classNumber: number,
  generation: number,
  timetableState: TimetableT,
  firstDay: number
): void => {
  const document = new Document()

  document.addSection({
    children: [
      ...header(firstDay),
      generateTable(classNumber, generation, timetableState, firstDay),
    ],
  })

  console.log(document)

  Packer.toBlob(document).then(blob => saveAs(blob, "doc.docx"))
}
