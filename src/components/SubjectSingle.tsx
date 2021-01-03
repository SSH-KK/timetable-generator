import React, { useState } from "react";
import { SubjectT, AddTeacherFT, DeleteTeacherFT } from "../types/timetable";
import styles from "../styles/SideBar.module.css";

type SubjectSingleProps = {
  subject: SubjectT;
  teachers: string[];
  addTeacher: AddTeacherFT;
  deleteTeacher: DeleteTeacherFT;
  deleteSubjectButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  subjectId: number;
};

const SubjectSingle: React.FC<SubjectSingleProps> = ({
  subject,
  teachers,
  addTeacher,
  deleteTeacher,
  deleteSubjectButton,
  subjectId,
}) => {
  const [inputState, setInputState] = useState("");

  const addTeacherForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(inputState){
	    addTeacher(inputState, subjectId);
	    setInputState("");
  	}
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputState(event.target.value);
  };

  const deleteTeacherButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTeacher(subjectId, parseInt(event.currentTarget.name));
  };

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
          id={styles.deleteSubject}
          name={subjectId.toString()}
          className="btn btn-danger border-start border border-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SubjectSingle;
