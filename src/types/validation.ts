export type ValidationStatusT = {
  has: boolean
  errors: ValidationErrorT[][][][]
}

export type ValidationErrorPositionT = {
  day: number
  event: number
  lessonNumber: number
  classNumber: number
  group: number
}

export type ValidationErrorT = {
  id: number
  position?: ValidationErrorPositionT
}
