import React from "react";
import TextField from "@material-ui/core/TextField";
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
      {props.user !== null ? (
        <span className="user">Logged in: {props.user}</span>
      ) : (
        <form
          className="materialForm"
          noValidate
          autoComplete="off"
          onSubmit={props.userLogin}
        >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={props.handleChange}
          />
        </form>
      )}
    </div>
  );
};

export default Save;
