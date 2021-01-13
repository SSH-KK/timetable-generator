import React, { useState, useEffect } from "react"
import styles from "../styles/Constructor.module.css"
import assets from "../assets/pdf"
import { cardSelectionStateGenerator } from "../utils/timetable"
import { DayT, SubjectT, CardT, LessonsType, SetValidationErrorsFT, AddLessonFT } from "../types/timetable"
import { ValidationStatusT } from "../types/validation"
import { validate } from '../utils/validation'

type ConstructorPageProps = {
	days: DayT[]
	classNum: LessonsType
	addButton: (event: React.MouseEvent<HTMLButtonElement>) => void
	addLesson: AddLessonFT
	validation: ValidationStatusT
	setValidationErrors: SetValidationErrorsFT
	cards: CardT[]
	subjects: SubjectT[]
	teachers: string[]
}

const ConstructorPage: React.FC<ConstructorPageProps> = ({
	days,
	subjects,
	cards,
	validation,
	teachers,
	classNum,
	addButton,
	setValidationErrors,
	addLesson,
}) => {
	const [cardSelectionState, setCardSelectionState] = useState<boolean[][][]>(
		cardSelectionStateGenerator(days, classNum)
	)

	useEffect(() => {
		setCardSelectionState(prev => cardSelectionStateGenerator(days, classNum, prev))
	}, [days])

	const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault()
		if (event.currentTarget.dataset) {
			const dataset = event.currentTarget.dataset
			if (dataset.dayid && dataset.eventid && dataset.groupid && dataset.lessonnum) {
				const { dayid, eventid, groupid, lessonnum } = dataset
				const isPair = cardSelectionState[parseInt(dayid)][parseInt(eventid)][parseInt(groupid)]
				addLesson(
					parseInt(dayid),
					parseInt(eventid),
					classNum,
					parseInt(groupid),
					isPair,
					parseInt(event.currentTarget.value),
					parseInt(lessonnum)
				)
				.then((n_days_state) => {
					validate({days: n_days_state, cards, subjects, teachers, validation}, setValidationErrors, parseInt(dayid), parseInt(eventid))
				})
			}
		}
	}

	const splittoggle = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (event.currentTarget.dataset) {
			const dataset = event.currentTarget.dataset
			if (dataset.dayid && dataset.eventid && dataset.groupid) {
				const dayid = parseInt(dataset.dayid)
				const eventid = parseInt(dataset.eventid)
				const groupid = parseInt(dataset.groupid)
				if (
					days[dayid].events[eventid][classNum][0][groupid] ==
					days[dayid].events[eventid][classNum][1][groupid]
				) {
					setCardSelectionState(prev =>
						prev.map((day, dayIndex) =>
							dayIndex == dayid
								? day.map((event, eventIndex) =>
									eventIndex == eventid
										? event.map((group, groupIndex) => (groupIndex == groupid ? !group : group))
										: event
								)
								: day
						)
					)
				}
				// can add split for different selection in lessons
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
							<div
								key={cardID}
								className={`${styles.eventCard} col-2 border border-1 d-flex flex-column justify-content-center px-2 position-relative`}
							>
								{cardSelectionState[dayIndex][eventIndex]
									? Array(cardSelectionState[dayIndex][eventIndex][cardID] ? 1 : 2)
										.fill("")
										.map((_, newIndex) => (
											<select
												key={newIndex}
												onChange={selectChange}
												data-dayId={dayIndex}
												data-eventId={eventIndex}
												data-groupId={cardID}
												data-lessonNum={newIndex}
												className="form-select"
												value={event[classNum][newIndex][cardID]}
											>
												<option value="-1">
													{cardSelectionState[dayIndex][eventIndex][cardID] ? "Пара" : "Урок"}
												</option>
												{cards.map((card, cardIndex) =>
													card.status ? (
														<option value={cardIndex}>{`${subjects[card.subject].title} - ${
															teachers[subjects[card.subject].teachers[card.teacher]]
															} - ${card.room}`}</option>
													) : (
															""
														)
												)}
											</select>
										))
									: ""}
								<button
									onClick={splittoggle}
									disabled={event[classNum][0][cardID] != event[classNum][1][cardID]}
									data-dayId={dayIndex}
									data-eventId={eventIndex}
									data-groupId={cardID}
									className={`btn btn-secondary ${styles.splittoggle}`}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="3.35vh"
										height="3.35vh"
										fill="currentColor"
										className="bi bi-chevron-bar-expand"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8z"
										/>
									</svg>
								</button>
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
			))}
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
