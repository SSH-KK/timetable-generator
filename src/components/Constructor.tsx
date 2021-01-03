import React from 'react'
import styles from '../styles/Constructor.module.css'

type ConstructorProps = {
	constructorRef: React.RefObject<HTMLDivElement>
}

const Constructor: React.FC<ConstructorProps> = ({
	constructorRef
}) => {
	return (
		<div id={styles.constructorPages} ref={constructorRef}>
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<a className="nav-link active" aria-current="page" href="#">Active</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="#">Link</a>
				</li>
			</ul>
		</div>
	);
}

export default Constructor;