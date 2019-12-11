import React from "react";
import Timer from "./Timer";
import '../css/Inventory.css';

const Inventory = props => {

    return (
        <div className="inventoryContainer">
            <div className="stats">
                {props.image && <img className="image" style={{ width: 48, height: 48 }} src={props.image} />}
                <span className="quantity">{props.item}</span>
            </div>
        </div>
    );
}

export default Inventory;