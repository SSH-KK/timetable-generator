import { TimetableT } from "../../types/timetable";
import { ValidationErrorT } from "../../types/validation";

const validate = (data: TimetableT): ValidationErrorT[] => {
  const errors: ValidationErrorT[] = [];

  data.days.forEach((day, dayIndex) =>
    day.events.forEach((event, eventIndex) =>
      Array(2)
        .fill("")
        .forEach((_, lessonNumber) => {
          const cardIDs = [...event.lessons10[lessonNumber], ...event.lessons11[lessonNumber]];
          const cards = cardIDs.map(cardID => data.cards[cardID]);
          cards.forEach((card, cardIndex) => {
            cards.map((cardForCheck, cardForCheckIndex) => {
              if (card && cardForCheck)
                if (card.teacher == cardForCheck.teacher && card.room != cardForCheck.room)
                  errors.push({
                    position: {
                      day: dayIndex,
                      event: eventIndex,
                      lessonNumber,
                      classNumber: 10 + Math.floor(cardIndex / 6),
                      group: cardIndex % 6,
                    },
                    message: {
                      id: 0,
                      position: {
                        day: dayIndex,
                        event: eventIndex,
                        lessonNumber,
                        classNumber: 10 + Math.floor(cardForCheckIndex / 6),
                        group: cardForCheckIndex % 6,
                      },
                    },
                  });
            });
          });
        })
    )
  );
  return errors;
};

export { validate };
