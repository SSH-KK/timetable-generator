import assets from "../../assets/pdf"
import { SpanGenerator } from "../../types/pdf"
import { LessonsType, TimetableT } from "../../types/timetable"

/**
 * Function for generation of document name
 * @param classNumber Class number
 */
export const generateDocumentName = (classNumber: number): string =>
  `Raspisanie_${classNumber}_Klassy_07_Dek_12_Dek_2020-2021.pdf`

/**
 * Function for data formation for document header
 */
export const getDate = (): string => {
  const now = new Date()
  return `${now.getDate()} ${assets.months[now.getMonth()]} ${now.getFullYear()} года`
}

/**
 * Function for getting first digit of group number
 * @param gen Generation
 */
export const getGroupNumber = (gen: number): number => {
  return gen % 9 == 0 ? 9 : (gen % 9) - 1
}

/**
 * Function for day header generation
 * @param firstDay First day of timetable
 * @param dayNumber Day number
 */
export const generateDayHeader = (firstDay: number, dayNumber: number): string => {
  const date = new Date(firstDay)
  date.setDate(date.getDate() + dayNumber)

  return `${assets.weekdays[date.getDay()]} ${date
    .getDate()
    .toPrecision()
    .toString()
    .padStart(2, "0")} ${assets.months[date.getMonth()]}`
}

/**
 * Function for lesson text generation
 * @param data State returned by useTimetable hook
 * @param cardId Card ID
 */
export const generateEventContent = (data: TimetableT, cardId: number): string => {
  const card = data.cards[cardId]
  const subject = data.subjects[card.subject]

  return `${subject.title} Ауд. ${card.room} ${data.teachers[data.subjects[card.subject].teachers[card.teacher]]}`
}

/**
 * Function for checking if row span is needed
 * @param event Event object
 * @param lessonIndex Lesson index
 * @param groupIndex Group index
 * @param classNumber Class number
 */
export const rowSpanGenerator: SpanGenerator = (event, lessonIndex, groupIndex, classNumber) =>
  lessonIndex == 0 &&
  event[`lessons${classNumber}` as LessonsType][0][groupIndex] ==
    event[`lessons${classNumber}` as LessonsType][1][groupIndex] &&
  colSpanGenerator(event, 0, groupIndex, classNumber) ==
    colSpanGenerator(event, 1, groupIndex, classNumber)
    ? 2
    : 1
/**
 * Function for checking if column span is needed
 * @param event Event object
 * @param lessonIndex Lesson index
 * @param groupIndex Group index
 * @param classNumber Class number
 */
export const colSpanGenerator: SpanGenerator = (event, lessonIndex, groupIndex, classNumber) =>
  event[`lessons${classNumber}` as LessonsType][lessonIndex][groupIndex] ==
  event[`lessons${classNumber}` as LessonsType][lessonIndex][groupIndex + 1]
    ? 2
    : 1
