import { validate } from "./index";
import dataExample from "../../../dataExample.json";
import { ValidationErrorT } from "../../types/validation";

const validationErrorExample: ValidationErrorT[] = [
  {
    position: { day: 0, event: 0, lessonNumber: 1, classNumber: 10, group: 0 },
    message: { id: 0, position: { day: 0, event: 0, lessonNumber: 1, classNumber: 10, group: 1 } },
  },
  {
    position: { day: 0, event: 0, lessonNumber: 1, classNumber: 10, group: 1 },
    message: { id: 0, position: { day: 0, event: 0, lessonNumber: 1, classNumber: 10, group: 0 } },
  },
];

test("Checks for overlapping ", () =>
  expect(validate(dataExample)).toEqual(validationErrorExample));
