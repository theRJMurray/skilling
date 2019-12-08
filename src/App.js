import React, { useState } from "react";
import Skill from "./components/Skill";
import Inventory from "./components/Inventory";

import Logs from "./imgs/logs.png";
import Planks from "./imgs/planks.png";


import './css/App.css'

const App = () => {
	//State Variables
	const baseStats = {
		exp: 0,
		level: 1
	}
	const [wood, setWood] = useState(0)
	const [woodcutting, setWoodcutting] = useState(baseStats)

	const [plank, setPlank] = useState(0)
	const [makePlank, setMakePlank] = useState(baseStats)

	const [mining, setMining] = useState(baseStats)
	//End of State Variables

	//Gameplay
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

	const refineWood = () => {
		if (wood >= 1) {
			if (levelMarks.includes(makePlank.exp + 1)) {
				setMakePlank({ exp: makePlank.exp + 1, level: makePlank.level + 1 })
			} else {
				setMakePlank({ exp: makePlank.exp + 1, level: makePlank.level })
			}
			setWood(wood - 1)
			setPlank(plank + 1)
		}
	}

	return (
		<div>
			<div className="titanPanel">
				<Inventory wood={wood} image={Logs} item={wood} />
				<Inventory plank={plank} image={Planks} item={plank} />
			</div>
			<div style={{ display: 'flex' }}>
				<div className="collect">
					<Skill takeAction={chopWood} skill={woodcutting} skillName={"Woodcutting"} skillAction={"Chop Wood"} />
				</div>
				<div className="refine">
					<Skill takeAction={refineWood} skill={makePlank} skillName={"Wood Refining"} skillAction={"Refine Wood"} />
				</div>
			</div>
		</div>
	);
};

export default App;