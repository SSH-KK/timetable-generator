import React from "react";
import { CardT } from "../types/timetable";
import styles from "../styles/SideBar.module.css";

type CardSingleProps = {
  card: {
    room: number;
    subject: string;
    teacher: string;
  };
};

const CardSingle: React.FC<CardSingleProps> = ({ card }) => {
  return (
    <div
      className={`${styles.subjectCard} col-11 border rounded rounded-2 border-3 p-2 mt-2`}
    >
      <h4 className="text-center">{card.subject}</h4>
      <h5 className="text-center">{card.room}</h5>
      <h5 className="text-center">{card.teacher}</h5>
    </div>
  );
};

export default CardSingle;
