import { TimetableT } from "../../types/timetable"
import { ValidationErrorT } from "../../types/validation"
import { generateErrorWithAddress } from "./utils"

const validate = (data: TimetableT): ValidationErrorT[] => {
  const errors: ValidationErrorT[] = []

  data.days.forEach((day, dayIndex) =>
    day.events.forEach((event, eventIndex) =>
      Array(2)
        .fill("")
        .forEach((_, lessonNumber) => {
          const cardIDs = [...event.lessons10[lessonNumber], ...event.lessons11[lessonNumber]]
          const cards = cardIDs.map(cardID => data.cards[cardID])
          cards.forEach((card, cardIndex) => {
            cards.map((cardForCheck, cardForCheckIndex) => {
              if (card && cardForCheck) {
                const generateError = generateErrorWithAddress(
                  dayIndex,
                  eventIndex,
                  lessonNumber,
                  cardIndex,
                  cardForCheckIndex
                )
                if (card.teacher == cardForCheck.teacher && card.room != cardForCheck.room)
                  errors.push(generateError(0))
                if (card.room == cardForCheck.room && card.teacher != cardForCheck.teacher)
                  errors.push(generateError(1))
                if (card.teacher == cardForCheck.teacher && card.subject != cardForCheck.subject)
                  errors.push(generateError(2))
              }
            })
          })
        })
    )
  )
  return errors
}

export { validate }
