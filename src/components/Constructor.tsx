import React, { useState } from "react";
import ConstructorPage from './ConstructorPage';
import styles from "../styles/Constructor.module.css";
import { DayT } from "../types/timetable"

type ConstructorProps = {
	constructorRef: React.RefObject<HTMLDivElement>;
	days: DayT[];
};

const Constructor: React.FC<ConstructorProps> = ({ constructorRef, days }) => {
	const [pageState, setPageState] = useState<number>(0)
	const [startDateState, setStartDateState] = useState<Date>(new Date())

	const changePage = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault()
		if (event.currentTarget.dataset.name) {
			const name = parseInt(event.currentTarget.dataset.name)
			setPageState(name)
		}
	}

	const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		if (event.currentTarget.value) {
			setStartDateState(new Date(event.currentTarget.value))
		}
	}

	return (
		<div id={styles.constructorPages} ref={constructorRef}>
			<ul className="nav nav-tabs pt-2">
				<li className={`nav-item ${styles.pageItem}`}>
					<a onClick={changePage} data-name='0' className={`nav-link ${pageState == 0 ? 'active' : ''}`}>
						10 класс
          </a>
				</li>
				<li className={`nav-item ${styles.pageItem}`}>
					<a onClick={changePage} data-name='1' className={`nav-link ${pageState == 1 ? 'active' : ''}`}>
						11 класс
          </a>
				</li>
				<form className='d-flex align-items-center ms-auto me-2'>
					<div className="input-group input-group">
						<label htmlFor="startDate" className="form-label mb-0 pt-1 me-2">Дата начала недели:</label>
						<input
							type="date"
							value={`${startDateState.toISOString().split('T')[0]}`}
							onChange={changeDate}
							id='startDate'
							className="form-control rounded rounded-3"
						/>
					</div>
				</form>
			</ul>
			<div className='container-fluid'>
				{
					pageState == 0 ?
						<ConstructorPage days={days} classNum={'lessons10'} />
						:
						''
				}
			</div>
		</div>
	);
};

export default Constructor;
