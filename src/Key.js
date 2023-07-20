import { useEffect, useState } from 'react'; 
import './Key.css'; 

// takes in useState variables along with the specific symbol involved 
function Key( {symbol, op, newOp, view, newView, expression, newExpression } ) {

    const handleClick = (symbol) => {

        // if clear then reset everything 
        if (symbol === "C") {
            newExpression((oldExpression) => {
                oldExpression.splice(0, oldExpression.length);
                return oldExpression; 
            }) 
        } 

        // otherwise if a number is inputted 
       else if (symbol === "1" || symbol === "2" || symbol === "3" || 
        symbol === "4" || symbol === "5" || symbol === "6" || symbol === "7" || 
        symbol === "8" || symbol === "9") {
            newExpression((oldExpression) => {                
                oldExpression.push(symbol); 
                return oldExpression; 
            })
        // if an operation is inputted 
        } else {
            if (symbol !== "+-" && symbol !== "." && symbol !== "=" && 
            expression.length > 0 && Number.isInteger(parseInt(expression.at(expression.length-1)))) {
                if (expression.length > 2) {        
                    view = eval(expression.join("")); 
                }

                newExpression((oldExpression) => {                
                    oldExpression.push(symbol); 
                    return oldExpression; 
                })
            } 
        }

        console.log(expression); 

    }

    // cases for when printing out the equal sign  
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

export default Key;