import assets from "../../assets/pdf";
import { SpanGenerator } from "../../types/pdf";
import { TimetableT } from "../../types/timetable";

export const generateDocumentName = (classNumber: number): string =>
  `Raspisanie_${classNumber}_Klassy_07_Dek_12_Dek_2020-2021.pdf`;

export const getDate = (): string => {
  const now = new Date();
  return `${now.getDate()} ${
    assets.months[now.getMonth()]
  } ${now.getFullYear()} года`;
};

export const getGroupNumber = (gen: number): number => {
  while (gen > 9) {
    gen -= 9;
  }

  return gen;
};

export const generateDayHeader = (
  firstDay: number,
  dayNumber: number
): string => {
  const date = new Date(firstDay);
  date.setDate(date.getDate() + dayNumber);

  return `${
    assets.weekdays[date.getDay()]
  } ${date.getDate().toPrecision().toString().padStart(2, "0")} ${
    assets.months[date.getMonth()]
  }`;
};

export const generateEventContent = (
  data: TimetableT,
  cardId: number
): string => {
  const card = data.cards[cardId];
  const subject = data.subjects[card.subject];

  return `${subject.title} Ауд. ${card.room} ${subject.teachers[card.teacher]}`;
};

export const rowSpanGenerator: SpanGenerator = (
  event,
  lessonIndex,
  groupIndex
) =>
  lessonIndex == 0 &&
  event.lessons[0][groupIndex] == event.lessons[1][groupIndex] &&
  colSpanGenerator(event, 0, groupIndex) ==
    colSpanGenerator(event, 1, groupIndex)
    ? 2
    : 1;

export const colSpanGenerator: SpanGenerator = (
  event,
  lessonIndex,
  groupIndex
) =>
  event.lessons[lessonIndex][groupIndex] ==
  event.lessons[lessonIndex][groupIndex + 1]
    ? 2
    : 1;
