import React, { useEffect } from "react";

const textStyles = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 'bold',
    fontSize: '1.25em',
    marginTop: 11,
    width: 120
}

const Timer = props => {

    useEffect(() => {
        const tick = setInterval(() => {
            if (props.seconds > 0) {
                props.decreaseSeconds(1)
            }

            if (props.seconds === 0) {
                if (props.minutes === 0) {
                    clearInterval(tick)
                } else {
                    props.decreaseMinutes(1)
                    props.makeSeconds(59)
                }
            }
        }, 1000)
        return () => clearInterval(tick);
    })


    return <div style={{ display: 'flex', marginLeft: 60 }}>
        <img className="image" style={{ width: 48, height: 48, marginTop: 2 }} src={props.image} alt=""/>
        <div style={textStyles}>
            {props.minutes === 0 && props.seconds === 0
                ? <span>Burnt Out</span>
                : <span>{props.minutes}:{props.seconds < 10 ? `0${props.seconds}` : props.seconds}</span>
            }
        </div>
    </div>
}

export default Timer