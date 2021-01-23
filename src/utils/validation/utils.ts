import { ValidationErrorT } from "@type/validation"

/**
 * Gets class number from index
 * @param index Index of group in lesson
 */
export const getClassNumber = (index: number): number => 10 + Math.floor(index / 6)

/**
 * Function returning function for error message :D
 * @param day Day index
 * @param event Event index
 * @param lessonNumber Lesson number
 * @param a Index of group in lesson
 */
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
