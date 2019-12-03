import React, { useState } from 'react';
import '../css/Skill.css'

const skillTitleStyles = {

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
		<div className="skillContainer">
			<div className="skillTitleBox">
				<h1 className="skillTitle" onClick={clickShow}> {props.skillName} </h1>
			</div>
			<>
				{visible ?
					<div className="statsBox">
						<h2 className="levelInfo">Level: {level} </h2>
						<h3 className="expInfo">Experience: {exp} </h3>
						<div className="buttonContainer">
							<button class="btn btn-primary" onClick={gainExp}> {props.skillAction} </button>
						</div>
					</div> : null
				}
			</>
		</div>
	);
};

export default Skill;