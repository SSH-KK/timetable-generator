import { EventT } from "@type/timetable"

export type SpanGenerator = (
  event: EventT,
  lessonIndex: number,
  groupIndex: number,
  classNumber: number
) => number
