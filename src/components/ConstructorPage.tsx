import React, { useState, useEffect, Dispatch } from "react"
import { cardSelectionStateGenerator } from "@utils/timetable"
import { LessonsType, TimetableT } from "@type/timetable"
import { ReducerAction } from "@type/reducer"
import { addEventAction, createDayAction, deleteEventAction } from "@utils/reducer/actions"
import ConstructorEventBuilder from "@components/ConstructorEventBuilder"
import { generateDayTitle, getGenerationTitle } from "@utils/ConstructorPage"

type ConstructorPageProps = {
  classNum: LessonsType
  dispatcher: Dispatch<ReducerAction>
  state: TimetableT
  startDate: Date
}

const ConstructorPage: React.FC<ConstructorPageProps> = ({
  classNum: classNumber,
  dispatcher,
  startDate,
  state,
}) => {
  const { days } = state

  const [cardSelectionState, setCardSelectionState] = useState<boolean[][][]>(
    cardSelectionStateGenerator(days, classNumber)
  )

  const addButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (e.currentTarget.dataset) {
      const name = e.currentTarget.dataset.name

      if (name == "day")
        dispatcher(
          createDayAction({
            date: startDate.getTime() + 24 * 3600 * 1000 * days.length,
          })
        )
      else if (name == "event" && e.currentTarget.dataset.daynum) {
        const dayNum = e.currentTarget.dataset.daynum

        dispatcher(addEventAction({ dayID: parseInt(dayNum) }))
      }
    }
  }

  useEffect(() => {
    setCardSelectionState(prev => cardSelectionStateGenerator(days, classNumber, prev))
  }, [days])

  const deleteLastEvents = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const dataset = e.currentTarget.dataset

    if (dataset.dayid && dataset.eventid) {
      const dayid = parseInt(dataset.dayid)
      const eventid = parseInt(dataset.eventid)

      dispatcher(deleteEventAction({ dayID: dayid, eventID: eventid }))
    }
  }

  return (
    <>
      <div className="row">
        {[1, 2, 3, 4, 5, 6].map(groupNum => (
          <div className="col-2 border border-1" key={groupNum}>
            <h4 className="text-center mb-0 py-1">
              {getGenerationTitle(new Date(), classNumber, groupNum)}
            </h4>
          </div>
        ))}
      </div>
      {days.map((day, dayIndex) => (
        <div className="row" key={dayIndex}>
          <div className="col-12 border border-1 bg-secondary text-center border-bottom border-1">
            <h4 className="mb-0 py-1">{generateDayTitle(day)}</h4>
          </div>
          {day.events.map((event, eventIndex) =>
            event[classNumber][0].map((_, cardIndex) => (
              <ConstructorEventBuilder
                key={`${eventIndex} ${cardIndex}`}
                cardID={cardIndex}
                cardSelectionState={cardSelectionState}
                classNumber={classNumber}
                dayID={dayIndex}
                dispatcher={dispatcher}
                event={event}
                eventID={eventIndex}
                setCardSelectionState={setCardSelectionState}
                state={state}
              />
            ))
          )}
          <div className="btn-group">
            <div className={`${day.events.length > 1 ? "col-6" : "col-12"}`}>
              <div className="d-grid gap-2">
                <button
                  data-name="event"
                  data-daynum={dayIndex}
                  onClick={addButton}
                  className="btn btn-outline-primary rounded rounded-0 rounded-start btn-sm"
                  type="button"
                >
                  Новые пары
                </button>
              </div>
            </div>
            {day.events.length > 1 ? (
              <div className="col-6">
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-outline-danger rounded rounded-0 rounded-end btn-sm"
                    type="button"
                    data-dayid={dayIndex}
                    data-eventid={day.events.length - 1}
                    onClick={deleteLastEvents}
                  >
                    Удалить последние пары
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
      <div className="d-grid gap-2 my-2">
        <button
          data-name="day"
          onClick={addButton}
          className="btn btn-outline-primary btn-sm"
          type="button"
        >
          Новый День
        </button>
      </div>
    </>
  )
}

export default ConstructorPage
