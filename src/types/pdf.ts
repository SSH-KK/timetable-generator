import { Margins, PageOrientation, Style, StyleDictionary } from "pdfmake/interfaces"
import { EventT } from "./timetable"

export type DocumentStylesT = {
  defaultStyle: Style
  styles: StyleDictionary
  pageOrientation: PageOrientation
  pageMargins: Margins
}

export type SpanGenerator = (
  event: EventT,
  lessonIndex: number,
  groupIndex: number,
  classNumber: number
) => number
