import React from "react";
import '../css/Inventory.css';

const Inventory = props => {

    return (
        <div className="inventoryContainer">
            <div className="stats">
                <img className="image" style={{ width: 48, height: 48 }} src={props.image} />
                <span className="quantity">{props.item}</span>
            </div>
        </div>
    );
}

export default Inventory;