import React, { useState, useEffect } from "react"
import ConstructorPage from "./ConstructorPage"
import styles from "../styles/Constructor.module.css"
import {
  DayT,
  SubjectT,
  CardT,
  TimetableT,
  CreateDayFT,
  ChangeMainDateFT,
  SetValidationErrorsFT,
  AddLessonFT,
  AddEventFT,
} from "../types/timetable"
import { createDocument } from "../utils/pdf"
import { ValidationStatusT } from "../types/validation"

type ConstructorProps = {
  constructorRef: React.RefObject<HTMLDivElement>
  createDay: CreateDayFT
  addEvent: AddEventFT
  addLesson: AddLessonFT
  teachers: string[]
  changeMainDate: ChangeMainDateFT
  cards: CardT[]
  subjects: SubjectT[]
  days: DayT[]
  validation: ValidationStatusT
  setValidationErrors: SetValidationErrorsFT
}

const Constructor: React.FC<ConstructorProps> = ({
  constructorRef,
  createDay,
  subjects,
  days,
  cards,
  teachers,
  changeMainDate,
  addLesson,
  addEvent,
  validation,
  setValidationErrors,
}) => {
  const [pageState, setPageState] = useState<number>(0)
  const [startDateState, setStartDateState] = useState<Date>(new Date())

  const changePage = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    if (event.currentTarget.dataset.name) {
      const name = parseInt(event.currentTarget.dataset.name)
      setPageState(name)
    }
  }

  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (event.currentTarget.value) {
      setStartDateState(new Date(event.currentTarget.value))
    }
  }

  const addButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (event.currentTarget.dataset) {
      const name = event.currentTarget.dataset.name
      if (name == "day") {
        createDay(startDateState.getTime() + 24 * 3600 * 1000 * days.length)
      } else if (name == "event" && event.currentTarget.dataset.daynum) {
        const dayNum = event.currentTarget.dataset.daynum
        addEvent(parseInt(dayNum))
      }
    }
  }

  const downloadDocument = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!validation.has[pageState]) {
    	let potoch = startDateState.getMonth()<=5 ? startDateState.getFullYear()%2000-1 : startDateState.getFullYear()%2000
    	potoch = potoch-1-pageState
      createDocument(
        pageState + 10,
        potoch,
        { cards, subjects, days, teachers, validation },
        startDateState.getTime()
      )
    }
  }

  useEffect(() => {
    changeMainDate(startDateState)
  }, [startDateState])

  return (
    <div id={styles.constructorPages} ref={constructorRef}>
      <ul className="nav nav-tabs pt-2">
        <li className={`nav-item pt-2 ${styles.pageItem}`}>
          <a
            onClick={changePage}
            data-name="0"
            className={`nav-link ${pageState == 0 ? "active" : ""}`}
          >
            10 класс
          </a>
        </li>
        <li className={`nav-item pt-2 ${styles.pageItem}`}>
          <a
            onClick={changePage}
            data-name="1"
            className={`nav-link ${pageState == 1 ? "active" : ""}`}
          >
            11 класс
          </a>
        </li>
        <form className="d-flex align-items-center ms-auto me-2 mb-2">
          <div className="input-group input-group">
            <label htmlFor="startDate" className="form-label mb-0 pt-1 me-2">
              Дата начала недели:
            </label>
            <input
              type="date"
              value={`${startDateState.toISOString().split("T")[0]}`}
              onChange={changeDate}
              id="startDate"
              className="form-control rounded rounded-3"
            />
          </div>
        </form>
        <button
          className={`btn btn-outline-danger me-2 mb-2`}
          disabled={validation.has[pageState]}
          onClick={downloadDocument}
        >
          Скачать PDF
        </button>
      </ul>
      <div className="container-fluid">
        {pageState == 0 ? (
          <ConstructorPage
            days={days}
            subjects={subjects}
            addLesson={addLesson}
            cards={cards}
            teachers={teachers}
            addButton={addButton}
            validation={validation}
            setValidationErrors={setValidationErrors}
            classNum={"lessons10"}
          />
        ) : (
          ""
        )}
        {pageState == 1 ? (
          <ConstructorPage
            days={days}
            subjects={subjects}
            addLesson={addLesson}
            validation={validation}
            cards={cards}
            teachers={teachers}
            addButton={addButton}
            setValidationErrors={setValidationErrors}
            classNum={"lessons11"}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default Constructor
