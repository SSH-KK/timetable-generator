import React from 'react'

const Constructor: React.FC = () => {
	return (
		<ul className="nav nav-tabs">
			<li className="nav-item">
				<a className="nav-link active" aria-current="page" href="#">Active</a>
			</li>
			<li className="nav-item">
				<a className="nav-link" href="#">Link</a>
			</li>
		</ul>
	);
}

export default Constructor;