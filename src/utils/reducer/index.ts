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
} from "../../types/reducer"
import { TimetableT } from "../../types/timetable"
import { ValidationErrorT } from "../../types/validation"
import { initialEventLessonsGenrator } from "../timetable"

export const reducer = (state: TimetableT = initialState, action: ReducerAction): TimetableT => {
  const errors = state.validation.errors

  if (isCreateSubjectAction(action))
    return {
      ...state,
      subjects: [...state.subjects, { title: action.payload.title, teachers: [], status: true }],
    }

  if (isCreateCardAction(action))
    return {
      ...state,
      cards: [...state.cards, { ...action.payload, status: true }],
    }

  if (isCreateDayAction(action))
    return {
      ...state,
      days: [...state.days, { ...action.payload, events: [] }],
      validation: {
        ...state.validation,
        errors: errors.map(clas => [...clas, []]),
      },
    }

  if (isAddEventAction(action))
    return {
      ...state,
      days: state.days.map((day, dayIndex) =>
        dayIndex == action.payload.dayID
          ? {
              ...day,
              events: [
                ...day.events,
                {
                  lessons10: initialEventLessonsGenrator(),
                  lessons11: initialEventLessonsGenrator(),
                },
              ],
            }
          : day
      ),
      validation: {
        ...state.validation,
        errors: state.validation.errors.map(clas =>
          clas.map((day, dayIndex) =>
            dayIndex == action.payload.dayID
              ? [...day, Array<ValidationErrorT>(6).fill({ id: -1 })]
              : day
          )
        ),
      },
    }

  if (isAddTeacherAction(action)) {
    const teacherPos = state.teachers.indexOf(action.payload.teacher)
    const teacherID = teacherPos < 0 ? state.teachers.length : teacherPos

    return {
      ...state,
      teachers:
        teacherPos === teacherID ? state.teachers : [...state.teachers, action.payload.teacher],
      subjects: state.subjects.map((subject, subjectIndex) =>
        subjectIndex == action.payload.subjectID
          ? {
              title: subject.title,
              status: subject.status,
              teachers: [...subject.teachers, teacherID],
            }
          : subject
      ),
    }
  }

  if (isDeleteSubjectAction(action))
    return {
      ...state,
      subjects: state.subjects.map((subject, subjectIndex) =>
        subjectIndex == action.payload.subjectID ? { ...subject, status: false } : subject
      ),
    }

  if (isDeleteTeacherAction(action))
    return {
      ...state,
      subjects: state.subjects.map((subject, subjectIndex) =>
        subjectIndex == action.payload.subjectID
          ? {
              ...subject,
              teachers: subject.teachers.filter(teacherID => teacherID != action.payload.teacherID),
            }
          : subject
      ),
    }

  if (isDeleteCardAction(action))
    return {
      ...state,
      cards: state.cards.map((card, cardIndex) =>
        cardIndex == action.payload.cardID ? { ...card, status: false } : card
      ),
    }

  if (isChangeMainDateAction(action))
    return {
      ...state,
      days: state.days.map((day, dayIndex) => ({
        ...day,
        date: action.payload.newDate.getTime() + 24 * 3600 * 1000 * dayIndex,
      })),
    }

  if (isAddLessonAction(action)) {
    const { dayID, eventID, classNumber, groupID, isPair, lessonID, lessonNumber } = action.payload
    return {
      ...state,
      days: state.days.map((day, dayIndex) =>
        dayIndex == dayID
          ? {
              ...day,
              events: day.events.map((event, eventIndex) =>
                eventIndex == eventID
                  ? {
                      ...event,
                      [classNumber]: event[classNumber].map((lesson, lessonIndex) =>
                        lesson.map((card, cardIndex) =>
                          cardIndex == groupID
                            ? isPair
                              ? lessonID
                              : lessonIndex == lessonNumber
                              ? lessonID
                              : card
                            : card
                        )
                      ),
                    }
                  : event
              ),
            }
          : day
      ),
    }
  }

  return state
}
