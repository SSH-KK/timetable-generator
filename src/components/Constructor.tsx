import React, { useState, useEffect, Dispatch, createRef } from "react"
import { saveAs } from "file-saver"
import ConstructorPage from "@components/ConstructorPage"
import styles from "@styles/Constructor.module.css"
import SaveIcon from "@icons/save.svg"
import ClearIcon from "@icons/clear.svg"
import { TimetableT } from "@type/timetable"
import { createDocument } from "@utils/pdf"
import { ReducerAction } from "@type/reducer"
import {
  changeMainDateAction,
  setStateFromLocalStorageAction,
  clearStateAction,
} from "@utils/reducer/actions"
import { getGenerationNumber } from "@utils/ConstructorPage"

type ConstructorProps = {
  constructorRef: React.RefObject<HTMLDivElement>
  dispatcher: Dispatch<ReducerAction>
  state: TimetableT
}

const Constructor: React.FC<ConstructorProps> = ({ constructorRef, state, dispatcher }) => {
  const [pageClassNumberState, setPageState] = useState<number>(0)
  const [startDateState, setStartDateState] = useState<Date>(new Date())
  const fileInputRef = createRef<HTMLInputElement>()

  const { cards, days, subjects, teachers, validation } = state

  const changePage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    if (e.currentTarget.dataset.name) {
      const name = parseInt(e.currentTarget.dataset.name)
      setPageState(name)
    }
  }

  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.currentTarget.value) setStartDateState(new Date(e.currentTarget.value))
  }

  const downloadDocument = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!validation.has[pageClassNumberState]) {
      let potoch = getGenerationNumber(startDateState)
      potoch = potoch - 1 - pageClassNumberState

      createDocument(
        pageClassNumberState + 10,
        potoch,
        { cards, subjects, days, teachers, validation },
        startDateState.getTime()
      )
    }
  }

  const downloadStorage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = localStorage.getItem("TimetableState")

    if (data) {
      const fileToSave = new Blob([JSON.stringify(JSON.parse(data), undefined, 2)], {
        type: "application/json",
      })

      saveAs(fileToSave, "TimetableState.json")
    }
  }

  const importFile = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (fileInputRef.current && fileInputRef.current.files) {
      const reader = new FileReader()

      reader.readAsText(fileInputRef.current.files[0])

      reader.onload = () => {
        const result = reader.result

        if (typeof result == "string") {
          try {
            JSON.parse(result)
            dispatcher(setStateFromLocalStorageAction({ ldata: result }))
          } catch {
            alert("Неверный формат данных")
          }
        }
      }
    }

    e.currentTarget.reset()
  }

  const clearState = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    dispatcher(clearStateAction({}))
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
            className={`nav-link ${pageClassNumberState == 0 ? "active" : ""}`}
          >
            10 класс
          </a>
        </li>
        <li className={`nav-item pt-2 ${styles.pageItem}`}>
          <a
            onClick={changePage}
            data-name="1"
            className={`nav-link ${pageClassNumberState == 1 ? "active" : ""}`}
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
          disabled={validation.has[pageClassNumberState]}
          onClick={downloadDocument}
        >
          Скачать PDF
        </button>
        <button
          className={`btn btn-outline-success me-2 mb-2 mt-md-0 mt-2`}
          onClick={downloadStorage}
        >
          <SaveIcon />
        </button>
        <button className="btn btn-danger me-2 mb-2 mt-md-0 mt-2" onClick={clearState}>
          <ClearIcon />
        </button>
      </ul>
      <div className="container-fluid">
        {pageClassNumberState == 0 ? (
          <ConstructorPage
            dispatcher={dispatcher}
            startDate={startDateState}
            state={state}
            classNum={"lessons10"}
          />
        ) : (
          ""
        )}

        {pageClassNumberState == 1 ? (
          <ConstructorPage
            dispatcher={dispatcher}
            startDate={startDateState}
            state={state}
            classNum={"lessons11"}
          />
        ) : (
          ""
        )}
        <form onSubmit={importFile}>
          <div className="input-group mb-3">
            <input className="form-control" ref={fileInputRef} type="file" />
            <button type="submit" className="btn btn-info">
              Загрузить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Constructor
