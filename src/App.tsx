import React, { createRef, useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import Constructor from "./components/Constructor";
import stylesApp from "./styles/App.module.css";
import stylesSideBar from "./styles/SideBar.module.css";
import stylesConstructor from "./styles/Constructor.module.css";
import { useTimetable } from "./hooks";

const App: React.FC = () => {
  const {
    state,
    createSubject,
    createDay,
    createCard,
    changeMainDate,
    addTeacher,
    addEvent,
    deleteTeacher,
    deleteSubject,
    deleteCard,
  } = useTimetable();

  const sidebarToggleRef = createRef<HTMLButtonElement>();
  const sidebarRef = createRef<HTMLDivElement>();
  const constructorRef = createRef<HTMLDivElement>();

  const toggleSideBar = (event: React.MouseEvent) => {
    event.preventDefault();
    if (sidebarToggleRef.current && sidebarRef.current && constructorRef.current) {
      const sidebarToggle = sidebarToggleRef.current;
      const sidebar = sidebarRef.current;
      const constructor = constructorRef.current;
      sidebar.classList.toggle(stylesSideBar.active);
      sidebarToggle.classList.toggle(stylesApp.active);
      constructor.classList.toggle(stylesConstructor.active);
    }
  };

  return (
    <div className={stylesApp.wrapper}>
      <SideBar
        sidebarRef={sidebarRef}
        addTeacher={addTeacher}
        createSubject={createSubject}
        createCard={createCard}
        deleteTeacher={deleteTeacher}
        deleteSubject={deleteSubject}
        deleteCard={deleteCard}
        subjects={state.subjects}
        cards={state.cards}
        teachers={state.teachers}
      />
      <button
        type="button"
        onClick={toggleSideBar}
        id={stylesApp.sidebarToggle}
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
      <Constructor
        days={state.days}
        subjects={state.subjects}
        cards={state.cards}
        addEvent={addEvent}
        changeMainDate={changeMainDate}
        createDay={createDay}
        constructorRef={constructorRef}
      />
    </div>
  );
};

export default App;
