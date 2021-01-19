import { Dispatch } from "react"
import { ReducerAction } from "./reducer"
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

export type LessonsType = "lessons10" | "lessons11" // List of lessons

export type EventT = {
  [a in LessonsType /* lessons10, lessons11 */]: number[][]
}

export type CardT = {
  subject: number // ID
  room: number // Number
  teacher: number // ID in teachers
  status: boolean // Indicates if card is deleted
}

export type SubjectT = {
  title: string
  teachers: number[] // teacher's IDs, allowed for this subject
  status: boolean // set false to mark as removed
}

export type UseTimetableHookFT = () => [TimetableT, Dispatch<ReducerAction>]
