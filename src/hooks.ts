import { useState } from "react";
import {
  UseTimetableHookFT,
  CreateCardFT,
  CreateSubjectFT,
  CreateDayFT,
  AddEventFT,
  AddLessonFT,
  AddTeacherFT,
  DeleteTeacherFT,
  DeleteSubjectFT,
  DeleteCardFT,
  DayT,
  CardT,
  SubjectT,
  LessonsType,
} from "./types/timetable";
import { initialEventLessonsGenrator } from "./utils/timetable";

export const useTimetable: UseTimetableHookFT = () => {
  const [cardState, setCardState] = useState<CardT[]>([]);
  const [dayState, setDayState] = useState<DayT[]>([]);
  const [subjectState, setSubjectState] = useState<SubjectT[]>([]);

  const createSubject: CreateSubjectFT = (title, teachers) => {
    setSubjectState(prev => [...prev, { title, teachers, status: true }]);
  };

  const createCard: CreateCardFT = (subject, teacher, room) => {
    setCardState(prev => [...prev, { subject, teacher, room, status: true }]);
  };

  const createDay: CreateDayFT = date => {
    setDayState(prev => [...prev, { date, events: [] }]);
  };

  const addTeacher: AddTeacherFT = (teacher, subjectId) => {
    setSubjectState(subjects =>
      subjects.map((subject, subjectIndex) =>
        subjectIndex == subjectId
          ? {
              title: subject.title,
              status: subject.status,
              teachers: [...subject.teachers, teacher],
            }
          : subject
      )
    );
  };

  const deleteSubject: DeleteSubjectFT = subjectId => {
    setSubjectState(subjects =>
      subjects.map((subject, subjectIndex) =>
        subjectIndex == subjectId ? { ...subject, status: false } : subject
      )
    );
  };

  const deleteTeacher: DeleteTeacherFT = (subjectId, teacherId) => {
    setSubjectState(subjects =>
      subjects.map((subject, subjectIndex) =>
        subjectIndex == subjectId
          ? {
              title: subject.title,
              status: subject.status,
              teachers: subject.teachers.filter(
                (teacher, teacherIndex) => teacherIndex != teacherId
              ),
            }
          : subject
      )
    );
  };

  const deleteCard: DeleteCardFT = cardId => {
    setCardState(cards =>
      cards.map((card, cardIndex) => (cardIndex == cardId ? { ...card, status: false } : card))
    );
  };

  const addEvent: AddEventFT = dayId => {
    setDayState(days =>
      days.map((day, i) =>
        i == dayId
          ? {
              ...day,
              events: [
                ...day.events,
                {
                  lessons10: initialEventLessonsGenrator(),
                  lessons11: initialEventLessonsGenrator(),
                },
              ],
            }
          : day
      )
    );
  };

  const addLesson: AddLessonFT = (
    dayId,
    eventId,
    classNumber,
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
                      ...event,
                      [`lessons${classNumber}` as LessonsType]: event[
                        `lessons${classNumber}` as LessonsType
                      ].map((lesson, lessonIndex) =>
                        lessonIndex == groupId
                          ? isPair
                            ? [lessonId, lessonId]
                            : lesson.map((lessonElement, lessonElementIndex) =>
                                lessonElementIndex == lessonNumber ? lessonId : lessonElement
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
    addEvent,
    addTeacher,
    deleteTeacher,
    deleteSubject,
    deleteCard,
  };
};
