import React, { useEffect } from "react";
import SideBar from "./components/SideBar";
import styles from "./styles/App.module.css";
import { useTimetable } from './hooks'

const App: React.FC = () => {
  const {state, createSubject, addTeacher} = useTimetable()

  useEffect(()=>createSubject('Физика',['Попов','Пачин']), [])
  useEffect(()=>addTeacher('jhjhjdhfj',0), [])

  return (
    <div className={styles.wrapper}>
      <SideBar addTeacher={addTeacher} createSubject={createSubject} subjects={state.subjects} />
    </div>
  );
};

export default App;
