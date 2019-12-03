import React from "react";
import Skill from "./components/Skill";

const App = () => {
  return (
    <div>
      <Skill skillName={"Woodcutting"} skillAction={"Chop Wood"} />
      <Skill skillName={"Kite Flying"} skillAction={"Fly Kite"} />
      <Skill skillName={"Parkour"} skillAction={"Climb and Jump"} />
      <Skill skillName={"Coding"} skillAction={"Roll Face on Keyboard"} />
      <Skill skillName={"Wizardy"} skillAction={"Cast Spells"} />
    </div>
  );
};

export default App;
