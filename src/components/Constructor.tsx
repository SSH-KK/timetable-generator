import React, { useState, useEffect, Dispatch } from "react"
import { saveAs } from "file-saver"
import ConstructorPage from "./ConstructorPage"
import styles from "../styles/Constructor.module.css"
import { DayT, SubjectT, CardT } from "../types/timetable"
import { createDocument } from "../utils/pdf"
import { ValidationStatusT } from "../types/validation"
import { ReducerAction } from "../types/reducer"
import { addEventAction, changeMainDateAction, createDayAction } from "../utils/reducer/actions"

type ConstructorProps = {
  constructorRef: React.RefObject<HTMLDivElement>
  dispatcher: Dispatch<ReducerAction>
  teachers: string[]
  cards: CardT[]
  subjects: SubjectT[]
  days: DayT[]
  validation: ValidationStatusT
}

const Constructor: React.FC<ConstructorProps> = ({
  constructorRef,
  subjects,
  days,
  cards,
  teachers,
  dispatcher,
  validation,
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
        dispatcher(
          createDayAction({
            date: startDateState.getTime() + 24 * 3600 * 1000 * days.length,
          })
        )
      } else if (name == "event" && event.currentTarget.dataset.daynum) {
        const dayNum = event.currentTarget.dataset.daynum
        dispatcher(addEventAction({ dayID: parseInt(dayNum) }))
      }
    }
  }

  const downloadDocument = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!validation.has[pageState]) {
      let potoch =
        startDateState.getMonth() <= 5
          ? (startDateState.getFullYear() % 2000) - 1
          : startDateState.getFullYear() % 2000
      potoch = potoch - 1 - pageState
      createDocument(
        pageState + 10,
        potoch,
        { cards, subjects, days, teachers, validation },
        startDateState.getTime()
      )
    }
  }

  const downloadStorage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const data = localStorage.getItem("TimetableState")
    if (data) {
      const fileToSave = new Blob([JSON.stringify(JSON.parse(data), undefined, 2)], {
        type: "application/json",
      })
      saveAs(fileToSave, "TimetableState.json")
    }
  }

  useEffect(() => {
    dispatcher(changeMainDateAction({ newDate: startDateState }))
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
        <button
          className={`btn btn-outline-success me-2 mb-2 mt-md-0 mt-2`}
          onClick={downloadStorage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-cloud-arrow-down-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z" />
          </svg>
        </button>
      </ul>
      <div className="container-fluid">
        {pageState == 0 ? (
          <ConstructorPage
            days={days}
            subjects={subjects}
            dispatcher={dispatcher}
            cards={cards}
            teachers={teachers}
            addButton={addButton}
            validation={validation}
            classNum={"lessons10"}
          />
        ) : (
          ""
        )}
        {pageState == 1 ? (
          <ConstructorPage
            days={days}
            subjects={subjects}
            dispatcher={dispatcher}
            validation={validation}
            cards={cards}
            teachers={teachers}
            addButton={addButton}
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
