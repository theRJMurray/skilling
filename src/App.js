import React, { useState, useEffect } from "react";
import Skill from "./components/Skill";
import Inventory from "./components/Inventory";
import Tool from "./components/Tool";
import Timer from "./components/Timer";
import Save from "./components/Save";

import Level from "./imgs/level.png";
import Logs from "./imgs/logs.png";
import Planks from "./imgs/planks.png";
import Campfire from "./imgs/campfire.png";
import Fish from "./imgs/fish.png";
import CookedFish from "./imgs/cookedFish.png";
import Stone from "./imgs/stone.png";
import Sapphire from "./imgs/sapphire.png";
import Ruby from "./imgs/ruby.png";

import WoodAxe from "./imgs/woodAxe.png";
import Saw from "./imgs/saw2.jpg";
import Hammer from "./imgs/hammer.png";
import FishingRod from "./imgs/fishingRod.png";
import Lighter from "./imgs/lighter.png";
import Chisel from "./imgs/chisel.png";

import "./css/App.css";

const App = () => {
  //State Variables
  const baseStats = {
    exp: 0,
    level: 0
  };

  const starterKit = [{ name: "axe", icon: WoodAxe }];

  const [totalLevel, setTotalLevel] = useState(0);

  const [wood, setWood] = useState(0);
  const [woodcutting, setWoodcutting] = useState(baseStats);

  const [plank, setPlank] = useState(0);
  const [makePlank, setMakePlank] = useState(baseStats);

  const [makeCampfire, setMakeCampfire] = useState(baseStats);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [fish, setFish] = useState(0);
  const [fishing, setFishing] = useState(baseStats);

  const [cookedFish, setCookedFish] = useState(0);
  const [cooking, setCooking] = useState(baseStats);

  const [stone, setStone] = useState(0);
  const [quarrying, setQuarrying] = useState(baseStats);

  const [sapphire, setSapphire] = useState(0);
  const [ruby, setRuby] = useState(0);
  const [prospecting, setProspecting] = useState(baseStats);

  const [sacrifice, setSacrifice] = useState(baseStats);

  const [toolMaking, setToolMaking] = useState(baseStats);

  const [tools, setTools] = useState(starterKit);
  //End of State Variables

  const allSkills = [
    woodcutting,
    makePlank,
    makeCampfire,
    fishing,
    cooking,
    quarrying,
    prospecting,
    sacrifice,
    toolMaking
  ];

  //Timer Functions
  const decreaseSeconds = z => {
    setSeconds(seconds - z);
  };

  const decreaseMinutes = z => {
    setMinutes(minutes - z);
  };

  const makeSeconds = z => {
    setSeconds(z);
  };

  //Random Number Generator
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  //Gameplay
  const levelFormula = exp => {
    return Math.floor(Math.sqrt(exp) * 1.2);
  };

  const updateLevel = (skillString, skillName, skillSetter, exp) => {
    exp = isNaN(exp) ? 0 : exp;
    const level = levelFormula(exp);
    skillSetter({ exp: exp, level: level });
  };
  const updateTotalLevel = () => {
    setTotalLevel(allSkills.reduce((a, b) => a + b.level, 0));
  };

  const gainXp = (skillString, skillName, skillSetter) => {
    const exp = skillName.exp + 1;
    updateLevel(skillString, skillName, skillSetter, exp);
  };

  const sacrificeFish = () => {
    if (cookedFish > 0) {
      if (minutes === 0 && seconds === 0) {
        return;
      } else {
        gainXp("sacrifice", sacrifice, setSacrifice);
        setCookedFish(cookedFish - 1);
      }
    }
  };

  const makeTool = () => {
    if (stone > 1 && plank > 1) {
      gainXp("tool", toolMaking, setToolMaking);
      setStone(stone - 2);
      setPlank(plank - 2);
    }
  };

  const prospectStone = () => {
    if (stone > 0) {
      gainXp("prospect", prospecting, setProspecting);
      setStone(stone - 1);
      if (randomNumber(1, 3) === 1) {
        return;
      }
      if (randomNumber(1, 3) === 2) {
        setSapphire(sapphire + 1);
      }
      if (randomNumber(1, 3) === 3) {
        setRuby(ruby + 1);
      }
    }
  };

  const collectStone = () => {
    gainXp("stone", quarrying, setQuarrying);
    sacrifice.level >= 10 ? setStone(stone + 2) : setStone(stone + 1);
  };

  const chopWood = () => {
    //Gain Exp
    gainXp("wood", woodcutting, setWoodcutting);
    sacrifice.level >= 5 ? setWood(wood + 2) : setWood(wood + 1);
  };

  const refineWood = () => {
    if (wood >= 2) {
      gainXp("plank", makePlank, setMakePlank);
      setWood(wood - 2);
      setPlank(plank + 1);
    }
  };

  const craftCampfire = () => {
    if (wood >= 3) {
      gainXp("fire", makeCampfire, setMakeCampfire);
      setWood(wood - 3);
      setMinutes(minutes + 1);
    }
  };

  const catchFish = () => {
    gainXp("fish", fishing, setFishing);
    sacrifice.level >= 15 ? setFish(fish + 2) : setFish(fish + 1);
  };

  const cookFish = () => {
    if (fish >= 1) {
      if (minutes === 0 && seconds === 0) {
        return;
      } else {
        gainXp("cook", cooking, setCooking);
        setCookedFish(cookedFish + 1);
        setFish(fish - 1);
      }
    }
  };

  const addTool = (name, icon) => {
    tools.push({ name: name, icon: icon });
  };

  const login = () => {
    fetch("https://skilling-a2d7a.firebaseio.com/use.json")
      .then(res => res.json())
      .then(
        result => {
          updateLevel("wood", woodcutting, setWoodcutting, result.woodXp);
          updateLevel("stone", quarrying, setQuarrying, result.stoneXp);
          updateLevel("fish", fishing, setFishing, result.fishingXp);
          updateLevel("plank", makePlank, setMakePlank, result.plankXp);
          updateLevel("fire", makeCampfire, setMakeCampfire, result.fireXp);
          updateLevel("cook", cooking, setCooking, result.cookXp);
          updateLevel(
            "prospect",
            prospecting,
            setProspecting,
            result.prospectXp
          );
          updateLevel("tool", toolMaking, setToolMaking, result.toolXp);
          updateLevel("sacrifice", sacrifice, setSacrifice, result.sacrificeXp);
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  const save = () => {
    const userData = {
      woodXp: woodcutting.exp,
      stoneXp: quarrying.exp,
      fishingXp: fishing.exp,
      plankXp: makePlank.exp,
      fireXp: makeCampfire.exp,
      cookXp: cooking.exp,
      prospectXp: prospecting.exp,
      toolXp: toolMaking.exp,
      sacrificeXp: sacrifice.exp
    };
    const response = fetch("https://skilling-a2d7a.firebaseio.com/use.json", {
      method: "PUT",
      body: JSON.stringify(userData)
    });
  };

  useEffect(() => {
    //Unlock Tool: Saw
    if (woodcutting.exp > 8 && !tools.some(e => e.name === "hammer")) {
      addTool("hammer", Hammer);
    }
    if (quarrying.exp > 8 && !tools.some(e => e.name === "saw")) {
      addTool("saw", Saw);
    }
    if (toolMaking.exp > 0 && !tools.some(e => e.name === "fishingRod")) {
      addTool("fishingRod", FishingRod);
    }
    if (toolMaking.exp > 8 && !tools.some(e => e.name === "lighter")) {
      addTool("lighter", Lighter);
    }
    if (toolMaking.exp > 18 && !tools.some(e => e.name === "chisel")) {
      addTool("chisel", Chisel);
    }
    updateTotalLevel();
  });
  /////////////////////////
  //////RETURN/////////////
  /////////////////////////
  return (
    <div>
      <div className="topHeader">
        <Save save={save} load={login} />
      </div>
      <div className="titanPanel">
        <Inventory image={Level} item={totalLevel} />
        <Inventory image={Logs} item={wood} />
        {tools.some(e => e.name === "hammer") && (
          <Inventory image={Stone} item={stone} />
        )}

        {tools.some(e => e.name === "saw") && (
          <Inventory image={Planks} item={plank} />
        )}

        {tools.some(e => e.name === "lighter") && (
          <Timer
            makeSeconds={makeSeconds}
            decreaseSeconds={decreaseSeconds}
            decreaseMinutes={decreaseMinutes}
            image={Campfire}
            seconds={seconds}
            minutes={minutes}
          />
        )}

        {tools.some(e => e.name === "fishingRod") && (
          <Inventory image={Fish} item={fish} />
        )}

        {tools.some(e => e.name === "lighter") && (
          <Inventory image={CookedFish} item={cookedFish} />
        )}

        {tools.some(e => e.name === "chisel") && (
          <Inventory image={Sapphire} item={sapphire} />
        )}

        {tools.some(e => e.name === "chisel") && (
          <Inventory image={Ruby} item={ruby} />
        )}
      </div>

      <div style={{ display: "flex" }}>
        <div className="toolbelt">
          {tools.map(tool => (
            <Tool icon={tool.icon} />
          ))}
        </div>

        <div className="collect">
          {tools.some(e => e.name === "axe") && (
            <Skill
              takeAction={chopWood}
              skill={woodcutting}
              skillName={"Woodcutting"}
              skillAction={"Chop Wood"}
            />
          )}

          {tools.some(e => e.name === "hammer") && (
            <Skill
              takeAction={collectStone}
              skill={quarrying}
              skillName={"Quarrying"}
              skillAction={"Collect Stone"}
            />
          )}

          {tools.some(e => e.name === "fishingRod") && (
            <Skill
              takeAction={catchFish}
              skill={fishing}
              skillName={"Fishing"}
              skillAction={"Catch Fish"}
            />
          )}
        </div>

        <div className="refine">
          {tools.some(e => e.name === "saw") && (
            <Skill
              takeAction={refineWood}
              skill={makePlank}
              skillName={"Wood Refining"}
              skillAction={"Refine Wood"}
            />
          )}

          {tools.some(e => e.name === "lighter") && (
            <Skill
              takeAction={cookFish}
              skill={cooking}
              skillName={"Cooking"}
              skillAction={"Cook Fish"}
            />
          )}

          {tools.some(e => e.name === "chisel") && (
            <Skill
              takeAction={prospectStone}
              skill={prospecting}
              skillName={"Prospecting"}
              skillAction={"Prospect Stone"}
            />
          )}
        </div>

        <div className="craft">
          {tools.some(e => e.name === "saw") && (
            <Skill
              takeAction={makeTool}
              skill={toolMaking}
              skillName={"Tool Making"}
              skillAction={"Craft Tools"}
            />
          )}

          {tools.some(e => e.name === "lighter") && (
            <Skill
              takeAction={craftCampfire}
              skill={makeCampfire}
              skillName={"Campfire Crafting"}
              skillAction={"Craft Campfire"}
            />
          )}

          {tools.some(e => e.name === "lighter") && (
            <Skill
              takeAction={sacrificeFish}
              skill={sacrifice}
              skillName={"Sacrifice"}
              skillAction={"Sacrifice Fish"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
