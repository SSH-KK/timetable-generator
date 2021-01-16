import React, { createRef, useEffect } from "react"
import SideBar from "./components/SideBar"
import Constructor from "./components/Constructor"
import stylesApp from "./styles/App.module.css"
import stylesSideBar from "./styles/SideBar.module.css"
import stylesConstructor from "./styles/Constructor.module.css"
import { useTimetable } from "./hooks"
import SidebarToggleIcon from "./icons/sidebarToggle.svg"

const App: React.FC = () => {
  const [state, dispatcher] = useTimetable()

  const sidebarToggleRef = createRef<HTMLButtonElement>()
  const sidebarRef = createRef<HTMLDivElement>()
  const constructorRef = createRef<HTMLDivElement>()

  useEffect(()=>{
    localStorage.setItem('TimetableState', JSON.stringify(state))
  },[state])

  const toggleSideBar = (event: React.MouseEvent) => {
    event.preventDefault()
    if (sidebarToggleRef.current && sidebarRef.current && constructorRef.current) {
      const sidebarToggle = sidebarToggleRef.current
      const sidebar = sidebarRef.current
      const constructor = constructorRef.current
      sidebar.classList.toggle(stylesSideBar.active)
      sidebarToggle.classList.toggle(stylesApp.active)
      constructor.classList.toggle(stylesConstructor.active)
    }
  }

  return (
    <div className={stylesApp.wrapper}>
      <SideBar
        sidebarRef={sidebarRef}
        dispatcher={dispatcher}
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
        <SidebarToggleIcon />
      </button>
      <Constructor
        days={state.days}
        teachers={state.teachers}
        subjects={state.subjects}
        cards={state.cards}
        dispatcher={dispatcher}
        constructorRef={constructorRef}
        validation={state.validation}
      />
    </div>
  )
}

export default App
