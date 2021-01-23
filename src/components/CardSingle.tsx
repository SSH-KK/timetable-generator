import React, { Dispatch, useEffect } from "react"
import styles from "@styles/SideBar.module.css"
import { ReducerAction } from "@type/reducer"
import { deleteCardAction } from "@utils/reducer/actions"
import DeleteButtonIcon from "@icons/deleteButton.svg"

type CardSingleProps = {
  card: {
    status: boolean
    subStatus: boolean
    room: number
    subject: string
    teacher: string
    cardIndex: number
  }
  dispatcher: Dispatch<ReducerAction>
}

const CardSingle: React.FC<CardSingleProps> = ({ card, dispatcher }) => {
  useEffect(() => {
    !card.subStatus ? dispatcher(deleteCardAction({ cardID: card.cardIndex })) : ""
  }, [card.subStatus])

  const deleteCardButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const cardIndex = parseInt(e.currentTarget.name)
    dispatcher(deleteCardAction({ cardID: cardIndex }))
  }

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
        <DeleteButtonIcon />
      </button>
    </div>
  ) : null
}

export default CardSingle
