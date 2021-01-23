import React, { createRef, useEffect } from "react"
import SideBar from "@components/SideBar"
import Constructor from "@components/Constructor"
import stylesApp from "@styles/App.module.css"
import stylesSideBar from "@styles/SideBar.module.css"
import stylesConstructor from "@styles/Constructor.module.css"
import { useTimetable } from "./hooks"
import SidebarToggleIcon from "@icons/sidebarToggle.svg"
import { initialState } from "@assets/timetable"
import { setStateFromLocalStorageAction } from "@utils/reducer/actions"

const App: React.FC = () => {
  const [state, dispatcher] = useTimetable()

  const sidebarToggleRef = createRef<HTMLButtonElement>()
  const sidebarRef = createRef<HTMLDivElement>()
  const constructorRef = createRef<HTMLDivElement>()

  useEffect(() => {
    const ldata = localStorage.getItem("TimetableState")

    if (ldata) dispatcher(setStateFromLocalStorageAction({ ldata }))
    else localStorage.setItem("TimetableState", JSON.stringify(state))
  }, [])

  useEffect(() => {
    const ldata = localStorage.getItem("TimetableState")

    if (ldata && JSON.stringify(state) != JSON.stringify(initialState))
      localStorage.setItem("TimetableState", JSON.stringify(state))
  }, [state])

  const toggleSideBar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
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
      <SideBar sidebarRef={sidebarRef} dispatcher={dispatcher} state={state} />
      <button
        type="button"
        onClick={toggleSideBar}
        id={stylesApp.sidebarToggle}
        className="btn btn-secondary"
        ref={sidebarToggleRef}
      >
        <SidebarToggleIcon />
      </button>

      <Constructor state={state} dispatcher={dispatcher} constructorRef={constructorRef} />
    </div>
  )
}

export default App
