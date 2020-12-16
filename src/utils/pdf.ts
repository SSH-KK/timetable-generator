import pdfMake from "pdfmake/build/pdfmake";
import { TableCell, TDocumentDefinitions } from "pdfmake/interfaces";

import { DocumentStylesT } from "../types/pdf";
import { TimetableT } from "../types/timetable";

import vfs from "./vfsFonts";

pdfMake.vfs = vfs;

pdfMake.fonts = {
  PTSerif: {
    normal: "PTSerifRegular.ttf",
    bold: "PTSerifBold.ttf",
  },
};

const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
] as const;

const weekDays = [
  "ПОНЕДЕЛЬНИК",
  "ВТОРНИК",
  "СРЕДА",
  "ЧЕТВЕРГ",
  "ПЯТНИЦА",
  "СУББОТА",
] as const;

const lessonTimes = [
  "8.30-9.10",
  "9.20-10.00",
  "10.15-10.55",
  "11.10-11.50",
  "12.00-12.40",
  "12.50-13.30",
] as const;

const generateDocumentName = (classNumber: number): string =>
  `Raspisanie_${classNumber}_Klassy_07_Dek_12_Dek_2020-2021.pdf`;

const getDate = () => {
  const now = new Date();
  return `${now.getDate()} ${months[now.getDay()]} ${now.getFullYear()} года`;
};

const getGroupNumber = (gen: number): number => {
  while (gen > 9) {
    gen -= 9;
  }

  return gen;
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
          "4.47%",
          "4.37%",
          "8.7%",
          "13.7%",
          "13.7%",
          "13.7%",
          "13.7%",
          "13.7%",
          "13.7%",
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

const documentStyles: DocumentStylesT = {
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
};

const generateDayHeader = (firstDay: number, dayNumber: number) => {
  const date = new Date(firstDay);
  date.setDate(date.getDate() + dayNumber);

  return `${
    weekDays[date.getDay()]
  } ${date.getDate().toPrecision().toString().padStart(2, "0")} ${
    months[date.getMonth()]
  }`;
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
    ...day.events.map<TableCell[]>((event, eventId) =>
      event.lessons.flatMap<TableCell[]>(lesson =>
        lesson.map((lessonElement, lessonElementIndex) => [
          [
            lessonElementIndex == 0
              ? { text: eventId.toString(), rowSpan: 2 }
              : {},
          ],
          { text: (eventId * 2 - lessonElementIndex).toString() },
          { text: lessonTimes[eventId * 2 - lessonElementIndex] },
          [
            event.lessons[0] == event.lessons[1]
              ? [{ text: data.cards[lessonElement] }]
              : {},
          ],
        ])
      )
    ),
  ]);

export const createDocument = (
  classNumber: number,
  generation: number,
  timetableState: TimetableT,
  firstDay: number
): void => {
  const document = generateDocument(
    classNumber,
    generation,
    timetableState,
    firstDay
  );

  const styledDocument = { ...document, ...documentStyles };

  pdfMake.createPdf(styledDocument).download(generateDocumentName(classNumber));
};
