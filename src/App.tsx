import React, { useEffect } from "react";
import SideBar from "./components/SideBar";
import styles from "./styles/App.module.css";
import { useTimetable } from "./hooks";

const App: React.FC = () => {
  const { state, createSubject, addTeacher, deleteTeacher } = useTimetable();

  useEffect(() => createSubject("Физика", ["Попов", "Пачин"]), []);

  return (
    <div className={styles.wrapper}>
      <SideBar
        addTeacher={addTeacher}
        createSubject={createSubject}
        deleteTeacher={deleteTeacher}
        subjects={state.subjects}
      />
    </div>
  );
};

export default App;
