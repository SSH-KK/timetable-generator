import pdfMake from "pdfmake/build/pdfmake";
import { TableCell, TDocumentDefinitions } from "pdfmake/interfaces";

import { TimetableT } from "../../types/timetable";
import dataExample from "../../../dataExample.json";

import vfs from "../vfsFonts";
import assets from "../../assets/pdf";
import {
  colSpanGenerator,
  generateDayHeader,
  generateDocumentName,
  generateEventContent,
  getDate,
  getGroupNumber,
  rowSpanGenerator,
} from "./utils";

pdfMake.vfs = vfs;

pdfMake.fonts = {
  PTSerif: {
    normal: "PTSerifRegular.ttf",
    bold: "PTSerifBold.ttf",
  },
};

const generateDocument = (
  classNumber: number,
  generation: number,
  timetableState: TimetableT,
  firstDay: number
): TDocumentDefinitions => ({
  content: [
    {
      text: "УТВЕРЖДЕН",
      style: "ral",
    },
    {
      text: "приказом БОУ «Югорский физико-математический лицей-интернат»",
      style: "ral",
    },
    {
      text: `№ от ${getDate()}`,
      style: "ral",
      margin: [0, 0, 0, 10],
    },
    {
      table: {
        widths: [
          "4.2%",
          "4%",
          "9%",
          "13.8%",
          "13.8%",
          "13.8%",
          "13.8%",
          "13.8%",
          "13.8%",
        ],
        body: [
          [
            { text: "Пара", style: "bold", rowSpan: 2, margin: [0, 10, 0, 0] },
            { text: "Урок", style: "bold", rowSpan: 2, margin: [0, 10, 0, 0] },
            { text: "Время", style: "bold", rowSpan: 2, margin: [0, 10, 0, 0] },
            ...["А", "Б", "В"].flatMap<TableCell>(word => [
              {
                text: `${classNumber} «${word}» класс`,
                style: "bold",
                colSpan: 2,
              },
              "",
            ]),
          ],
          [
            "",
            "",
            "",
            ...[1, 2, 3, 4, 5, 6].map<TableCell>(groupIndex => ({
              style: "bold",
              text: `${getGroupNumber(generation)}${groupIndex} группа`,
            })),
          ],
          ...formatData(timetableState, firstDay),
        ],
      },
    },
  ],
});

const documentStyles: Omit<TDocumentDefinitions, "content"> = {
  defaultStyle: {
    font: "PTSerif",
    fontSize: 12,
    alignment: "center",
  },
  styles: {
    ral: {
      alignment: "right",
    },
    bold: {
      bold: true,
    },
  },
  pageOrientation: "landscape",
  pageMargins: [10, 10, 10, 10],
};

const formatData = (data: TimetableT, firstDay: number): TableCell[][] =>
  data.days.flatMap<TableCell[]>((day, dayIndex) => [
    [
      {
        text: generateDayHeader(firstDay, dayIndex),
        style: ["bold"],
        colSpan: 9,
        fillColor: "#a6a6a6",
      },
    ],
    ...day.events.flatMap<TableCell[]>((event, eventIndex) =>
      event.lessons.map<TableCell>((lesson, lessonIndex) => [
        ...[
          lessonIndex == 0
            ? { text: (eventIndex + 1).toString(), rowSpan: 2 }
            : {},
        ],
        { text: (eventIndex * 2 + lessonIndex + 1).toString() },
        { text: assets.lessonTimes[eventIndex * 2 + lessonIndex] },
        ...lesson.flatMap((lessonElement, groupIndex) => [
          data.cards[lessonElement]
            ? {
                text: generateEventContent(data, lessonElement),
                rowSpan: rowSpanGenerator(event, lessonIndex, groupIndex),
                colSpan: colSpanGenerator(event, lessonIndex, groupIndex),
              }
            : {
                text: "",
                rowSpan:
                  lessonIndex == 0 && !data.cards[event.lessons[1][groupIndex]]
                    ? 2
                    : 1,
              },
        ]),
      ])
    ),
  ]);

const rotateArray = (data: TimetableT) => ({
  ...data,
  days: data.days.map(day => ({
    ...day,
    events: day.events.map(event => ({
      lessons: Array(2)
        .fill(0)
        .map((_, index) => event.lessons.map(lesson => lesson[index])),
    })),
  })),
});

const createDocument = (
  classNumber: number,
  generation: number,
  timetableState: TimetableT,
  firstDay: number
): void => {
  const data = timetableState.days.length ? timetableState : dataExample;

  const document = generateDocument(
    classNumber,
    generation,
    rotateArray(data),
    firstDay
  );

  const styledDocument = { ...document, ...documentStyles };

  pdfMake.createPdf(styledDocument).download(generateDocumentName(classNumber));
};

export { createDocument };