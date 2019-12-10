import React from 'react'

const imageStyles = {
    width: 46,
    height: 46,
    padding: 2
}

const Tool = props => {
    return <div>
        <img style={imageStyles} src={props.icon} alt="axe" />
    </div>
}

export default Tool