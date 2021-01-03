import React from "react";
import styles from "../styles/Constructor.module.css";
import { DayT } from "../types/timetable";

type ConstructorPageProps = {
  days: DayT[];
  classNum: string;
  addButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ConstructorPage: React.FC<ConstructorPageProps> = ({ days, classNum, addButton }) => {
  return (
    <div className="d-grid gap-2 my-2">
      <button
        data-name="day"
        onClick={addButton}
        className="btn btn-outline-primary btn-sm"
        type="button"
      >
        Новый День
      </button>
    </div>
  );
};

export default ConstructorPage;
