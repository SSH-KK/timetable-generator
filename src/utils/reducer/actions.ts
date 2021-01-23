import {
  ActionType,
  AddEventAction,
  AddLessonAction,
  AddTeacherAction,
  ChangeMainDateAction,
  ClearStateAction,
  CreateCardAction,
  CreateDayAction,
  CreateSubjectAction,
  DeleteCardAction,
  DeleteEventAction,
  DeleteSubjectAction,
  DeleteTeacherAction,
  SetStateFromLocalStorageAction,
} from "@type/reducer"

export const setStateFromLocalStorageAction = (
  payload: SetStateFromLocalStorageAction["payload"]
): SetStateFromLocalStorageAction => ({
  type: ActionType.SET_STATE_FROM_LOCAL_STORAGE,
  payload,
})

export const createSubjectAction = (
  payload: CreateSubjectAction["payload"]
): CreateSubjectAction => ({
  type: ActionType.CREATE_SUBJECT,
  payload,
})

export const createCardAction = (payload: CreateCardAction["payload"]): CreateCardAction => ({
  type: ActionType.CREATE_CARD,
  payload,
})

export const createDayAction = (payload: CreateDayAction["payload"]): CreateDayAction => ({
  type: ActionType.CREATE_DAY,
  payload,
})

export const addEventAction = (payload: AddEventAction["payload"]): AddEventAction => ({
  type: ActionType.ADD_EVENT,
  payload,
})

export const addTeacherAction = (payload: AddTeacherAction["payload"]): AddTeacherAction => ({
  type: ActionType.ADD_TEACHER,
  payload,
})

export const deleteSubjectAction = (
  payload: DeleteSubjectAction["payload"]
): DeleteSubjectAction => ({
  type: ActionType.DELETE_SUBJECT,
  payload,
})

export const deleteTeacherAction = (
  payload: DeleteTeacherAction["payload"]
): DeleteTeacherAction => ({
  type: ActionType.DELETE_TEACHER,
  payload,
})

export const deleteCardAction = (payload: DeleteCardAction["payload"]): DeleteCardAction => ({
  type: ActionType.DELETE_CARD,
  payload,
})

export const changeMainDateAction = (
  payload: ChangeMainDateAction["payload"]
): ChangeMainDateAction => ({
  type: ActionType.CHANGE_MAIN_DATE,
  payload,
})

export const addLessonAction = (payload: AddLessonAction["payload"]): AddLessonAction => ({
  type: ActionType.ADD_LESSON,
  payload,
})

export const deleteEventAction = (payload: DeleteEventAction["payload"]): DeleteEventAction => ({
  type: ActionType.DELETE_EVENT,
  payload,
})

export const clearStateAction = (payload: ClearStateAction["payload"]): ClearStateAction => ({
  type: ActionType.CLEAR_STATE,
  payload,
})
