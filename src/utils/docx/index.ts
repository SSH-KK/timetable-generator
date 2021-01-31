import { TimetableT } from "@type/timetable"
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
} from "docx"
import { getDate, getGroupNumber } from "./utils"

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
    ],

    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
  })

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

  Packer.toBlob(document).then(blob => saveAs(blob, "doc.docx"))
}
