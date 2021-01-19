export type ValidationStatusT = {
  has: [boolean, boolean] // Indicates if class has errors
  errors: ValidationErrorT[][][][] // Array of classes consisting of arrays of days consisting of arrays of events consisting of arrays of lessons
  rows: [boolean, boolean][][] // Array of days consisting of arrays of events consisting of classes. Indicates if event row has errors
}

type ValidationErrorPositionT = {
  day: number
  event: number
  lessonNumber: number
  classNumber: number
  group: number
}

export type ValidationErrorT = {
  id: number // Can be either -1, what means than there is no error or >= 0, meaning error index
  position?: ValidationErrorPositionT // Must be set if id is not -1
}
