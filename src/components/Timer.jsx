import React, { useState } from 'react'

const Timer = () => {
    const [minutes, setMinutes] = useState(2)
    const [seconds, setSeconds] = useState(30)

    useEffect(() => {
        const tick = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(tick)
                } else {
                    setMinutes(minutes - 1)
                    setSeconds(59)
                }
            }
        }, 1000)
        return () => clearInterval(tick);
    })


    return <div>
        <img className="image" style={{ width: 48, height: 48 }} src={props.image} />
        {minutes === 0 && seconds === 0
            ? <span>Burnt Out</span>
            : <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
        }
    </div>
}

export default Timer