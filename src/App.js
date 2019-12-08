import React, { useState } from "react";
import Skill from "./components/Skill";
import Logs from "./imgs/logs.png";
import './css/App.css'
import './css/Inventory.css';

const App = () => {
	const baseStats = {
		exp: 0,
		level: 1
	}
	const [wood, setWood] = useState(0)
	const [woodcutting, setWoodcutting] = useState(baseStats)

	const [mining, setMining] = useState(baseStats)

	const levelMarks = [4, 12, 24, 48, 75, 125, 175, 225, 300, 375, 500]

	const chopWood = () => {
		//Gain Exp
		if (levelMarks.includes(woodcutting.exp + 1)) {
			setWoodcutting({ exp: woodcutting.exp + 1, level: woodcutting.level + 1 })
		} else {
			setWoodcutting({ exp: woodcutting.exp + 1, level: woodcutting.level })
		}
		setWood(wood + 1);
	}

	const mineOre = () => {
		if (levelMarks.includes(mining.exp + 1)) {
			setMining({ exp: mining.exp + 1, level: mining.level + 1 })
		} else {
			setMining({ exp: mining.exp + 1, level: mining.level })
		}
	}

	return (
		<div>
			<div className="titanPanel">
				{wood > 0 ? <Inventory wood={wood} /> : null}
			</div>
			<div>
				<Skill takeAction={chopWood} skill={woodcutting} skillName={"Woodcutting"} skillAction={"Chop Wood"} />
				<Skill takeAction={mineOre} skill={mining} skillName={"Mining"} skillAction={"Mine Ore"} />
			</div>

		</div>
	);
};

export default App;

const Inventory = props => {

	return (
		<div className="inventoryContainer">
			<div className="woodStats">
				<img className="wood" style={{ width: 60, height: 60 }} src={Logs} />
				<span className="woodQuantity">{props.wood}</span>
			</div>
		</div>
	);
}