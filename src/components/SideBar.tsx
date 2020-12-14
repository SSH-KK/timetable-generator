import React from "react";
import styles from "../styles/Sidebar.module.css";

const Sidebar: React.FC = () => {
  console.log(styles);
  return (
    <nav id={styles.sidebar} className={styles.active}>
      <div>
        <h3>Bootstrap Sidebar</h3>
      </div>
      <button
        type="button"
        id={styles.sidebarToggle}
        className="btn btn-secondary rounded-end"
      >
        X
      </button>
    </nav>
  );
};

export default Sidebar;
