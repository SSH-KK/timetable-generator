import { useState } from "react";
import {
  TimetableT,
  UseTimetableHookFT,
  CreateCardFT,
  CreateSubjectFT,
  CreateDayFT,
  AddEventFT,
  AddLessonFT,
  DayT,
  CardT,
  SubjectT,
} from "./types/timetable";
import { initialEventLessonsGenrator } from "./utils/timetable";

export const useTimetable: UseTimetableHookFT = () => {
  const [cardState, setCardState] = useState<CardT[]>([]);
  const [dayState, setDayState] = useState<DayT[]>([]);
  const [subjectState, setSubjectState] = useState<SubjectT[]>([]);
  // const [startDateState, setStartDateState] = useState<number>(0)

  const createSubject: CreateSubjectFT = (title, teachers) => {
    setSubjectState(prev => [...prev, { title, teachers }]);
  };

  const createCard: CreateCardFT = (subject, teacher, room) => {
    setCardState(prev => [...prev, { subject, teacher, room }]);
  };

  const createDay: CreateDayFT = date => {
    setDayState(prev => [...prev, { date, events: [] }]);
  };

  const addEvent: AddEventFT = dayId => {
    setDayState(days =>
      days.map((day, i) =>
        i == dayId
          ? {
              ...day,
              events: [
                ...day.events,
                { lessons: initialEventLessonsGenrator() },
              ],
            }
          : day
      )
    );
  };
  
  const addLesson: AddLessonFT = (
    dayId,
    eventId,
    groupId,
    isPair,
    lessonId,
    lessonNumber
  ) => {
    setDayState(days =>
      days.map((day, dayIndex) =>
        dayIndex == dayId
          ? {
              ...day,
              events: day.events.map((event, eventIndex) =>
                eventIndex == eventId
                  ? {
                      lessons: event.lessons.map((lesson, lessonIndex) =>
                        lessonIndex == groupId
                          ? isPair
                            ? [lessonId, lessonId]
                            : lesson.map((lessonElement, lessonElementIndex) =>
                                lessonElementIndex == lessonNumber
                                  ? lessonId
                                  : lessonElement
                              )
                          : lesson
                      ),
                    }
                  : event
              ),
            }
          : day
      )
    );
  };

  return {
    state: { cards: cardState, subjects: subjectState, days: dayState },
    createCard,
    createSubject,
    createDay,
    addLesson,
  };
};
