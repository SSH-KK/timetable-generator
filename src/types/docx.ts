import { EventT } from "@type/timetable"

export type SpanGenerator<T> = (
  event: EventT,
  lessonIndex: number,
  groupIndex: number,
  classNumber: number
) => T
