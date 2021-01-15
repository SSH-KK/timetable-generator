import { TimetableT } from "../types/timetable"

export const initialState: TimetableT = {
  days: [],
  cards: [],
  subjects: [],
  teachers: [],
  validation: {
    has: [false, false],
    errors: [[], []],
  },
}
