import React, { Dispatch, SetStateAction } from "react"
import styles from "@styles/Constructor.module.css"
import { EventT, LessonsType, TimetableT } from "@type/timetable"
import SplitButtonIcon from "@icons/splitButton.svg"
import { generateTitle } from "@utils/ConstructorPage"
import { ReducerAction } from "@type/reducer"
import { addLessonAction } from "@utils/reducer/actions"

type ConstructorEventBuilderPropsT = {
  cardSelectionState: boolean[][][]
  setCardSelectionState: Dispatch<SetStateAction<boolean[][][]>>
  classNumber: LessonsType
  dayID: number
  eventID: number
  cardID: number
  dispatcher: Dispatch<ReducerAction>
  state: TimetableT
  event: EventT
}

const ConstructorEventBuilder: React.FC<ConstructorEventBuilderPropsT> = ({
  cardSelectionState,
  setCardSelectionState,
  classNumber,
  dayID,
  eventID,
  cardID,
  dispatcher,
  state,
}) => {
  const { cards, days, subjects, teachers, validation } = state
  const event = days[dayID].events[eventID]

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    if (e.currentTarget.dataset) {
      const dataset = e.currentTarget.dataset
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
            lessonID: parseInt(e.currentTarget.value),
            lessonNumber: parseInt(lessonnum),
          })
        )
      }
    }
  }

  const splittoggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset) {
      const dataset = e.currentTarget.dataset
      if (dataset.dayid && dataset.eventid && dataset.groupid) {
        const dayid = parseInt(dataset.dayid)
        const eventid = parseInt(dataset.eventid)
        const groupid = parseInt(dataset.groupid)
        if (event[classNumber][0][groupid] == event[classNumber][1][groupid]) {
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

  const cardValidationClass =
    validation.errors[parseInt(classNumber.replace("lessons", "")) % 10][dayID][eventID][cardID]
      .id != -1
      ? "bg-danger"
      : ""

  return (
    <div
      className={`${styles.eventCard} ${cardValidationClass} col-2 border border-1 d-flex flex-column justify-content-center px-2 position-relative`}
    >
      {cardSelectionState[dayID] && cardSelectionState[dayID][eventID]
        ? Array(cardSelectionState[dayID][eventID][cardID] ? 1 : 2)
            .fill("")
            .map((_, selectIndex) => (
              <select
                key={selectIndex}
                onChange={selectChange}
                data-dayid={dayID}
                data-eventid={eventID}
                data-groupid={cardID}
                data-lessonnum={selectIndex}
                className="form-select"
                value={event[classNumber][selectIndex][cardID]}
                title={generateTitle(
                  subjects,
                  cards,
                  teachers,
                  event[classNumber][selectIndex][cardID]
                )}
              >
                <option value="-1">
                  {cardSelectionState[dayID][eventID][cardID] ? "Пара" : "Урок"}
                </option>
                {cards.map((card, cardIndex) =>
                  card.status ? (
                    <option key={cardIndex} value={cardIndex}>{`${subjects[card.subject].title} - ${
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
        data-dayid={dayID}
        data-eventid={eventID}
        data-groupid={cardID}
        className={`btn btn-secondary ${styles.splittoggle}`}
      >
        <SplitButtonIcon />
      </button>
    </div>
  )
}

export default ConstructorEventBuilder
