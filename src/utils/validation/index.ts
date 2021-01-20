import { TimetableT } from "../../types/timetable"
import { ValidationErrorT, ValidationStatusT } from "../../types/validation"
import { generateErrorWithAddress } from "./utils"

/**
 * Function to validate timetable for errors in content
 * @param data State returned by useTimetable hook
 * @param setError setValidationErrors method returned by useTimetable hook
 * @param dayID Index of day to validate
 * @param eventID Index of event to validate
 */
const validate = (data: TimetableT, dayID: number, eventID: number): ValidationStatusT => {
  const errors = Array<ValidationErrorT>(12).fill({ id: -1 })
  const event = data.days[dayID].events[eventID]

  const thisRowHasErrors: [boolean, boolean] = [false, false]

  Array(2)
    .fill("")
    .forEach((_, lessonIndex) => {
      const cardIDs = [...event.lessons10[lessonIndex], ...event.lessons11[lessonIndex]]
      const cards = cardIDs.map(cardID => data.cards[cardID])
      cards.forEach((card, cardIndex) =>
        cards.forEach((cardForCheck, cardForCheckIndex) => {
          if (card && cardForCheck) {
            const generateError = generateErrorWithAddress(
              dayID,
              eventID,
              lessonIndex,
              cardForCheckIndex
            )
            if (
              data.teachers[card.teacher] == data.teachers[cardForCheck.teacher] &&
              card.room != cardForCheck.room
            ) {
              errors[cardIndex] = generateError(0)
              thisRowHasErrors[Math.floor(cardIndex / 6)] = true
            }
            if (
              card.room == cardForCheck.room &&
              data.teachers[card.teacher] != data.teachers[cardForCheck.teacher]
            ) {
              errors[cardIndex] = generateError(1)
              thisRowHasErrors[Math.floor(cardIndex / 6)] = true
            }
            if (
              data.teachers[card.teacher] == data.teachers[cardForCheck.teacher] &&
              card.subject != cardForCheck.subject
            ) {
              errors[cardIndex] = generateError(2)
              thisRowHasErrors[Math.floor(cardIndex / 6)] = true
            }
          }
        })
      )
    })

  const newHasErrors: [boolean, boolean] = [...thisRowHasErrors]
  const newRows = data.validation.rows.map((day, dayIndex) =>
    day.map((event, eventIndex) => {
      if (dayIndex == dayID && eventIndex == eventID) return thisRowHasErrors

      newHasErrors[0] ||= event[0]
      newHasErrors[1] ||= event[1]
      return event
    })
  )

  return {
    has: newHasErrors,
    rows: newRows,
    errors: data.validation.errors.map((clas, classIndex) =>
      clas.map((day, dayIndex) =>
        dayIndex == dayID
          ? day.map((event, eventIndex) =>
              eventIndex == eventID ? errors.slice(classIndex ? 6 : 0, classIndex ? 12 : 6) : event
            )
          : day
      )
    ),
  }
}

export { validate }
