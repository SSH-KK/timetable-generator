export type ValidationErrorPositionT = {
  day: number;
  event: number;
  lessonNumber: number;
  classNumber: number;
  group: number;
};

export type ValidationErrorMessageT = {
  id: number;
  position: ValidationErrorPositionT;
};

export type ValidationErrorT = {
  position: ValidationErrorPositionT;
  message: ValidationErrorMessageT;
};
