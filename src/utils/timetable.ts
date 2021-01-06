import { DayT, LessonsType } from '../types/timetable'

export const initialEventLessonsGenrator = (): number[][] => Array(2).fill(Array(6).fill(-1))

export const cardSelectionStateGenerator = (days: DayT[], classNum: LessonsType): boolean[][][] => days.map((day) => day.events.map((event) => event[classNum][0].map((_, cardIndex) => (
	event[classNum][0][cardIndex] == event[classNum][1][cardIndex] ? true : false
))))