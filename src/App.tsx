import React from "react";
import SideBar from "./components/SideBar";
import styles from "./styles/App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <SideBar />
    </div>
  );
};

export default App;
