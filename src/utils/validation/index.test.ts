import { validate } from "./index";
import dataExample from "../../../dataExample.json";
import { ValidationErrorT } from "../../types/validation";
import { TimetableT } from "../../types/timetable";

test("Checks for same teachers for different cabinets", () =>
  expect(validate(dataExample1).filter(e => e.message.id === 0)).toEqual(validationErrorExample1));

test("Checks for multiple classes", () =>
  expect(validate(dataExample2).filter(e => e.message.id === 0)).toEqual(validationErrorExample2));

test("Checks for same rooms for different teachers", () =>
  expect(validate(dataExample3).filter(e => e.message.id === 1)).toEqual(validationErrorExample3));

test("Checks for same teachers for different subjects", () =>
  expect(validate(dataExample4).filter(e => e.message.id === 2)).toEqual(validationErrorExample4));

const validationErrorExample1: ValidationErrorT[] = [
  {
    position: { day: 1, event: 0, lessonNumber: 1, classNumber: 10, group: 0 },
    message: { id: 0, position: { day: 1, event: 0, lessonNumber: 1, classNumber: 10, group: 1 } },
  },
  {
    position: { day: 1, event: 0, lessonNumber: 1, classNumber: 10, group: 1 },
    message: { id: 0, position: { day: 1, event: 0, lessonNumber: 1, classNumber: 10, group: 0 } },
  },
];

const validationErrorExample2: ValidationErrorT[] = [
  {
    position: { day: 1, event: 0, lessonNumber: 1, classNumber: 10, group: 0 },
    message: { id: 0, position: { day: 1, event: 0, lessonNumber: 1, classNumber: 11, group: 1 } },
  },
  {
    position: { day: 1, event: 0, lessonNumber: 1, classNumber: 11, group: 1 },
    message: { id: 0, position: { day: 1, event: 0, lessonNumber: 1, classNumber: 10, group: 0 } },
  },
];

const validationErrorExample3: ValidationErrorT[] = [
  {
    position: { day: 1, event: 0, lessonNumber: 0, classNumber: 10, group: 0 },
    message: { id: 1, position: { day: 1, event: 0, lessonNumber: 0, classNumber: 10, group: 1 } },
  },
  {
    position: { day: 1, event: 0, lessonNumber: 0, classNumber: 10, group: 1 },
    message: { id: 1, position: { day: 1, event: 0, lessonNumber: 0, classNumber: 10, group: 0 } },
  },
];

const validationErrorExample4: ValidationErrorT[] = [
  {
    position: { day: 1, event: 0, lessonNumber: 0, classNumber: 10, group: 0 },
    message: { id: 2, position: { day: 1, event: 0, lessonNumber: 0, classNumber: 10, group: 1 } },
  },
  {
    position: { day: 1, event: 0, lessonNumber: 0, classNumber: 10, group: 1 },
    message: { id: 2, position: { day: 1, event: 0, lessonNumber: 0, classNumber: 10, group: 0 } },
  },
];

const dataExample1: TimetableT = {
  ...dataExample,
  days: [
    ...dataExample.days,
    {
      date: 1,
      events: [
        {
          lessons10: [
            [0, 0, -1, -1, -1, -1],
            [1, 0, -1, -1, -1, -1],
          ],
          lessons11: [
            [-1, 0, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1],
          ],
        },
      ],
    },
  ],
};

const dataExample2 = {
  ...dataExample,
  days: [
    ...dataExample.days,
    {
      date: 1,
      events: [
        {
          lessons10: [
            [-1, 1, -1, -1, -1, -1],
            [0, -1, -1, -1, -1, -1],
          ],
          lessons11: [
            [-1, -1, -1, -1, -1, -1],
            [-1, 1, -1, -1, -1, -1],
          ],
        },
      ],
    },
  ],
};

const dataExample3: TimetableT = {
  ...dataExample,
  days: [
    ...dataExample.days,
    {
      date: 1,
      events: [
        {
          lessons10: [
            [0, 2, -1, -1, -1, -1],
            [-1, 0, -1, -1, -1, -1],
          ],
          lessons11: [
            [-1, -1, -1, -1, -1, -1],
            [-1, 0, -1, 0, -1, -1],
          ],
        },
      ],
    },
  ],
};

const dataExample4: TimetableT = {
  ...dataExample,
  days: [
    ...dataExample.days,
    {
      date: 1,
      events: [
        {
          lessons10: [
            [0, 1, -1, -1, -1, -1],
            [-1, 0, -1, -1, -1, -1],
          ],
          lessons11: [
            [-1, -1, -1, -1, -1, -1],
            [-1, 0, -1, 0, -1, -1],
          ],
        },
      ],
    },
  ],
};
