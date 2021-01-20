import { reducer } from "./index"
import { ReducerAction } from "../../types/reducer"
import { initialState } from "../../assets/timetable"
import { TimetableT } from "../../types/timetable"
import { ValidationErrorT } from "../../types/validation"
import { initialEventLessonsGenrator } from "../timetable"
import {
  addEventAction,
  addTeacherAction,
  createCardAction,
  createDayAction,
  createSubjectAction,
  deleteSubjectAction,
} from "./actions"

const tests: {
  title: string
  initialState?: TimetableT
  action: ReducerAction
  result: Partial<TimetableT>
}[] = [
  {
    title: "Creates subject",
    action: createSubjectAction({ title: "Physics" }),
    result: { subjects: [{ status: true, teachers: [], title: "Physics" }] },
  },
  {
    title: "Creates card",
    action: createCardAction({ subject: 0, teacher: 0, room: 507 }),
    result: {
      cards: [
        {
          room: 507,
          status: true,
          subject: 0,
          teacher: 0,
        },
      ],
    },
  },
  {
    title: "Creates Day",
    action: createDayAction({ date: 1000 }),
    result: {
      days: [{ events: [], date: 1000 }],
      validation: { has: [false, false], errors: [[[]], [[]]], rows: [[]] },
    },
  },
  {
    title: "Adds event to existing day",
    initialState: {
      ...initialState,
      days: [{ events: [], date: 1000 }],
      validation: { has: [false, false], errors: [[[]], [[]]], rows: [[]] },
    },
    action: addEventAction({ dayID: 0 }),
    result: {
      days: [
        {
          events: [
            { lessons10: initialEventLessonsGenrator(), lessons11: initialEventLessonsGenrator() },
          ],
          date: 1000,
        },
      ],
      validation: {
        has: [false, false],
        errors: Array(2).fill([[Array<ValidationErrorT>(6).fill({ id: -1 })]]),
        rows: [[[false, false]]],
      },
    },
  },
  {
    title: "Adds teacher to allowed teachers list in existing subject",
    initialState: {
      ...initialState,
      subjects: [{ title: "Physics", status: true, teachers: [] }],
    },
    action: addTeacherAction({
      subjectID: 0,
      teacher: "Popov",
    }),
    result: {
      subjects: [{ status: true, teachers: [0], title: "Physics" }],
      teachers: ["Popov"],
    },
  },
  {
    title: "Deletes subject",
    initialState: {
      ...initialState,
      subjects: [{ status: true, teachers: [0], title: "Physics" }],
    },
    action: deleteSubjectAction({ subjectID: 0 }),
    result: {
      subjects: [{ status: false, teachers: [0], title: "Physics" }],
    },
  },
]

describe("Timetable reducer", () => {
  tests.forEach(e =>
    test(e.title, () =>
      expect(reducer({ ...initialState, ...e.initialState }, e.action)).toEqual({
        ...initialState,
        ...e.result,
      })
    )
  )
})
