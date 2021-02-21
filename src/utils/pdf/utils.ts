import assets from "@assets/pdf"
import { LessonsType, TimetableT } from "@type/timetable"

/**
 * Function for generation of document name
 * @param classNumber Class number
 */
export const generateDocumentName = (classNumber: number): string =>
  `Raspisanie_${classNumber}_Klassy_07_Dek_12_Dek_2020-2021.xlsx`

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

  return `${subject.title}\nАуд. ${card.room}\n${data.teachers[card.teacher]}`
}
