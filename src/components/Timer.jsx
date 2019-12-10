import React, { useState, useEffect } from 'react'

const textStyles = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 'bold',
    fontSize: '1.25em',
    marginTop: 11
}

const Timer = props => {
    const [minutes, setMinutes] = useState(2)
    const [seconds, setSeconds] = useState(30)
    const [on, setOn] = useState(true)

    useEffect(() => {
        const tick = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(tick)
                    setOn(false)
                } else {
                    setMinutes(minutes - 1)
                    setSeconds(59)
                }
            }
        }, 1000)
        return () => clearInterval(tick);
    })


    return <div style={{ display: 'flex', marginLeft: 60 }}>
        <img className="image" style={{ width: 48, height: 48, marginTop: 2 }} src={props.image} />
        <div style={textStyles}>
            {minutes === 0 && seconds === 0
                ? <span>Burnt Out</span>
                : <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            }
        </div>
    </div>
}

export default Timer