import { Dispatch, SetStateAction } from "react"
import { ValidationStatusT } from "./validation"

export type TimetableT = {
  days: DayT[]
  cards: CardT[]
  subjects: SubjectT[]
  teachers: string[]
  validation: ValidationStatusT
}

export type DayT = {
  events: EventT[]
  date: number // epoch time
}

export type LessonsType = "lessons10" | "lessons11"

export type EventT = {
  [a in LessonsType]: number[][]
}

export type CardT = {
  subject: number // ID
  room: number // Number
  teacher: number // ID in subject
  status: boolean
}

export type SubjectT = {
  title: string
  teachers: number[] // teacher's IDs, allowed for this subject
  status: boolean
}

export type CreateSubjectFT = (title: string) => void

export type CreateCardFT = (subject: number, teacher: number, room: number) => void

export type CreateDayFT = (date: number) => void

export type AddEventFT = (dayId: number) => void

export type AddTeacherFT = (teacher: string, subjectId: number) => void

export type DeleteSubjectFT = (subjectId: number) => void

export type DeleteTeacherFT = (subjectId: number, teacherId: number) => void

export type DeleteCardFT = (cardId: number) => void

export type ChangeMainDateFT = (newDate: Date) => void

export type AddLessonFT = (
  dayId: number,
  eventId: number,
  classNumber: LessonsType,
  groupId: number,
  isPair: boolean,
  lessonId: number,
  lessonNumber?: number,
) => Promise<any>

export type SetValidationErrorsFT = Dispatch<SetStateAction<ValidationStatusT>>

export type UseTimetableHookFT = () => {
  state: TimetableT
  createSubject: CreateSubjectFT
  createCard: CreateCardFT
  createDay: CreateDayFT
  addLesson: AddLessonFT
  addEvent: AddEventFT
  addTeacher: AddTeacherFT
  deleteTeacher: DeleteTeacherFT
  deleteSubject: DeleteSubjectFT
  deleteCard: DeleteCardFT
  changeMainDate: ChangeMainDateFT
  setValidationErrors: SetValidationErrorsFT
}
