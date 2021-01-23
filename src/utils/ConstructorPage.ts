import { SubjectT, CardT } from "../types/timetable"

export const generateTitle = (
  subjects: SubjectT[],
  cards: CardT[],
  teachers: string[],
  value: number
) => {
  if (value != -1) {
    return `${subjects[cards[value].subject].title} - ${teachers[cards[value].teacher]} - ${
      cards[value].room
    }`
  } else {
    return ""
  }
}
