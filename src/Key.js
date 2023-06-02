import { useState } from 'react'; 
import './Key.css'; 

function Key( {newChar, symbol} ) {
    const handleClick = (sign) => {
        newChar(sign);  
    }

    if (symbol !== "=") {
        return (
            <div onClick={() => handleClick(symbol)} className='container'>
                {symbol}
            </div>
        )
    } else {
        return (
            <div onClick={() => handleClick(symbol)} className="equalsContainer">
                {symbol}
            </div>
        )
    }
    
}

export default Key