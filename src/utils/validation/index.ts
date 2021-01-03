import { TimetableT } from "../../types/timetable";
import { ValidationErrorT } from "../../types/validation";

const joinErrors = (errors: ValidationErrorT) => [];

function findNotUnique<T extends Record<string, unknown>>(array: T[], field: keyof T): number[] {
  const fields = array.map(e => (e === undefined ? undefined : e[field]));
  return array
    .filter(a =>
      a === undefined ? false : fields.indexOf(a[field]) != fields.lastIndexOf(a[field])
    )
    .map(element => array.indexOf(element));
}

const validate = (data: TimetableT): ValidationErrorT[] => {
  const errors: ValidationErrorT[] = [];

  data.days.forEach((day, dayIndex) =>
    day.events.forEach((event, eventIndex) =>
      Array(2)
        .fill("")
        .forEach((_, lessonNumber) => {
          const cardIDs = [...event.lessons10[lessonNumber], ...event.lessons11[lessonNumber]];
          const cards = cardIDs.map(cardID => data.cards[cardID]);
          cardFields.forEach(field => {
            const nonUnique = findNotUnique(cards, field);
            errors.push(
              ...nonUnique.map(nonUniqueElementIndex => ({
                day: dayIndex,
                event: eventIndex,
                lessonNumber,
                cardID: cardIDs[nonUniqueElementIndex],
                fields: [field],
              }))
            );
          });
        })
    )
  );
  return joinErrors(errors);
};

export { validate, findNotUnique };
