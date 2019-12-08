import React, { useState } from 'react';
import '../css/Skill.css'

const Skill = props => {
	const [exp, setExp] = useState(0);
	const [level, setLevel] = useState(1);
	const [visible, setVisible] = useState(false);
	const [myClass, setMyClass] = useState('statsBox')

	const clickShow = () => {
		visible ? setVisible(false) : setVisible(true)
	}

	const classChange = () => {
		visible ? setMyClass('statsBox-after') : setMyClass('stats-Box')
		visible ? setVisible(false) : setVisible(true)
	}

	return (
		<div className="skillContainer">
			<div className="skillTitleBox">
				<h1 className="skillTitle" onClick={classChange}> {props.skillName} </h1>
			</div>
			<>
				<div className={myClass}>
					<h2 className="levelInfo">Level: {props.skill.level} </h2>
					<h3 className="expInfo">Experience: {props.skill.exp} </h3>
					<div className="buttonContainer">
						<button className="btn btn-primary" onClick={props.takeAction}> {props.skillAction} </button>
					</div>
				</div>
			</>
		</div>
	);
};

export default Skill;