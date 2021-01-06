import { ValidationErrorT } from "../../types/validation"

export const getClassNumber = (index: number): number => 10 + Math.floor(index / 6)

export const generateErrorWithAddress = (
  day: number,
  event: number,
  lessonNumber: number,
  a: number,
  b: number
) => (errorCode: number): ValidationErrorT => ({
  position: {
    day,
    event,
    lessonNumber,
    classNumber: getClassNumber(a),
    group: a % 6,
  },
  message: {
    id: errorCode,
    position: {
      day,
      event,
      lessonNumber,
      classNumber: getClassNumber(b),
      group: b % 6,
    },
  },
})
