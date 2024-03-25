import React from 'react';

const Button = ({onClick, label}) => {
    return (

        <button
            style={{background: "black", color: 'white', margin: '10px', padding: '10px 20px'}}
            onClick={onClick}>
            {label}
        </button>
    )
}

export default Button