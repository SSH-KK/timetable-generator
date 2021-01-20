import { reducer } from "./index"
import { ReducerAction } from "../../types/reducer"
import { initialState } from "../../assets/timetable"
import { TimetableT } from "../../types/timetable"
import { ValidationErrorT } from "../../types/validation"
import { initialEventLessonsGenrator } from "../timetable"
import {
  addEventAction,
  addTeacherAction,
  clearDays,
  createCardAction,
  createDayAction,
  createSubjectAction,
  deleteEventAction,
  deleteSubjectAction,
} from "./actions"

const tests: {
  title: string
  initialState?: Partial<TimetableT>
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
      subjects: [{ status: true, teachers: [0], title: "Physics" }],
    },
    action: deleteSubjectAction({ subjectID: 0 }),
    result: {
      subjects: [{ status: false, teachers: [0], title: "Physics" }],
    },
  },
  {
    title: "Deletes event",
    initialState: {
      days: [
        {
          date: 1000,
          events: [
            { lessons10: initialEventLessonsGenrator(), lessons11: initialEventLessonsGenrator() },
          ],
        },
      ],
      validation: {
        has: [true, false],
        errors: [
          [[[...Array(4).fill({ id: -1 }), ...Array(2).fill({ id: 1 })]]],
          [[Array<ValidationErrorT>(6).fill({ id: -1 })]],
        ],
        rows: [[[true, false]]],
      },
    },
    action: deleteEventAction({ dayID: 0, eventID: 0 }),
    result: {
      days: [{ date: 1000, events: [] }],
      validation: {
        errors: [[[]], [[]]],
        rows: [[]],
        has: [false, false],
      },
    },
  },
  {
    title: "Clears days state",
    initialState: {
      subjects: [{ status: false, teachers: [1], title: "Test" }],
      days: [
        {
          date: 1000,
          events: [
            { lessons10: initialEventLessonsGenrator(), lessons11: initialEventLessonsGenrator() },
          ],
        },
      ],
      validation: {
        has: [false, false],
        errors: Array(2).fill([[Array<ValidationErrorT>(6).fill({ id: -1 })]]),
        rows: [[[false, false]]],
      },
    },
    action: clearDays({}),
    result: {
      subjects: [{ status: false, teachers: [1], title: "Test" }],
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
