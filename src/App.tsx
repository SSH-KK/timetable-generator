import React, { useEffect } from "react";
import SideBar from "./components/SideBar";
import styles from "./styles/App.module.css";
import { useTimetable } from "./hooks";

const App: React.FC = () => {
  const {
    state,
    createSubject,
    createCard,
    addTeacher,
    deleteTeacher,
    deleteSubject,
    deleteCard,
  } = useTimetable();

  useEffect(() => createSubject("Физика", ["Попов", "Пачин"]), []);
  useEffect(() => createCard(0, 0, 505), []);

  return (
    <div className={styles.wrapper}>
      <SideBar
        addTeacher={addTeacher}
        createSubject={createSubject}
        createCard={createCard}
        deleteTeacher={deleteTeacher}
        deleteSubject={deleteSubject}
        deleteCard={deleteCard}
        subjects={state.subjects}
        cards={state.cards}
      />
    </div>
  );
};

export default App;
