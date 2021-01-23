import React, { Dispatch, useState } from "react"
import { SubjectT } from "@type/timetable"
import styles from "@styles/SideBar.module.css"
import { ReducerAction } from "@type/reducer"
import { addTeacherAction, deleteTeacherAction } from "@utils/reducer/actions"
import DeleteButtonIcon from "@icons/deleteButton.svg"

type SubjectSingleProps = {
  subject: SubjectT
  teachers: string[]
  dispatcher: Dispatch<ReducerAction>
  deleteSubjectButton: (e: React.MouseEvent<HTMLButtonElement>) => void
  subjectID: number
}

const SubjectSingle: React.FC<SubjectSingleProps> = ({
  subject,
  teachers,
  dispatcher,
  deleteSubjectButton,
  subjectID,
}) => {
  const [inputState, setInputState] = useState("")

  const addTeacherForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputState) {
      dispatcher(addTeacherAction({ teacher: inputState, subjectID }))
      setInputState("")
    }
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputState(e.target.value)
  }

  const deleteTeacherButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatcher(deleteTeacherAction({ subjectID, teacherID: parseInt(e.currentTarget.name) }))
  }

  return (
    <div className={`${styles.subjectCard} col-11 border rounded rounded-2 border-3 p-2 mt-2`}>
      <h4>{subject.title}</h4>
      <div className="d-flex flex-wrap">
        {subject.teachers.map(teacherID => (
          <div key={teacherID} className="p-1 rounded rounded-3 me-2 shadow-sm">
            <h5 className="list-inline-item mb-0 me-0">{teachers[teacherID]}</h5>
            <button
              type="button"
              className="btn-close h-0"
              onClick={deleteTeacherButton}
              name={teacherID.toString()}
            />
          </div>
        ))}
      </div>
      <form onSubmit={addTeacherForm} className="mt-2">
        <div className="input-group input-group-sm">
          <input
            type="text"
            onChange={inputChange}
            value={inputState}
            className="form-control border border-3 rounded rounded-3"
            placeholder="Преподаватель"
          />
        </div>
        <button
          type="button"
          onClick={deleteSubjectButton}
          name={subjectID.toString()}
          className={`btn btn-danger border-start border border-3 ${styles.deleteSubject}`}
        >
          <DeleteButtonIcon />
        </button>
      </form>
    </div>
  )
}

export default SubjectSingle
