import React from "react";
import Skill from "./components/Skill";

const App = () => {
  return (
    <div>
      <Skill skillName={"Woodcutting"} skillAction={"Chop Wood"} />
      <Skill skillName={"Mining"} skillAction={"Mine Ore"} />
      <Skill skillName={"Fishing"} skillAction={"Catch Fish"} />
    </div>
  );
};

export default App;
