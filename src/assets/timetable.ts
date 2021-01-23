import { TimetableT } from "@type/timetable"

export const initialState: TimetableT = {
  days: [],
  cards: [],
  subjects: [],
  teachers: [],
  validation: {
    has: [false, false],
    errors: [[], []],
    rows: [],
  },
}

export const initialSidebarState = {
  subject: "",
  card: {
    subject: -1,
    teacher: -1,
    room: "",
  },
}
