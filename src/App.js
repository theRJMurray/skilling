import React, { useState, useEffect } from "react";
import Skill from "./components/Skill";
import Inventory from "./components/Inventory";
import Tool from "./components/Tool";
import Timer from "./components/Timer";

import Level from "./imgs/level.png"
import Logs from "./imgs/logs.png";
import Planks from "./imgs/planks.png";
import Campfire from "./imgs/campfire.png";
import Fish from "./imgs/fish.png";
import CookedFish from "./imgs/cookedFish.png";
import Stone from "./imgs/stone.png";


import WoodAxe from "./imgs/woodAxe.png";
import Saw from "./imgs/saw2.jpg";
import Hammer from "./imgs/hammer.png";
import FishingRod from "./imgs/fishingRod.png";
import Lighter from "./imgs/lighter.png";


import './css/App.css'

const App = () => {
	//State Variables
	const baseStats = {
		exp: 0,
		level: 0
	}

	const starterKit = [
		{name: "axe", icon: WoodAxe}
	]

	const [totalLevel, setTotalLevel] = useState(0)

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

	const [stone, setStone] = useState(0)
	const [quarrying, setQuarrying] = useState(baseStats)


	const [tools, setTools] = useState(starterKit)
	//End of State Variables

	//Timer Functions
	const decreaseSeconds = z => {
		setSeconds(seconds - z)
	}

	const decreaseMinutes = z => {
		setMinutes(minutes - z)
	}

	const makeSeconds = z => {
		setSeconds(z)
	}

	//Gameplay
	const levelMarks = [4, 12, 24, 48, 75, 125, 175, 225, 300, 375, 500]

	const levelSkill = (skillName, skillSetter) => {
		if (levelMarks.includes(skillName.exp + 1)) {
			skillSetter({ exp: skillName.exp + 1, level: skillName.level + 1 })
			setTotalLevel(totalLevel + 1)
		} else {
			skillSetter({ exp: skillName.exp + 1, level: skillName.level })
		}
	}

	const collectStone = () => {
		levelSkill(quarrying, setQuarrying)
		setStone(stone + 1)
	}

	const chopWood = () => {
		//Gain Exp
		levelSkill(woodcutting, setWoodcutting)
		setWood(wood + 1)
	}

	const refineWood = () => {
		if (wood >= 2) {
			levelSkill(makePlank, setMakePlank)
			setWood(wood - 2)
			setPlank(plank + 1)
		}
	}

	const craftCampfire = () => {
		if (wood >= 3) {
			levelSkill(makeCampfire, setMakeCampfire)
			setWood(wood - 3)
			setMinutes(minutes + 1)
		}
	}

	const catchFish = () => {
		levelSkill(fishing, setFishing)
		setFish(fish + 1);
	}

	const cookFish = () => {
		if (fish >= 1) {
			if (minutes === 0 && seconds === 0) {
				return;
			} else {
				levelSkill(cooking, setCooking)
				setCookedFish(cookedFish + 1)
				setFish(fish - 1)
			}
		}
	}

	const addTool = (name, icon) => {
		tools.push({name: name, icon: icon})
	}

	useEffect(() => {
		//Unlock Tool: Saw
		if (woodcutting.exp === 9 && tools.some(e => e.name !== 'hammer')) {
			addTool('hammer', Hammer)
		}
		if (quarrying.exp === 9 && tools.some(e => e.name !== 'saw')) {
			addTool('saw', Saw)
		}
		if (makePlank.exp === 9 && tools.some(e => e.name !== 'fishingRod')) {
			addTool('fishingRod', FishingRod)
		}
		if (quarrying.exp === 19 && tools.some(e => e.name !== 'lighter')) {
			addTool('lighter', Lighter)
		}
	})

	return (
		<div>
			<div className="titanPanel">
				<Inventory image={Level} item={totalLevel} />
				<Inventory image={Logs} item={wood} />
				{tools.some(e => e.name === 'hammer') && <Inventory image={Stone} item={stone} />}
				{tools.some(e => e.name === 'saw') && <Inventory image={Planks} item={plank} />}
				{tools.some(e => e.name === 'lighter') && <Timer makeSeconds={makeSeconds} decreaseSeconds={decreaseSeconds} decreaseMinutes={decreaseMinutes} image={Campfire} seconds={seconds} minutes={minutes} />}
				{tools.some(e => e.name === 'fishingRod') && <Inventory image={Fish} item={fish} />}
				{tools.some(e => e.name === 'lighter') && <Inventory image={CookedFish} item={cookedFish} />}
			</div>
			<div style={{ display: 'flex' }}>
				<div className="toolbelt">
					{tools.map(tool => <Tool icon={tool.icon} />)}
				</div>
				<div className="collect">
					{tools.some(e => e.name === 'axe') && <Skill takeAction={chopWood} skill={woodcutting} skillName={"Woodcutting"} skillAction={"Chop Wood"} />}
					{tools.some(e => e.name === 'hammer') && <Skill takeAction={collectStone} skill={quarrying} skillName={"Quarrying"} skillAction={"Collect Stone"} />}
					{tools.some(e => e.name === 'fishingRod') && <Skill takeAction={catchFish} skill={fishing} skillName={"Fishing"} skillAction={"Catch Fish"} />}
				</div>
				<div className="refine">
					{tools.some(e => e.name === 'saw') && <Skill takeAction={refineWood} skill={makePlank} skillName={"Wood Refining"} skillAction={"Refine Wood"} />}
					{tools.some(e => e.name === 'lighter') && <Skill takeAction={cookFish} skill={cooking} skillName={"Cooking"} skillAction={"Cook Fish"} />}
				</div>
				<div className="craft">
					{tools.some(e => e.name === 'lighter') && <Skill takeAction={craftCampfire} skill={makeCampfire} skillName={"Campfire Crafting"} skillAction={"Craft Campfire"} />}
				</div>
			</div>
		</div>
	);
};

export default App;