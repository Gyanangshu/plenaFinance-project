import React from 'react'

const Button = ({icon, text, borderRadius, bgColor, textColor, handleClick, disable}) => {
    return (
        <button onClick={handleClick} className={`${bgColor} ${textColor} flex items-center gap-1.5 px-3 py-2 ${borderRadius} cursor-pointer`} disabled={disable}>
            {icon} <span className='text-sm font-medium'>{text}</span>
        </button>
    )
}

export default Button
