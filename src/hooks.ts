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
  DayT,
  CardT,
  SubjectT,
} from "./types/timetable";
import { initialEventLessonsGenrator } from "./utils/timetable";

export const useTimetable: UseTimetableHookFT = () => {
  const [cardState, setCardState] = useState<CardT[]>([]);
  const [dayState, setDayState] = useState<DayT[]>([]);
  const [subjectState, setSubjectState] = useState<SubjectT[]>([]);

  const createSubject: CreateSubjectFT = (title, teachers) => {
    setSubjectState(prev => [...prev, { title, teachers }]);
  };

  const createCard: CreateCardFT = (subject, teacher, room) => {
    setCardState(prev => [...prev, { subject, teacher, room }]);
  };

  const createDay: CreateDayFT = date => {
    setDayState(prev => [...prev, { date, events: [] }]);
  };

  const addTeacher: AddTeacherFT = (teacher, subjectId) => {
    setSubjectState(subjects =>
      subjects.map((subject, subjectIndex) =>
        subjectIndex == subjectId
          ? { title: subject.title, teachers: [...subject.teachers, teacher] }
          : subject
      )
    );
  };

  const deleteTeacher: DeleteTeacherFT = (subjectId, teacherId) => {
    setSubjectState(subjects =>
      subjects.map((subject, subjectIndex) =>
        subjectIndex == subjectId
          ? {
              title: subject.title,
              teachers: subject.teachers.filter(
                (teacher, teacherIndex) => teacherIndex != teacherId
              ),
            }
          : subject
      )
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
    addEvent,
    addTeacher,
    deleteTeacher,
  };
};
