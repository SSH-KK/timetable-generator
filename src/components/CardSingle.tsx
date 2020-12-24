import React, { useEffect } from "react";
import { CardT } from "../types/timetable";
import styles from "../styles/SideBar.module.css";
import { DeleteCardFt } from "../types/timetable";

type CardSingleProps = {
  card: {
    status: boolean;
    room: number;
    subject: string;
    teacher: string;
    cardIndex: number;
  };
  deleteCard: DeleteCardFt;
};

const CardSingle: React.FC<CardSingleProps> = ({ card }, deleteCard) => {
  useEffect(() => (!card.status ? deleteCard(card.cardIndex) : ""), []);
  return card.status ? (
    <div
      className={`${styles.subjectCard} col-11 border rounded rounded-2 border-3 p-2 mt-2`}
    >
      <h4 className="text-center">{card.subject}</h4>
      <h5 className="text-center">{card.room}</h5>
      <h5 className="text-center">{card.teacher}</h5>
    </div>
  ) : (
    <></>
  );
};

export default CardSingle;
