import { useState, useEffect, useRef, useCallback } from "react"
import {
  UseTimetableHookFT,
  CreateCardFT,
  CreateSubjectFT,
  CreateDayFT,
  AddEventFT,
  AddLessonFT,
  AddTeacherFT,
  DeleteTeacherFT,
  DeleteSubjectFT,
  DeleteCardFT,
  ChangeMainDateFT,
  DayT,
  CardT,
  SubjectT,
} from "./types/timetable"
import { ValidationErrorT, ValidationStatusT } from "./types/validation"
import { initialEventLessonsGenrator } from "./utils/timetable"

export const useTimetable: UseTimetableHookFT = () => {
  
  const useStateWithPromise = <S>(
    initialState: S | (() => S)
  ): [S, (stateAction: S | ((prev: S) => S)) => Promise<unknown>] => {
    const [state, setState] = useState(initialState)
    const resolverRef = useRef<typeof setState | null>(null)

    useEffect(() => {
      if (resolverRef.current) {
        resolverRef.current(state)
        resolverRef.current = null
      }
    }, [resolverRef.current, state])

    const handleSetState = useCallback(
      stateAction => {
        setState(stateAction)
        return new Promise(resolve => {
          resolverRef.current = resolve
        })
      },
      [setState]
    )

    return [state, handleSetState]
  }

  const [cardState, setCardState] = useState<CardT[]>([])
  const [dayState, setDayState] = useStateWithPromise<DayT[]>([])
  const [subjectState, setSubjectState] = useState<SubjectT[]>([])
  const [teacherState, setTeacherState] = useState<string[]>([])
  const [errorState, setErrorState] = useState<ValidationStatusT>({
    has: [false, false],
    errors: [[], []],
  })

  const createSubject: CreateSubjectFT = title => {
    const newSubjectID = subjectState.length
    setSubjectState(prev => [...prev, { title, teachers: [], status: true }])
  }

  const createCard: CreateCardFT = (subject, teacher, room) => {
    setCardState(prev => [...prev, { subject, teacher, room, status: true }])
  }

  const createDay: CreateDayFT = date => {
    setDayState(prev => [...prev, { date, events: [] }])
    setErrorState(prev => ({
      ...prev,
      errors: prev.errors.map(clas => [...clas, []]),
    }))
  }

  const changeMainDate: ChangeMainDateFT = newDate => {
    const date = new Date(newDate)
    setDayState(prev =>
      prev.map((day, dayIndex) => ({ ...day, date: date.getTime() + 24 * 3600 * 1000 * dayIndex }))
    )
  }

  const addTeacher: AddTeacherFT = (teacher, subjectId) => {
    let teacherID = teacherState.indexOf(teacher)
    if (teacherID < 0) {
      setTeacherState(prev => {
        teacherID = prev.length
        return [...prev, teacher]
      })
    }

    setSubjectState(subjects =>
      subjects.map((subject, subjectIndex) =>
        subjectIndex == subjectId
          ? {
              title: subject.title,
              status: subject.status,
              teachers: [...subject.teachers, teacherID],
            }
          : subject
      )
    )
  }

  const deleteSubject: DeleteSubjectFT = subjectId => {
    setSubjectState(subjects =>
      subjects.map((subject, subjectIndex) =>
        subjectIndex == subjectId ? { ...subject, status: false } : subject
      )
    )
  }

  const deleteTeacher: DeleteTeacherFT = (subjectId, teacherId) => {
    setSubjectState(subjects =>
      subjects.map((subject, subjectIndex) =>
        subjectIndex == subjectId
          ? {
              title: subject.title,
              status: subject.status,
              teachers: subject.teachers.filter(teacher => teacher != teacherId),
            }
          : subject
      )
    )
  }

  const deleteCard: DeleteCardFT = cardId => {
    setCardState(cards =>
      cards.map((card, cardIndex) => (cardIndex == cardId ? { ...card, status: false } : card))
    )
  }

  const addEvent: AddEventFT = dayId => {
    setDayState(days =>
      days.map((day, i) =>
        i == dayId
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
      )
    )

    setErrorState(prev => ({
      ...prev,
      errors: prev.errors.map(clas =>
        clas.map((day, dayIndex) =>
          dayIndex == dayId ? [...day, Array<ValidationErrorT>(6).fill({ id: -1 })] : day
        )
      ),
    }))
  }

  const addLesson: AddLessonFT = (
    dayId,
    eventId,
    classNumber,
    groupId,
    isPair,
    lessonId,
    lessonNumber
  ) =>
    setDayState(days =>
      days.map((day, dayIndex) =>
        dayIndex == dayId
          ? {
              ...day,
              events: day.events.map((event, eventIndex) =>
                eventIndex == eventId
                  ? {
                      ...event,
                      [classNumber]: event[classNumber].map((lesson, lessonIndex) =>
                        lesson.map((card, cardId) =>
                          cardId == groupId
                            ? isPair
                              ? lessonId
                              : lessonIndex == lessonNumber
                              ? lessonId
                              : card
                            : card
                        )
                      ),
                    }
                  : event
              ),
            }
          : day
      )
    )

  return {
    state: {
      cards: cardState,
      subjects: subjectState,
      days: dayState,
      teachers: teacherState,
      validation: errorState,
    },
    createCard,
    createSubject,
    createDay,
    addLesson,
    addEvent,
    addTeacher,
    deleteTeacher,
    deleteSubject,
    changeMainDate,
    deleteCard,
    setValidationErrors: setErrorState,
  }
}
