import { LessonsType } from "../timetable"

export enum ActionType {
  CREATE_SUBJECT,
  CREATE_CARD,
  CREATE_DAY,
  ADD_EVENT,
  ADD_TEACHER,
  DELETE_SUBJECT,
  DELETE_TEACHER,
  DELETE_CARD,
  ADD_LESSON,
  CHANGE_MAIN_DATE,
  SET_STATE_FROM_LOCAL_STORAGE,
  DELETE_EVENT,
  CLEAR_STATE
}

interface Action {
  type: ActionType
}

export { Action as ReducerAction }

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

export interface AddLessonAction extends Action {
  payload: { dayID: number; eventID: number; classNumber: LessonsType; groupID: number; isPair: boolean; lessonID: number; lessonNumber: number }
}

export interface ChangeMainDateAction extends Action {
  payload: { newDate: Date }
}

export interface SetStateFromLocalStorageAction extends Action {
  payload: { ldata: string }
}

export interface DeleteEventAction extends Action {
  payload: { dayID: number; eventID: number }
}

export interface ClearStateAction extends Action {
  payload: Record<string, never>
}

export function isCreateSubjectAction(action: Action): action is CreateSubjectAction {
  return action.type === ActionType.CREATE_SUBJECT
}

export function isCreateCardAction(action: Action): action is CreateCardAction {
  return action.type === ActionType.CREATE_CARD
}

export function isCreateDayAction(action: Action): action is CreateDayAction {
  return action.type === ActionType.CREATE_DAY
}

export function isAddEventAction(action: Action): action is AddEventAction {
  return action.type === ActionType.ADD_EVENT
}

export function isAddTeacherAction(action: Action): action is AddTeacherAction {
  return action.type === ActionType.ADD_TEACHER
}

export function isDeleteSubjectAction(action: Action): action is DeleteSubjectAction {
  return action.type === ActionType.DELETE_SUBJECT
}

export function isDeleteTeacherAction(action: Action): action is DeleteTeacherAction {
  return action.type === ActionType.DELETE_TEACHER
}

export function isDeleteCardAction(action: Action): action is DeleteCardAction {
  return action.type === ActionType.DELETE_CARD
}

export function isAddLessonAction(action: Action): action is AddLessonAction {
  return action.type === ActionType.ADD_LESSON
}

export function isChangeMainDateAction(action: Action): action is ChangeMainDateAction {
  return action.type === ActionType.CHANGE_MAIN_DATE
}

export function isSetStateFromLocalStorageAction(action: Action): action is SetStateFromLocalStorageAction {
  return action.type === ActionType.SET_STATE_FROM_LOCAL_STORAGE
}

export function isDeleteEventAction(action: Action): action is DeleteEventAction {
  return action.type === ActionType.DELETE_EVENT
}

export function isClearStateAction(action: Action): action is ClearStateAction {
  return action.type === ActionType.CLEAR_STATE
}
