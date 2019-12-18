import React from "react";
import "../css/Save.css";

const Save = props => {
  return (
    <div className="saveLoad">
      <button className="btn btn-primary" onClick={props.save}>
        Save
      </button>
      <button className="btn btn-primary" onClick={props.load}>
        Load
      </button>
    </div>
  );
};

export default Save;
