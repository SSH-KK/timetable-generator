import React, { Dispatch, useState } from "react"
import styles from "../styles/SideBar.module.css"
import { SubjectT, CardT } from "../types/timetable"
import SubjectSingle from "./SubjectSingle"
import CardSingle from "./CardSingle"
import { ReducerAction } from "../types/reducer"
import {
  createCardAction,
  createSubjectAction,
  deleteCardAction,
  deleteSubjectAction,
} from "../utils/reducer/actions"

type SidebarProps = {
  sidebarRef: React.RefObject<HTMLDivElement>
  subjects: SubjectT[]
  teachers: string[]
  cards: CardT[]
  dispatcher: Dispatch<ReducerAction>
}

type InputStateT = {
  subject: string
  card: {
    subject: number
    teacher: number
    room: string
  }
}

const SideBar: React.FC<SidebarProps> = ({ sidebarRef, subjects, teachers, cards, dispatcher }) => {
  const [inputState, setInputState] = useState<InputStateT>({
    subject: "",
    card: {
      subject: -1,
      teacher: -1,
      room: "",
    },
  })

  const createForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (event.currentTarget.dataset.name) {
      const name = event.currentTarget.dataset.name
      let reset = false
      if (name == "subject" && inputState.subject) {
        dispatcher(createSubjectAction({ title: inputState.subject }))
        reset = true
      } else if (
        name == "card" &&
        inputState.card.subject != -1 &&
        inputState.card.teacher != -1 &&
        inputState.card.room
      ) {
        dispatcher(
          createCardAction({
            subject: inputState.card.subject,
            teacher: inputState.card.teacher,
            room: parseInt(inputState.card.room),
          })
        )
        reset = true
      }
      if (reset) {
        setInputState(prev => ({
          ...prev,
          [name]: name == "subject" ? "" : { subject: -1, teacher: -1, room: "" },
        }))
      }
    }
  }

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setInputState(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const cardSelectChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    if (event.target.name) {
      const name = event.target.name
      if (
        (name == "room" && (parseInt(event.target.value) || event.target.value == "")) ||
        name != "room"
      ) {
        setInputState(prev => ({
          subject: prev.subject,
          card: {
            ...prev.card,
            [name]: name != "room" ? parseInt(event.target.value) : event.target.value,
          },
        }))
      }
    }
  }

  const deleteSubjectButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const subjectIndex = parseInt(event.currentTarget.name)
    dispatcher(deleteSubjectAction({ subjectID: subjectIndex }))
    if (subjectIndex == inputState.card.subject) {
      setInputState(prev => ({
        subject: prev.subject,
        card: {
          ...prev.card,
          subject: -1,
        },
      }))
    }
  }

  const deleteCardButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const cardIndex = parseInt(event.currentTarget.name)
    dispatcher(deleteCardAction({ cardID: cardIndex }))
  }

  return (
    <nav id={styles.sidebar} className="shadow me-3" ref={sidebarRef}>
      <div className="row pb-5 justify-content-center">
        <h3 className="text-center">Предметы</h3>
        {subjects.map((ob, subjectIndex) =>
          ob.status ? (
            <SubjectSingle
              dispatcher={dispatcher}
              subjectID={subjectIndex}
              deleteSubjectButton={deleteSubjectButton}
              subject={ob}
              teachers={teachers}
              key={subjectIndex}
            />
          ) : (
            ""
          )
        )}
        <div className="col-11">
          <form className="mt-2" data-name="subject" onSubmit={createForm}>
            <div className="input-group input-group-sm">
              <input
                type="text"
                name="subject"
                onChange={inputChange}
                value={inputState.subject}
                className="form-control border border-3  rounded rounded-3"
                placeholder="Предмет"
              />
            </div>
          </form>
        </div>
        <h3 className="text-center mt-2">Пары</h3>
                <div className="col-11">
          <form className="mt-2" data-name="card" onSubmit={createForm}>
            <select
              name="subject"
              value={inputState.card.subject}
              onChange={cardSelectChange}
              className="form-select"
            >
              <option value="-1">Предмет</option>
              {subjects.map((ob, subjectIndex) =>
                ob.status ? (
                  <option value={subjectIndex} key={subjectIndex}>
                    {ob.title}
                  </option>
                ) : (
                  ""
                )
              )}
            </select>
            {inputState.card.subject != -1 ? (
              <select
                name="teacher"
                value={inputState.card.teacher}
                onChange={cardSelectChange}
                className="form-select mt-2"
              >
                <option value="-1">Преподаватель</option>
                {subjects[inputState.card.subject].teachers.map(teacher => (
                  <option value={teacher} key={teacher}>
                    {teachers[teacher]}
                  </option>
                ))}
              </select>
            ) : (
              ""
            )}
            {inputState.card.subject != -1 ? (
              <div className="input-group input-group-sm mt-2">
                <input
                  type="text"
                  value={inputState.card.room}
                  placeholder="Кабинет"
                  onChange={cardSelectChange}
                  name="room"
                  className="form-control"
                />
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
        {cards.map((ob, cardIndex) => (
          <CardSingle
            deleteCardButton={deleteCardButton}
            dispatcher={dispatcher}
            card={{
              cardIndex: cardIndex,
              subStatus: subjects[ob.subject].status,
              status: cards[cardIndex].status,
              room: ob.room,
              subject: subjects[ob.subject].title,
              teacher: teachers[ob.teacher],
            }}
            key={cardIndex}
          />
        ))}
      </div>
    </nav>
  )
}

export default SideBar
