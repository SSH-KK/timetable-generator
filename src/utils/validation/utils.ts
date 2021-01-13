import { ValidationErrorT } from "../../types/validation"

export const getClassNumber = (index: number): number => 10 + Math.floor(index / 6)

export const generateErrorWithAddress = (
  day: number,
  event: number,
  lessonNumber: number,
  a: number
) => (errorCode: number): ValidationErrorT => ({
  id: errorCode,
  position: {
    day,
    event,
    lessonNumber,
    classNumber: getClassNumber(a),
    group: a % 6,
  },
})
