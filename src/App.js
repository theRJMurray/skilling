import React, { useState } from "react";

const App = () => {
  return (
    <div>
      <Skill skillName={"Woodcutting"} skillAction={"Chop Wood"} />
      <Skill skillName={"Mining"} skillAction={"Mine Ore"} />
      <Skill skillName={"Fishing"} skillAction={"Catch Fish"} />
    </div>
  );
};

const Skill = props => {
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);

  const levelMarks = [5, 15, 30, 50, 100];

  const gainExp = () => {
    setExp(exp + 1);
    if (levelMarks.includes(exp + 1)) {
      setLevel(level + 1);
    }
  };

  return (
    <div>
      <h1>{props.skillName}</h1>
      <h2>Level: {level} </h2>
      <h3>Experience: {exp}</h3>
      <div>
        <button onClick={gainExp}>{props.skillAction}</button>
      </div>
    </div>
  );
};

export default App;
