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
  ChangeMainDateFT,
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
  const [teacherState, setTeacherState] = useState<string[]>([]);

  const createSubject: CreateSubjectFT = title => {
    const newSubjectID = subjectState.length;
    setSubjectState(prev => [...prev, { title, teachers: [], status: true }]);
  };

  const createCard: CreateCardFT = (subject, teacher, room) => {
    setCardState(prev => [...prev, { subject, teacher, room, status: true }]);
  };

  const createDay: CreateDayFT = date => {
    setDayState(prev => [...prev, { date, events: [] }]);
  };

  const changeMainDate: ChangeMainDateFT = (newDate) => {
    const date = new Date(newDate)
    setDayState((prev) => (
      prev.map((day, dayIndex) => ({ ...day, date: date.getTime() + 24 * 3600 * 1000 * dayIndex }))
    ))
  }

  const addTeacher: AddTeacherFT = (teacher, subjectId) => {
    let teacherID = teacherState.indexOf(teacher);
    if (teacherID < 0) {
      setTeacherState(prev => {
        teacherID = prev.length;
        return [...prev, teacher];
      });
    }

    setSubjectState(subjects =>
      subjects.map((subject, subjectIndex) =>
        subjectIndex == subjectId
          ? {
            title: subject.title,
            status: subject.status,
            teachers: [...subject.teachers, teacherID],
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
    console.log("Trying to delete", teacherId);
    setSubjectState(subjects =>
      subjects.map((subject, subjectIndex) =>
        subjectIndex == subjectId
          ? {
            title: subject.title,
            status: subject.status,
            teachers: subject.teachers.filter(teacher => teacher != teacherId),
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
    state: { cards: cardState, subjects: subjectState, days: dayState, teachers: teacherState },
    createCard,
    createSubject,
    createDay,
    addLesson,
    addEvent,
    addTeacher,
    deleteTeacher,
    deleteSubject,
    changeMainDate,
    deleteCard,
  };
};
