import { SetValidationErrorsFT, TimetableT } from "../../types/timetable"
import { ValidationErrorT } from "../../types/validation"
import { generateErrorWithAddress } from "./utils"

/**
 * Function to validate timetable for errors in content
 * @param data State returned by useTimetable hook
 * @param setError setValidationErrors method returned by useTimetable hook
 * @param dayID Index of day to validate
 * @param eventID Index of event to validate
 */
const validate = (
  data: TimetableT,
  setError: SetValidationErrorsFT,
  dayID: number,
  eventID: number
): void => {
  const errors = Array<ValidationErrorT>(12).fill({ id: -1 })
  const event = data.days[dayID].events[eventID]

  const hasErros: [boolean, boolean] = [false, false]

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
              data.teachers[data.subjects[card.subject].teachers[card.teacher]] ==
                data.teachers[data.subjects[cardForCheck.subject].teachers[cardForCheck.teacher]] &&
              card.room != cardForCheck.room
            ) {
              errors[cardIndex] = generateError(0)
              hasErros[Math.floor(lessonIndex / 6)] = true
            }
            if (
              card.room == cardForCheck.room &&
              data.teachers[data.subjects[card.subject].teachers[card.teacher]] !=
                data.teachers[data.subjects[cardForCheck.subject].teachers[cardForCheck.teacher]]
            ) {
              errors[cardIndex] = generateError(1)
              hasErros[Math.floor(lessonIndex / 6)] = true
            }
            if (
              data.teachers[data.subjects[card.subject].teachers[card.teacher]] ==
                data.teachers[data.subjects[cardForCheck.subject].teachers[cardForCheck.teacher]] &&
              card.subject != cardForCheck.subject
            ) {
              errors[cardIndex] = generateError(2)
              hasErros[Math.floor(lessonIndex / 6)] = true
            }
          }
        })
      )
    })

  setError(prev => ({
    has: hasErros,
    errors: prev.errors.map((clas, classIndex) =>
      hasErros[classIndex]
        ? clas.map((day, dayIndex) =>
            dayIndex == dayID
              ? day.map((event, eventIndex) => (eventIndex == eventID ? errors : event))
              : day
          )
        : clas
    ),
  }))
}

export { validate }
