import { SubjectT, CardT, DayT, LessonsType } from "@type/timetable"
import assets from "@assets/pdf"
import { getGroupNumber } from "./docx/utils"

export const generateTitle = (
  subjects: SubjectT[],
  cards: CardT[],
  teachers: string[],
  value: number
): string => {
  if (value != -1) {
    return `${subjects[cards[value].subject].title} - ${teachers[cards[value].teacher]} - ${
      cards[value].room
    }`
  } else {
    return ""
  }
}

export const generateDayTitle = (day: DayT): string =>
  `${new Date(day.date).getDate()} ${
    assets.weekdays[new Date(day.date).getDay() - 1 != -1 ? new Date(day.date).getDay() - 1 : 6]
  }`

export const getGenerationNumber = (date: Date): number =>
  date.getMonth() <= 5 ? (date.getFullYear() % 2000) - 1 : date.getFullYear() % 2000

export const getGenerationTitle = (
  date: Date,
  classNumber: LessonsType,
  groupNum: number
): string =>
  `${getGroupNumber(
    getGenerationNumber(date) - 1 - (classNumber == "lessons10" ? 0 : 1)
  )}${groupNum} группа`
