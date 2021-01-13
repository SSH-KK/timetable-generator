import React, { useEffect } from "react"
import styles from "../styles/SideBar.module.css"
import { DeleteCardFT } from "../types/timetable"

type CardSingleProps = {
  card: {
    status: boolean
    subStatus: boolean
    room: number
    subject: string
    teacher: string
    cardIndex: number
  }
  deleteCardButton: (event: React.MouseEvent<HTMLButtonElement>) => void
  deleteCard: DeleteCardFT
}

const CardSingle: React.FC<CardSingleProps> = ({ card, deleteCardButton, deleteCard }) => {
  useEffect(() => {
    !card.subStatus ? deleteCard(card.cardIndex) : ""
  }, [card.subStatus])

  return card.status ? (
    <div className={`${styles.subjectCard} col-11 border rounded rounded-2 border-3 p-2 mt-2`}>
      <h4 className="text-center">{card.subject}</h4>
      <h5 className="text-center">{card.room}</h5>
      <h5 className="text-center">{card.teacher}</h5>
      <button
        type="button"
        onClick={deleteCardButton}
        name={card.cardIndex.toString()}
        className={`btn btn-danger border-start border border-3 ${styles.deleteSubject}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
  ) : null
}

export default CardSingle
