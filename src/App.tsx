import React, { useEffect } from "react";
import { useTimetable } from "./hooks";
import SideBar from "./components/Sidebar";
import styles from "./styles/App.module.css";

const App: React.FC = () => {
  const {state, createSubject} = useTimetable()

  useEffect(()=>createSubject('Физика',['Попов','Пачин']), [])
  return (
    <div className={styles.wrapper}>
      <SideBar subjects={state.subjects} />
    </div>
  );
};

export default App;
