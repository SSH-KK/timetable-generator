import { DayT, LessonsType } from "../types/timetable"

export const initialEventLessonsGenrator = (): number[][] => Array(2).fill(Array(6).fill(-1))

export const cardSelectionStateGenerator = (days: DayT[], classNum: LessonsType, prev?: boolean[][][]): boolean[][][] =>
  !prev?
  days.map(day =>
    day.events.map(event =>
      event[classNum][0].map((_, cardIndex) =>
        event[classNum][0][cardIndex] == event[classNum][1][cardIndex] ? true : false
      )
    )
  )
  :
  days.map((day, dayIndex) =>
  	prev[dayIndex] ?
  		day.events.map((event, eventIndex)=>
  			prev[dayIndex][eventIndex] ?
  				prev[dayIndex][eventIndex]
  			:
  				event[classNum][0].map((_, cardIndex) =>
	        	event[classNum][0][cardIndex] == event[classNum][1][cardIndex] ? true : false
	      	)
  		)
  	:
  		day.events.map((event, eventIndex) =>
	      event[classNum][0].map((_, cardIndex) =>
	        event[classNum][0][cardIndex] == event[classNum][1][cardIndex] ? true : false
	      )
	    )
  )