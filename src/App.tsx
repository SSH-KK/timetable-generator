import React, { useEffect } from "react";
import { useTimetable } from "./hooks";

import styles from "./styles/App.module.css";

const App: React.FC = () => {
  const { createDay } = useTimetable();

  useEffect(() => createDay(1, 2, 502), []);

  return (
    <div className="wrapper">
      <nav id="sidebar">
        <h1 className="display-1">akdakdlk</h1>
        <p className={styles.tastiestTest}>Testing text</p>
        <span className={styles.title}>Title</span>
      </nav>
    </div>
  );
};

export default App;
