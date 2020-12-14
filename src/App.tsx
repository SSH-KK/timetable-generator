import React, { useEffect } from "react";
import { useTimetable } from "./hooks";
import styles from "./styles/App.module.css";
import { createDocument } from "./utils/pdf";

const App: React.FC = () => {
  const { state, createSubject, createDay } = useTimetable();

  useEffect(() => createDay(1, 2, 502), []);

  return (
    <div>
      <h1 className={styles.title}>Hello, world</h1>
      <button
        onClick={() => createDocument(11, 18, state, new Date().getTime())}
      >
        Create
      </button>
      {/* <form
        onSubmit={e => {
          e.preventDefault();
          createSubject(
            (e.currentTarget.elements[0] as HTMLInputElement).value || "",
            ["teacher", "teacherer"]
          );
        }}
      >
        <input name="title" placeholder="Title" type="text" />
        <input type="text" name="teacher" placeholder="teacher" />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {state.subjects.map((subject, subjectIndex) => (
          <li key={subjectIndex}>
            {subject.title}
            <ul>
              {subject.teachers.map((teacher, teacherIndex) => (
                <li key={teacherIndex}>{teacher}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;
