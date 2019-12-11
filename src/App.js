import React, { useState, useEffect } from "react";
import Skill from "./components/Skill";
import Inventory from "./components/Inventory";
import Timer from "./components/Timer";

import Logs from "./imgs/logs.png";
import Planks from "./imgs/planks.png";
import Campfire from "./imgs/campfire.png";
import Fish from "./imgs/fish.png";
import CookedFish from "./imgs/cookedFish.png";


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

	const [makeCampfire, setMakeCampfire] = useState(baseStats)
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)

	const [fish, setFish] = useState(0)
	const [fishing, setFishing] = useState(baseStats)

	const [cookedFish, setCookedFish] = useState(0)
	const [cooking, setCooking] = useState(baseStats)

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
		if (wood >= 2) {
			if (levelMarks.includes(makePlank.exp + 1)) {
				setMakePlank({ exp: makePlank.exp + 1, level: makePlank.level + 1 })
			} else {
				setMakePlank({ exp: makePlank.exp + 1, level: makePlank.level })
			}
			setWood(wood - 2)
			setPlank(plank + 1)
		}
	}

	const craftCampfire = () => {
		if (wood >= 10) {
			if (levelMarks.includes(makeCampfire.exp + 1)) {
				setMakeCampfire({ exp: makeCampfire.exp + 1, level: makeCampfire.level + 1 })
			} else {
				setMakeCampfire({ exp: makeCampfire.exp + 1, level: makeCampfire.level })
			}
			setWood(wood - 10)
			setMinutes(minutes + 1)
		}
	}

	const decreaseSeconds = z => {
		setSeconds(seconds - z)
	}

	const decreaseMinutes = z => {
		setMinutes(minutes - z)
	}

	const makeSeconds = z => {
		setSeconds(z)
	}

	const levelSkill = (skillName, skillSetter, inventoryName, inventorySetter) => {
		if (levelMarks.includes(skillName.exp + 1)) {
			skillSetter({ exp: skillName.exp + 1, level: skillName.level + 1 })
		} else {
			skillSetter({ exp: skillName.exp + 1, level: skillName.level })
		}
		inventorySetter(inventoryName + 1);
	}


	const catchFish = () => {
		if (levelMarks.includes(fishing.exp + 1)) {
			setFishing({ exp: fishing.exp + 1, level: fishing.level + 1 })
		} else {
			setFishing({ exp: fishing.exp + 1, level: fishing.level })
		}
		setFish(fish + 1);
	}

	const cookFish = () => {
		if (fish >= 1) {
			if (minutes === 0 && seconds === 0) {
				return;
			} else {
				levelSkill(cooking, setCooking, cookedFish, setCookedFish)
				setFish(fish - 1)
			}
		}
	}

	return (
		<div>
			<div className="titanPanel">
				<Inventory image={Logs} item={wood} />
				<Inventory image={Planks} item={plank} />
				<Timer makeSeconds={makeSeconds} decreaseSeconds={decreaseSeconds} decreaseMinutes={decreaseMinutes} image={Campfire} seconds={seconds} minutes={minutes} />
				<Inventory image={Fish} item={fish} />
				<Inventory image={CookedFish} item={cookedFish} />
			</div>
			<div style={{ display: 'flex' }}>
				<div className="collect">
					<Skill takeAction={chopWood} skill={woodcutting} skillName={"Woodcutting"} skillAction={"Chop Wood"} />
					<Skill takeAction={catchFish} skill={fishing} skillName={"Fishing"} skillAction={"Catch Fish"} />
				</div>
				<div className="refine">
					<Skill takeAction={refineWood} skill={makePlank} skillName={"Wood Refining"} skillAction={"Refine Wood"} />
					<Skill takeAction={cookFish} skill={cooking} skillName={"Cooking"} skillAction={"Cook Fish"} />
				</div>
				<div className="craft">
					<Skill takeAction={craftCampfire} skill={makeCampfire} skillName={"Campfire Crafting"} skillAction={"Craft Campfire"} />
				</div>
			</div>
		</div>
	);
};

export default App;