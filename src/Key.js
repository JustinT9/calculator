import { useEffect, useState } from 'react'; 
import './Key.css'; 

function Key( {symbol, input, op, newOp, newView, prev, newPrev, number, newNumber} ) {
    const handleClick = (symbol) => {
        if (symbol === "C") {
            newOp(null); 
            newView(""); 
            newPrev({num: null, sign: false}); 
            newNumber({num: null, sign: false}); 
        } else if (symbol === "1" || symbol === "2" || symbol === "3" || 
        symbol === "4" || symbol === "5" || symbol === "6" || symbol === "7" || 
        symbol === "8" || symbol === "9") {
            newNumber((oldNumber) => {
                if (!oldNumber.num) {
                    return ({...oldNumber, num: parseInt(symbol)}) 
                } else {
                    return ({...oldNumber, num: parseInt(oldNumber.num.toString() + symbol)})
                }
            });   
                        
            newView((oldView) => {
                if (oldView === "+=" || oldView === "%" || oldView === "/" || 
                oldView === "-" || oldView === "+" || oldView === "." || oldView === "=" ||
                oldView === "x") {
                    return "" + symbol;
                } else {
                    return oldView + symbol; 
                }
            });

        } else {
            if (symbol !== "+-" && symbol !== "." && symbol !== "=") {
                newPrev((oldPrev) => {return ({...oldPrev, num: number.num})})
                newNumber((oldNumber) => {return ({...oldNumber, num: null})})
                newOp(symbol);  
            } else {
                if (symbol === "=" && prev.num && number.num && op) {
                    if (op === "+") {
                        newNumber((oldNumber) => {return ({...oldNumber, num: oldNumber.num + prev.num})})
                    }
                }                
            }
        }
    }

    console.log("Prev:", prev); 
    console.log("Num:", number); 
    if (symbol !== "=") {
        return (
            <div onClick={() => handleClick(symbol)} className='box'>
                {symbol}
            </div>
        )
    } else {
        return (
            <div onClick={() => handleClick(symbol)} className="equalsBox">
                {symbol}
            </div>
        )
    }    
}

export default Key