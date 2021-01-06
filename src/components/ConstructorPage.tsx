import React from "react";
import styles from "../styles/Constructor.module.css";
import assets from "../assets/pdf";
import { DayT, SubjectT, CardT, LessonsType } from "../types/timetable";

type ConstructorPageProps = {
  days: DayT[];
  classNum: LessonsType;
  addButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  cards: CardT[];
  subjects: SubjectT[];
};

const ConstructorPage: React.FC<ConstructorPageProps> = ({
  days,
  subjects,
  cards,
  classNum,
  addButton,
}) => {
  return (
    <>
      {days.map((day, dayIndex) => (
        <div className="row" key={dayIndex}>
          <div className="col-12 text-center border-bottom border-1">
            <h4>{`${new Date(day.date).getDate()} ${
              assets.weekdays[
                new Date(day.date).getDay() - 1 != -1 ? new Date(day.date).getDay() - 1 : 6
              ]
            }`}</h4>
          </div>
          {day.events.map(event =>
            event[classNum][0].map((_, cardID) => (
              <div className="col-2 border border-1 py-5 px-2">
                {event[classNum][0][cardID] == -1 && event[classNum][1][cardID] == -1 ? (
                  <select name="subject" className="form-select">
                    <option value="-1">Пара</option>
                    {cards.map((card, cardIndex) =>
                      card.status ? (
                        <option value={cardIndex}>{`${subjects[card.subject].title} - ${
                          subjects[card.subject].teachers[card.teacher]
                        } - ${card.room}`}</option>
                      ) : (
                        ""
                      )
                    )}
                  </select>
                ) : (
                  <h3>Already</h3>
                )}
              </div>
            ))
          )}
          <div className="d-grid gap-2 my-2">
            <button
              data-name="event"
              data-dayNum={dayIndex}
              onClick={addButton}
              className="btn btn-outline-primary btn-sm"
              type="button"
            >
              Новые пары
            </button>
          </div>
        </div>
      ))}
      <div className="d-grid gap-2 my-2">
        <button
          data-name="day"
          onClick={addButton}
          className="btn btn-outline-primary btn-sm"
          type="button"
        >
          Новый День
        </button>
      </div>
    </>
  );
};

export default ConstructorPage;
