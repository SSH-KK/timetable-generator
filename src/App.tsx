import React, { useEffect } from "react";
import { useTimetable } from "./hooks";
import Sidebar from "./components/SideBar";
import styles from "./styles/App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
    </div>
  );
};

export default App;
