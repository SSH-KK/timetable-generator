import React, { useState, useEffect, Dispatch } from "react"
import styles from "../styles/Constructor.module.css"
import assets from "../assets/pdf"
import { cardSelectionStateGenerator } from "../utils/timetable"
import { DayT, SubjectT, CardT, LessonsType } from "../types/timetable"
import { ValidationStatusT } from "../types/validation"
import { ReducerAction } from "../types/reducer"
import { addLessonAction, deleteEventAction } from "../utils/reducer/actions"
import SplitButtonIcon from "../icons/splitButton.svg"

type ConstructorPageProps = {
  days: DayT[]
  classNum: LessonsType
  addButton: (event: React.MouseEvent<HTMLButtonElement>) => void
  dispatcher: Dispatch<ReducerAction>
  validation: ValidationStatusT
  cards: CardT[]
  subjects: SubjectT[]
  teachers: string[]
}

const ConstructorPage: React.FC<ConstructorPageProps> = ({
  days,
  subjects,
  cards,
  teachers,
  classNum: classNumber,
  addButton,
  dispatcher,
  validation,
}) => {
  const [cardSelectionState, setCardSelectionState] = useState<boolean[][][]>(
    cardSelectionStateGenerator(days, classNumber)
  )

  useEffect(() => {
    setCardSelectionState(prev => cardSelectionStateGenerator(days, classNumber, prev))
  }, [days])

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    if (event.currentTarget.dataset) {
      const dataset = event.currentTarget.dataset
      if (dataset.dayid && dataset.eventid && dataset.groupid && dataset.lessonnum) {
        const { dayid, eventid, groupid, lessonnum } = dataset
        const isPair = cardSelectionState[parseInt(dayid)][parseInt(eventid)][parseInt(groupid)]
        dispatcher(
          addLessonAction({
            dayID: parseInt(dayid),
            eventID: parseInt(eventid),
            classNumber,
            groupID: parseInt(groupid),
            isPair,
            lessonID: parseInt(event.currentTarget.value),
            lessonNumber: parseInt(lessonnum),
          })
        )
      }
    }
  }

  const splittoggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.dataset) {
      const dataset = event.currentTarget.dataset
      if (dataset.dayid && dataset.eventid && dataset.groupid) {
        const dayid = parseInt(dataset.dayid)
        const eventid = parseInt(dataset.eventid)
        const groupid = parseInt(dataset.groupid)
        if (
          days[dayid].events[eventid][classNumber][0][groupid] ==
          days[dayid].events[eventid][classNumber][1][groupid]
        ) {
          setCardSelectionState(prev =>
            prev.map((day, dayIndex) =>
              dayIndex == dayid
                ? day.map((event, eventIndex) =>
                    eventIndex == eventid
                      ? event.map((group, groupIndex) => (groupIndex == groupid ? !group : group))
                      : event
                  )
                : day
            )
          )
        }
        // can add split for different selection in lessons
      }
    }
  }

  const deleteLastEvents = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const dataset = event.currentTarget.dataset
    if (dataset.dayid && dataset.eventid) {
      const dayid = parseInt(dataset.dayid)
      const eventid = parseInt(dataset.eventid)
      dispatcher(deleteEventAction({ dayID: dayid, eventID: eventid }))
    }
  }

  return (
    <>
      {days.map((day, dayIndex) => (
        <div className="row" key={dayIndex}>
          <div className="col-12 text-center border-bottom border-1">
            <h4>{`${new Date(day.date).getDate()} ${
              assets.weekdays[
                new Date(day.date).getDay() - 1 != -1 ? new Date(day.date).getDay() - 1 : 6
              ]
            }`}</h4>
          </div>
          {day.events.map((event, eventIndex) =>
            event[classNumber][0].map((_, cardID) => (
              <div
                key={cardID}
                className={`${styles.eventCard} ${
                  validation.errors[parseInt(classNumber.replace("lessons", "")) % 10][dayIndex][
                    eventIndex
                  ][cardID].id != -1
                    ? "bg-danger"
                    : ""
                } col-2 border border-1 d-flex flex-column justify-content-center px-2 position-relative`}
              >
                {cardSelectionState[dayIndex] && cardSelectionState[dayIndex][eventIndex]
                  ? Array(cardSelectionState[dayIndex][eventIndex][cardID] ? 1 : 2)
                      .fill("")
                      .map((_, newIndex) => (
                        <select
                          key={newIndex}
                          onChange={selectChange}
                          data-dayId={dayIndex}
                          data-eventId={eventIndex}
                          data-groupId={cardID}
                          data-lessonNum={newIndex}
                          className="form-select"
                          value={event[classNumber][newIndex][cardID]}
                        >
                          <option value="-1">
                            {cardSelectionState[dayIndex][eventIndex][cardID] ? "Пара" : "Урок"}
                          </option>
                          {cards.map((card, cardIndex) =>
                            card.status ? (
                              <option value={cardIndex}>{`${subjects[card.subject].title} - ${
                                teachers[card.teacher]
                              } - ${card.room}`}</option>
                            ) : (
                              ""
                            )
                          )}
                        </select>
                      ))
                  : ""}
                <button
                  onClick={splittoggle}
                  disabled={event[classNumber][0][cardID] != event[classNumber][1][cardID]}
                  data-dayId={dayIndex}
                  data-eventId={eventIndex}
                  data-groupId={cardID}
                  className={`btn btn-secondary ${styles.splittoggle}`}
                >
                  <SplitButtonIcon />
                </button>
              </div>
            ))
          )}
          <div className="btn-group">
            <div className={`${day.events.length > 1 ? "col-6" : "col-12"}`}>
              <div className="d-grid gap-2">
                <button
                  data-name="event"
                  data-dayNum={dayIndex}
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
                    data-dayId={dayIndex}
                    data-eventId={day.events.length - 1}
                    onClick={deleteLastEvents}
                  >
                    Удалить последнии пары
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
