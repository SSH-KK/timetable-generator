import produce from "immer"
import { initialState } from "../../assets/timetable"
import {
  ReducerAction,
  isCreateCardAction,
  isCreateDayAction,
  isCreateSubjectAction,
  isAddEventAction,
  isAddTeacherAction,
  isDeleteSubjectAction,
  isDeleteTeacherAction,
  isDeleteCardAction,
  isChangeMainDateAction,
  isAddLessonAction,
  isSetStateFromLocalStorageAction,
  isDeleteEventAction,
} from "../../types/reducer"
import { TimetableT } from "../../types/timetable"
import { ValidationErrorT } from "../../types/validation"
import { initialEventLessonsGenrator } from "../timetable"
import { validate } from "../validation"

export const reducer = produce(
  (draft: TimetableT = initialState, action: ReducerAction): TimetableT => {
    if (isCreateSubjectAction(action))
      draft.subjects.push({ title: action.payload.title, teachers: [], status: true })

    if (isSetStateFromLocalStorageAction(action)) return JSON.parse(action.payload.ldata)

    if (isCreateCardAction(action)) draft.cards.push({ ...action.payload, status: true })

    if (isCreateDayAction(action)) {
      draft.days.push({ ...action.payload, events: [] })
      draft.validation.errors.forEach(errorsClass => errorsClass.push([]))
      draft.validation.rows.push([])
    }

    if (isAddEventAction(action)) {
      draft.days[action.payload.dayID].events.push({
        lessons10: initialEventLessonsGenrator(),
        lessons11: initialEventLessonsGenrator(),
      })

      draft.validation.errors.forEach(errorsClass =>
        errorsClass[action.payload.dayID].push(Array<ValidationErrorT>(6).fill({ id: -1 }))
      )

      draft.validation.rows[action.payload.dayID].push([false, false])
    }

    if (isAddTeacherAction(action)) {
      const teacherPos = draft.teachers.indexOf(action.payload.teacher)
      const teacherID = teacherPos < 0 ? draft.teachers.length : teacherPos

      if (teacherPos != teacherID) draft.teachers.push(action.payload.teacher)

      draft.subjects[action.payload.subjectID].teachers.push(teacherID)
    }

    if (isDeleteSubjectAction(action)) draft.subjects[action.payload.subjectID].status = false

    if (isDeleteTeacherAction(action)) {
      const index = draft.subjects[action.payload.subjectID].teachers.indexOf(
        action.payload.teacherID
      )

      if (index !== -1) draft.subjects[action.payload.subjectID].teachers.splice(index, 1)
    }

    if (isDeleteCardAction(action)) draft.cards[action.payload.cardID].status = false

    if (isChangeMainDateAction(action))
      draft.days.forEach(
        (day, dayIndex) =>
          (day.date = action.payload.newDate.getTime() + 24 * 3600 * 1000 * dayIndex)
      )

    if (isAddLessonAction(action)) {
      const {
        dayID,
        eventID,
        classNumber,
        groupID,
        isPair,
        lessonID,
        lessonNumber,
      } = action.payload

      draft.days[dayID].events[eventID][classNumber].forEach(
        (lesson, lessonIndex) =>
          (lesson[groupID] = isPair || lessonIndex == lessonNumber ? lessonID : lesson[groupID])
      )

      draft.validation = validate(draft, dayID, eventID)
    }

    if (isDeleteEventAction(action))
      draft.days[action.payload.dayID].events.splice(action.payload.eventID, 1)

    return draft
  },
  {}
)
