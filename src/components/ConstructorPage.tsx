import React from "react";
import styles from "../styles/Constructor.module.css";
import { DayT } from "../types/timetable";

type ConstructorPageProps = {
	days: DayT[];
	classNum: string;
	addButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ConstructorPage: React.FC<ConstructorPageProps> = ({ days, classNum, addButton }) => {
	return (
		<>
			<div className='row'>
				{
					days.map((day, dayIndex) => (
						<div className='col-12 text-center'>
							<h4>{new Date(day.date).getDate()}</h4>
						</div>
					))
				}
			</div>
			<div className="d-grid gap-2 my-2">
				<button
					data-name="day"
					onClick={addButton}
					className="btn btn-outline-primary btn-sm"
					type="button"
				>
					Новый День
      </button>
			</div>
		</>
	);
};

export default ConstructorPage;
