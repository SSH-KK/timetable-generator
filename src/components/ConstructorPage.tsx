import React, { useState, useEffect } from "react"
import styles from "../styles/Constructor.module.css"
import assets from "../assets/pdf"
import { cardSelectionStateGenerator } from '../utils/timetable'
import { DayT, SubjectT, CardT, LessonsType, AddLessonFT } from "../types/timetable"

type ConstructorPageProps = {
	days: DayT[]
	classNum: LessonsType
	addButton: (event: React.MouseEvent<HTMLButtonElement>) => void
	addLesson: AddLessonFT
	cards: CardT[]
	subjects: SubjectT[]
}

const ConstructorPage: React.FC<ConstructorPageProps> = ({
	days,
	subjects,
	cards,
	classNum,
	addButton,
	addLesson,
}) => {

	const [cardSelectionState, setCardSelectionState] = useState<boolean[][][]>(cardSelectionStateGenerator(days, classNum))

	useEffect(() => {
		setCardSelectionState(cardSelectionStateGenerator(days, classNum))
	}, [days])

	const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault()
		if (event.currentTarget.dataset) {
			const dataset = event.currentTarget.dataset
			if (dataset.dayid && dataset.eventid && dataset.groupid && dataset.lessonnum) {
				const {dayid, eventid, groupid, lessonnum} = dataset
				const isPair = cardSelectionState[parseInt(dayid)][parseInt(eventid)][parseInt(groupid)]
				console.log(dayid, eventid, parseInt(classNum.replace('lessons','')), groupid, isPair, event.currentTarget.value, lessonnum)
				addLesson(parseInt(dayid), parseInt(eventid), classNum, parseInt(groupid), isPair, parseInt(event.currentTarget.value), parseInt(lessonnum))
			}
		}
	}

	return (
		<>
			{days.map((day, dayIndex) => (
				<div className="row" key={dayIndex}>
					<div className="col-12 text-center border-bottom border-1">
						<h4>{`${new Date(day.date).getDate()} ${
							assets.weekdays[
							new Date(day.date).getDay() - 1 != -1 ? new Date(day.date).getDay() - 1 : 6
							]
							}`}</h4>
					</div>
					{day.events.map((event, eventIndex) =>
						event[classNum][0].map((_, cardID) => (
							<div className="col-2 border border-1 py-5 px-2">
								{
									cardSelectionState[dayIndex][eventIndex] ?
										Array(cardSelectionState[dayIndex][eventIndex][cardID] ? 1 : 2).fill('').map((_, newIndex) =>
											<select onChange={selectChange} data-dayId={dayIndex} data-eventId={eventIndex} data-groupId={cardID} data-lessonNum={newIndex} className='form-select' value={event[classNum][newIndex][cardID]}>
												<option value='-1'>{cardSelectionState[dayIndex][eventIndex][cardID] ? 'Пара' : 'Урок'}</option>
												{
													cards.map((card, cardIndex) =>
														card.status ?
															<option value={cardIndex}>{`${subjects[card.subject].title} - ${subjects[card.subject].teachers[card.teacher]} - ${card.room}`}</option>
															:
															''
													)
												}
											</select>
										)
										:
										''
								}
							</div>
						))
					)}
					<div className="d-grid gap-2 my-2">
						<button
							data-name="event"
							data-dayNum={dayIndex}
							onClick={addButton}
							className="btn btn-outline-primary btn-sm"
							type="button"
						>
							Новые пары
            </button>
					</div>
				</div>
			))
			}
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
	)
}

export default ConstructorPage
