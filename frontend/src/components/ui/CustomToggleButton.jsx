import React from 'react'

const CustomToggleButton = ({ isActive, onClick, label }) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className={`p-2 rounded transition-colors duration-200 ease-in-out ${
                isActive ? 'bg-muted text-white' : 'bg-gray-200 text-black'
            }`}
        >
            {label}
        </button>
    )
}

export default CustomToggleButton