import React, { createRef, useState } from "react";
import styles from "../styles/SideBar.module.css";
import {
  SubjectT,
  CardT,
  CreateSubjectFT,
  CreateCardFT,
  AddTeacherFT,
  DeleteTeacherFT,
  DeleteSubjectFt,
  DeleteCardFt,
} from "../types/timetable";
import SubjectSingle from "./SubjectSingle";
import CardSingle from "./CardSingle";

type SidebarProps = {
  subjects: SubjectT[];
  cards: CardT[];
  createSubject: CreateSubjectFT;
  createCard: CreateCardFT;
  addTeacher: AddTeacherFT;
  deleteTeacher: DeleteTeacherFT;
  deleteSubject: DeleteSubjectFt;
  deleteCard: DeleteCardFt;
};

type InputStateT = {
  subject: string;
  card:{
    subject: number;
    teacher: number;
    room: string;
  }
};

const SideBar: React.FC<SidebarProps> = ({
  subjects,
  cards,
  createSubject,
  createCard,
  addTeacher,
  deleteTeacher,
  deleteSubject,
  deleteCard,
}) => {
  const sideBarRef = createRef<HTMLDivElement>();
  const sidebarToggleRef = createRef<HTMLButtonElement>();
  const [inputState, setInputState] = useState<InputStateT>({
    subject: "",
    card: {
      subject: -1,
      teacher: -1,
<<<<<<< HEAD
      room: '',
    }
=======
      room: -1,
    },
>>>>>>> f1dfe4e411e223046f04d989915edd44d209ea95
  });

  const toggleSideBar = (event: React.MouseEvent) => {
    event.preventDefault();
    if (sideBarRef.current && sidebarToggleRef.current) {
      const sidebar = sideBarRef.current;
      const sidebarToggle = sidebarToggleRef.current;
      sidebarToggle.classList.toggle(styles.active);
      sidebar.classList.toggle(styles.active);
    }
  };

  const createForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (event.currentTarget.dataset.name) {
      const name = event.currentTarget.dataset.name;
      setInputState(prev => ({
        ...prev,
        [name]: name == 'subject' ? '' : {subject:-1, teacher: -1, room: ''},
      }));
      if (name == 'subject') {
        createSubject(inputState.subject, []);
      }
      else if(name == 'card'){
        createCard(inputState.card.subject, inputState.card.teacher, parseInt(inputState.card.room))
      }
    }
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputState(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

<<<<<<< HEAD
  const cardSelectChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>{
    if(event.target.name){
      const name = event.target.name
      setInputState(prev =>({
=======
  const cardSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.name) {
      const name = event.target.name;
      setInputState(prev => ({
>>>>>>> f1dfe4e411e223046f04d989915edd44d209ea95
        subject: prev.subject,
        card: {
          ...prev.card,
<<<<<<< HEAD
          [name]: name!='room'? parseInt(event.target.value) : event.target.value
        }
      }))
=======
          [name]: parseInt(event.target.value),
        },
      }));
>>>>>>> f1dfe4e411e223046f04d989915edd44d209ea95
    }
  };

  const deleteSubjectButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const subjectIndex = parseInt(event.currentTarget.name);
    deleteSubject(subjectIndex);
    if (subjectIndex == inputState.card.subject) {
      setInputState(prev => ({
        subject: prev.subject,
        card: {
          ...prev.card,
          subject: -1,
        },
      }));
    }
  };

  return (
    <>
<<<<<<< HEAD
    <nav id={styles.sidebar} className="shadow me-3" ref={sideBarRef}>
      <div className="row justify-content-center">
        <h3 className="text-center">Предметы</h3>
        {subjects.map((ob, subjectIndex) => (
          ob.status ?
          <SubjectSingle
            addTeacher={addTeacher}
            subjectId={subjectIndex}
            deleteTeacher={deleteTeacher}
            deleteSubjectButton={deleteSubjectButton}
            subject={ob}
            key={subjectIndex}
          />
          :
          ''
        ))}
        <div className="col-11">
          <form
            className="mt-2"
            data-name="subject"
            onSubmit={createForm}
          >
            <div className="input-group input-group-sm">
              <input
                type="text"
                name="subject"
                onChange={inputChange}
                value={inputState.subject}
                className="form-control border border-3  rounded rounded-3"
                placeholder="Предмет"
              />
            </div>
          </form>
        </div>
        <h3 className="text-center mt-2">Пары</h3>
        {cards.map((ob, cardIndex)=>(
          <CardSingle deleteCard={deleteCard} card={ {cardIndex: cardIndex, status: subjects[ob.subject].status, room: ob.room, subject: subjects[ob.subject].title, teacher: subjects[ob.subject].teachers[ob.teacher]} } key={cardIndex}/>
         ))}
        <div className='col-11'>
          <form className='mt-2' data-name='card' onSubmit={createForm}>
            <select name='subject' value={inputState.card.subject} onChange={cardSelectChange} className="form-select">
              <option value='-1'>Предмет</option>
              {subjects.map((ob, subjectIndex)=>(
                ob.status ?
                <option value={subjectIndex} key={subjectIndex}>{ob.title}</option>
                :
                ''
               ))}
            </select>
            {
              inputState.card.subject!=-1 ?
              <select name='teacher' value={inputState.card.teacher} onChange={cardSelectChange} className="form-select mt-2">
                <option value='-1'>Преподаватель</option>
                {
                  subjects[inputState.card.subject].teachers.map((ob, teacherIndex)=>(
                  <option value={teacherIndex} key={teacherIndex}>{ob}</option>
                  ))
                }
              </select>
              :
              ''
            }
            { inputState.card.subject!=-1 ?
            <div className="input-group input-group-sm mt-2">
              <input type="text" value={inputState.card.room} placeholder='Кабинет' onChange={cardSelectChange} name='room' className="form-control"/>
            </div>
            :
            ''
            }
          </form>
=======
      <nav id={styles.sidebar} className="shadow me-3" ref={sideBarRef}>
        <div className="row justify-content-center">
          <h3 className="text-center">Предметы</h3>
          {subjects.map((ob, subjectIndex) =>
            ob.status ? (
              <SubjectSingle
                addTeacher={addTeacher}
                subjectId={subjectIndex}
                deleteTeacher={deleteTeacher}
                deleteSubjectButton={deleteSubjectButton}
                subject={ob}
                key={subjectIndex}
              />
            ) : (
              ""
            )
          )}
          <div className="col-11">
            <form
              className="mt-2"
              data-name="subject"
              onSubmit={createSubjectForm}
            >
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  name="subject"
                  onChange={inputChange}
                  value={inputState.subject}
                  className="form-control border border-3  rounded rounded-3"
                  placeholder="Предмет"
                />
              </div>
            </form>
          </div>
          <h3 className="text-center mt-2">Пары</h3>
          {cards.map((ob, cardIndex) => (
            <CardSingle
              card={{
                room: ob.room,
                subject: subjects[ob.subject].title,
                teacher: subjects[ob.subject].teachers[ob.teacher],
              }}
              key={cardIndex}
            />
          ))}
          <div className="col-11">
            <form className="mt-2" data-name="card">
              <select
                name="subject"
                value={inputState.card.subject}
                onChange={cardSelectChange}
                className="form-select"
              >
                <option value="-1">Предмет</option>
                {subjects.map((ob, subjectIndex) =>
                  ob.status ? (
                    <option value={subjectIndex} key={subjectIndex}>
                      {ob.title}
                    </option>
                  ) : (
                    ""
                  )
                )}
              </select>
              {inputState.card.subject != -1 ? (
                <select
                  name="teacher"
                  value={inputState.card.teacher}
                  onChange={cardSelectChange}
                  className="form-select"
                >
                  <option value="-1">Преподаватель</option>
                  {subjects[inputState.card.subject].teachers.map(
                    (ob, teacherIndex) => (
                      <option value={teacherIndex} key={teacherIndex}>
                        {ob}
                      </option>
                    )
                  )}
                </select>
              ) : (
                ""
              )}
            </form>
          </div>
>>>>>>> f1dfe4e411e223046f04d989915edd44d209ea95
        </div>
      </nav>
      <button
        type="button"
        onClick={toggleSideBar}
        id={styles.sidebarToggle}
        className="btn btn-secondary"
        ref={sidebarToggleRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          className="bi bi-arrow-bar-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"
          />
        </svg>
      </button>
    </>
  );
};

export default SideBar;
