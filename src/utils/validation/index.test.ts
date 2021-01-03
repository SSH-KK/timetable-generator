import { findNotUnique, validate } from "./index";
import dataExample from "../../../dataExample.json";
import { CardT } from "../../types/timetable";
import { ValidationErrorT } from "../../types/validation";

const validationErrorExample: ValidationErrorT[] = [
  { day: 0, event: 0, lessonNumber: 0, cardID: 0 },
];

type ObjectWithFieldsT = {
  field: number;
  field2: number;
};

test("Find non-unique element", () =>
  expect(
    findNotUnique<ObjectWithFieldsT>(
      [
        { field: 0, field2: 1 },
        { field: 1, field2: 1 },
        { field: 2, field2: 1 },
        { field: 1, field2: 1 },
      ],
      "field"
    )
  ).toEqual([1, 3]));
test("Find non-unique lesson", () =>
  expect(
    findNotUnique<CardT>(
      [
        {
          subject: 0,
          room: 505,
          teacher: 0,
          status: true,
        },
        {
          subject: 1,
          room: 507,
          teacher: 1,
          status: true,
        },
        {
          subject: 0,
          room: 505,
          teacher: 0,
          status: true,
        },
      ],
      "teacher"
    )
  ).toEqual([0, 2]));

test("Return 1", () => expect(validate(dataExample)).toEqual(validationErrorExample));
