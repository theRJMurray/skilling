import React, { useState } from 'react';

const skillContainerStyles = {
	border: '1px solid red',
	width: 300,
	padding: 25
}

const skillTitleStyles = {
	padding: 0,
	margin: 0,
	textAlign: 'center'
}

const Skill = props => {
	const [exp, setExp] = useState(0);
	const [level, setLevel] = useState(1);
	const [visible, setVisible] = useState(true);

	//Leveling System
	const levelMarks = [5, 15, 30, 50, 100];
	const gainExp = () => {
		setExp(exp + 1);
		if (levelMarks.includes(exp + 1)) {
			setLevel(level + 1);
		}
	};

	const clickShow = () => {
		visible ? setVisible(false) : setVisible(true)
	}

	return (
		<div>
			<div>
				<h1 style={skillTitleStyles} onClick={clickShow}> {props.skillName} </h1>
			</div>
			<>
				{visible ? <div style={skillContainerStyles}>
					<h2>Level: {level} </h2>
					<h3>Experience: {exp} </h3>
					<div>
						<button onClick={gainExp}> {props.skillAction} </button>
					</div>
				</div> : null
				}
			</>
		</div>
	);
};

export default Skill;