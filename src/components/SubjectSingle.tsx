import React, { useState } from "react";
import { SubjectT, AddTeacherFT, DeleteTeacherFT } from "../types/timetable";

type SubjectSingleProps = {
  subject: SubjectT;
  addTeacher: AddTeacherFT;
  deleteTeacher: DeleteTeacherFT;
  subjectId: number;
};

const SubjectSingle: React.FC<SubjectSingleProps> = ({
  subject,
  addTeacher,
  deleteTeacher,
  subjectId,
}) => {
  const [inputState, setInputState] = useState("");

  const addTeacherForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTeacher(inputState, subjectId);
    setInputState("");
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
    <div className="col-11 border rounded rounded-2 border-3 p-2 mt-2">
      <h4>{subject.title}</h4>
      <div className="d-flex flex-wrap">
        {subject.teachers.map((teacher, teacherIndex) => (
          <div className="p-1 rounded rounded-3 me-2 shadow-sm">
            <h5 className="list-inline-item mb-0 me-0">{teacher}</h5>
            <button
              type="button"
              className="btn-close h-0"
              onClick={deleteTeacherButton}
              name={teacherIndex.toString()}
            ></button>
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
      </form>
    </div>
  );
};

export default SubjectSingle;
