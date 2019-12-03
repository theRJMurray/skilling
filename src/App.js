import React, { useState } from "react";
import Skill from "./components/Skill";
import './css/Inventory.css'

const App = () => {
	return (
		<div style={{ display: 'flex' }}>
			<div>
				<Skill skillName={"Woodcutting"} skillAction={"Chop Wood"} />
				<Skill skillName={"Kite Flying"} skillAction={"Fly Kite"} />
				<Skill skillName={"Parkour"} skillAction={"Climb and Jump"} />
				<Skill skillName={"Coding"} skillAction={"Roll Face on Keyboard"} />
				<Skill skillName={"Wizardy"} skillAction={"Cast Spells"} />
			</div>
			<div>
				<Inventory />
			</div>

		</div>
	);
};

export default App;

const Inventory = () => {
	let starterKit = [
		{ id: 0, name: 'shovel', quantity: 1 },
		{ id: 1, name: 'pickle', quantity: 4 }
	]
	const [inventory, setInventory] = useState(starterKit)

	return (
		<div className="inventoryContainer">
			{inventory.map((o) =>
				<div>
					<p>{o.name}</p>
					<p>{o.quantity}</p>
				</div>)}
		</div>
	);
}