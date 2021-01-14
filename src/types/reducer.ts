import { LessonsType } from "./timetable"

export type ActionType =
  | "CREATE_SUBJECT"
  | "CREATE_CARD"
  | "CREATE_DAY"
  | "ADD_EVENT"
  | "ADD_TEACHER"
  | "DELETE_SUBJECT"
  | "DELETE_TEACHER"
  | "DELETE_CARD"
  | "ADD_LESSON"
  | "CHANGE_MAIN_DATE"

export interface Action {
  type: ActionType
}

export interface CreateSubjectAction extends Action {
  payload: { title: string }
}
export interface CreateCardAction extends Action {
  payload: { subject: number; teacher: number; room: number }
}

export interface CreateDayAction extends Action {
  payload: { date: number }
}

export interface AddEventAction extends Action {
  payload: { dayID: number }
}

export interface AddTeacherAction extends Action {
  payload: { teacher: string; subjectID: number }
}

export interface DeleteSubjectAction extends Action {
  payload: { subjectID: number }
}

export interface DeleteTeacherAction extends Action {
  payload: { subjectID: number; teacherID: number }
}

export interface DeleteCardAction extends Action {
  payload: { cardID: number }
}

export interface ChangeMainDateAction extends Action {
  payload: { newDate: Date }
}

export interface AddLessonAction extends Action {
  payload: {
    dayID: number
    eventID: number
    classNumber: LessonsType
    groupID: number
    isPair: boolean
    lessonID: number
    lessonNumber?: number
  }
}

export const isCreateSubjectAction = (action: Action): action is CreateSubjectAction =>
  action.type === "CREATE_SUBJECT"

export const isCreateCardAction = (action: Action): action is CreateCardAction =>
  action.type === "CREATE_CARD"

export const isCreateDayAction = (action: Action): action is CreateDayAction =>
  action.type === "CREATE_DAY"

export const isAddEventAction = (action: Action): action is AddEventAction =>
  action.type === "ADD_EVENT"

export const isAddTeacherAction = (action: Action): action is AddTeacherAction =>
  action.type === "ADD_TEACHER"

export const isDeleteSubjectAction = (action: Action): action is DeleteSubjectAction =>
  action.type === "DELETE_SUBJECT"

export const isDeleteTeacherAction = (action: Action): action is DeleteTeacherAction =>
  action.type === "DELETE_TEACHER"

export const isDeleteCardAction = (action: Action): action is DeleteCardAction =>
  action.type === "DELETE_CARD"

export const isChangeMainDateAction = (action: Action): action is ChangeMainDateAction =>
  action.type === "CHANGE_MAIN_DATE"

export const isAddLessonAction = (action: Action): action is AddLessonAction =>
  action.type === "ADD_LESSON"
