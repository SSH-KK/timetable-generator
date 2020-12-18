import React, { createRef, useState } from "react";
import styles from "../styles/SideBar.module.css";
import { SubjectT, CreateSubjectFT, AddTeacherFT, DeleteTeacherFT, DeleteSubjectFt } from "../types/timetable";
import SubjectSingle from "./SubjectSingle";

type SidebarProps = {
  subjects: SubjectT[];
  createSubject: CreateSubjectFT;
  addTeacher: AddTeacherFT;
  deleteTeacher: DeleteTeacherFT;
  deleteSubject: DeleteSubjectFt;
};

type InputStateT = {
  subject: string;
  card: string;
};

const SideBar: React.FC<SidebarProps> = ({
  subjects,
  createSubject,
  addTeacher,
  deleteTeacher,
  deleteSubject,
}) => {
  const sideBarRef = createRef<HTMLDivElement>();
  const [inputState, setInputState] = useState<InputStateT>({
    subject: "",
    card: "",
  });

  const toggleSideBar = (event: React.MouseEvent) => {
    event.preventDefault();
    if (sideBarRef.current) {
      const sidebar = sideBarRef.current;
      sidebar.classList.toggle(styles.active);
    }
  };

  const createSubjectForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (event.currentTarget.dataset.name) {
      const name = event.currentTarget.dataset.name;
      setInputState(prev => ({
        ...prev,
        [name]: "",
      }));
      if (name == "subject") {
        createSubject(inputState.subject, []);
      }
    }
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputState(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <nav id={styles.sidebar} className="shadow me-3" ref={sideBarRef}>
      <div className="row justify-content-center">
        <h3 className="text-center">Предметы</h3>
        {subjects.map((ob, subjectIndex) => (
          <SubjectSingle
            addTeacher={addTeacher}
            subjectId={subjectIndex}
            deleteTeacher={deleteTeacher}
            deleteSubject={deleteSubject}
            subject={ob}
            key={subjectIndex}
          />
        ))}
        <div className="col-11">
          <form
            className="mt-2"
            data-name="subject"
            onSubmit={createSubjectForm}
          >
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
      </div>
      <button
        type="button"
        onClick={toggleSideBar}
        id={styles.sidebarToggle}
        className="btn btn-secondary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          className="bi bi-arrow-bar-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"
          />
        </svg>
      </button>
    </nav>
  );
};

export default SideBar;
