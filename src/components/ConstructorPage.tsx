import React from "react";
import styles from "../styles/Constructor.module.css";
import { DayT } from "../types/timetable";

type ConstructorPageProps = {
  days: DayT[];
  classNum: string;
};

const ConstructorPage: React.FC<ConstructorPageProps> = ({ days, classNum }) => {
  return (
    <div className="d-grid gap-2 my-2">
      <button className="btn btn-outline-primary btn-sm" type="button">
        Новый День
      </button>
    </div>
  );
};

export default ConstructorPage;
