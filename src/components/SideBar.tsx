import React, { Dispatch, useMemo, useState } from "react"
import styles from "@styles/SideBar.module.css"
import { TimetableT } from "@type/timetable"
import SubjectSingle from "@components/SubjectSingle"
import CardSingle from "@components/CardSingle"
import { ReducerAction } from "@type/reducer"
import { createCardAction, createSubjectAction, deleteSubjectAction } from "@utils/reducer/actions"
import { initialSidebarState } from "@assets/timetable"

type SidebarProps = {
  sidebarRef: React.RefObject<HTMLDivElement>
  state: TimetableT
  dispatcher: Dispatch<ReducerAction>
}

const SideBar: React.FC<SidebarProps> = ({ sidebarRef, state, dispatcher }) => {
  const { cards, subjects, teachers } = state

  const [inputState, setInputState] = useState(initialSidebarState)

  const createForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (e.currentTarget.dataset.name) {
      const name = e.currentTarget.dataset.name
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

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setInputState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const cardSelectChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    if (e.target.name) {
      const name = e.target.name

      if (
        (name == "room" && (parseInt(e.target.value) || e.target.value == "")) ||
        name != "room"
      ) {
        setInputState(prev => ({
          subject: prev.subject,
          card: {
            ...prev.card,
            [name]: name != "room" ? parseInt(e.target.value) : e.target.value,
          },
        }))
      }
    }
  }

  const deleteSubjectButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const subjectIndex = parseInt(e.currentTarget.name)

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

  return(
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
                {subjects.map((subject, subjectIndex) =>
                  subject.status ? (
                    <option value={subjectIndex} key={subjectIndex}>
                      {subject.title}
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
          {cards.map((card, cardIndex) => (
            <CardSingle
              dispatcher={dispatcher}
              card={{
                cardIndex: cardIndex,
                subStatus: subjects[card.subject].status,
                status: cards[cardIndex].status,
                room: card.room,
                subject: subjects[card.subject].title,
                teacher: teachers[card.teacher],
              }}
              key={cardIndex}
            />
          ))}
        </div>
      </nav>
    )
}

export default SideBar
