import React, { createRef, useEffect } from "react";
import styles from "../styles/Sidebar.module.css";
import { SubjectT } from "../types/timetable";

type SidebarProps = {
	subjects: SubjectT[],
}

const SideBar: React.FC<SidebarProps> = ({subjects}) => {
	const sideBarRef = createRef<HTMLDivElement>()
	
	const toggleSideBar = (event: React.MouseEvent)=>{
		event.preventDefault()
		const sidebar = sideBarRef.current!
		sidebar.classList.toggle(styles.active)
	}

  return (
    <nav id={styles.sidebar} className='shadow' ref={sideBarRef}>
    	<div>
        <h3>Bootstrap Sidebar</h3>
      </div>
      <button type="button" onClick={toggleSideBar} id={styles.sidebarToggle} className="btn btn-secondary">
      	<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
				  <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
				</svg>
			</button>
		</nav>
	)
}

export default SideBar;