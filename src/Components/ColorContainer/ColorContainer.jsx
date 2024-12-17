import React, { useState } from 'react'

const ColorContainer = ({color, code, selectedColor, setColorMethod}) => {
  return (

            <div className="proColor" style={{backgroundColor: `#${code}`, border: color === selectedColor ? "2px solid rgba(0, 0, 0, 0.555)" : "none"}} onClick={() => setColorMethod(color)}></div>
        
  )
}

export default ColorContainer
