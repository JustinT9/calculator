import { useEffect, useState } from 'react'; 
import "./Calculator.css";

function Calculator() {
    
    // what is displayed 
    const [view, setView] = useState("0"); 
    // expression for the calculation
    const [expression, setExpression] = useState([]); 
    // a number to input into the expression 
    const [num, setNum] = useState("0"); 
    // current operation 
    const [op, setOp] = useState();  
    // the number used to add if equals operation is spammed 
    const [saved, setSaved] = useState({num: null, op: null}); 

    // to update the view 
    useEffect(() => {
        // display the number whenever its inputted
        if (num !== "") {
            setView(num); 
        } else if (expression.length > 2) {
            // display calculations with operations other than =, +-, and . 
            if (op !== "=") {
                setView(eval(expression.slice(0, expression.length-1).join("")))
                setExpression((oldExpression) => { 
                    return [eval(oldExpression.slice(0, oldExpression.length-1).join("")), oldExpression[oldExpression.length-1]]
                })
            } else {
                if (op === "=") {
                    setView(eval(expression.join("")));
                    setExpression((oldExpression) => { return [eval(oldExpression.join("")), saved.op]});
                } 
            }
        } else if (op === "+-") {
            setView(expression[0]); 
            setSaved((oldSave) => { return {...oldSave, num: expression[0]*-1}}); 
        }

        console.log(expression);
        console.log(num); 
        console.log(op); 
        console.log(saved.num);

    }, [num, expression])

    const handleClick = (symbol) => {
        // if clear then reset everything 
        if (symbol === "C") {
            setExpression([]);
            setView("0"); 
            setNum("0"); 
            setOp("");
            setSaved({num: null, op: null});
        } 

        // otherwise if a number is inputted 
       else if (symbol === "0" || symbol === "1" || symbol === "2" || symbol === "3" || 
        symbol === "4" || symbol === "5" || symbol === "6" || symbol === "7" || 
        symbol === "8" || symbol === "9") {
            if (num === "0") {
                setNum(symbol);
            } else {
                setNum((oldNum) => { return oldNum + symbol });
            }

        // if an operation is inputted 
        } else {
            if (symbol !== "+-" && symbol !== "." && symbol !== "=") {
                // if there is a number and a operation then form an expression and reset the number 
                // for the next input 
                if (num !== "") {
                    setExpression((oldExpression) => { return [...oldExpression, num, symbol] } ); 
                    setSaved({num: num, op: symbol});
                    setNum("");
                // to change the sign or operation 
                } else if (expression.length > 0) {
                    // if the number is negative and a subtraction operation is conducted 
                    if (symbol === "-" && expression[expression.length-1] === "-" || 
                    symbol === "-" && parseFloat(expression[0]) < 0) {
                        setExpression((oldExpression) => { return [...oldExpression.slice(0, expression.length-1), "+"] } );
                        setSaved( {num: -1*expression[0], op: "+"} )
                    } else {
                        setExpression((oldExpression) => { return [...oldExpression.slice(0, expression.length-1), symbol] } ); 
                        setSaved( {num: expression[0], op: symbol } )
                    }
                }
            // otherwise if its not a *, +, %, /, - operation 
            } else {
                if (symbol === "=" && expression.length > 0) {
                    // if its an operation such as (56 +) and equals is used 
                    if (!Number.isInteger(expression[expression.length-1]) && num === "") {
                        setExpression((oldExpression) => { return [...oldExpression, saved.num]})
                    // otherwise if its a normal operation on expression such as 56 + 56 
                    } else {
                        setExpression((oldExpression) => { return [...oldExpression, num]} );
                        setSaved((oldSave) => { return {...oldSave, num: num}}); 
                        setNum(""); 
                    }
                } else if (symbol === "+-") {
                    if (num !== "") {
                        if (parseFloat(num) % 1 == 0) {
                            setNum((parseInt(num)*-1).toString());
                        } else {
                            setNum((parseFloat(num)*-1.00).toString());
                        }
                    } else {
                        if (expression[0] % 1 == 0) {
                            setExpression([expression[0]*-1, expression[expression.length-1]])
                        } else {
                            setExpression([expression[0]*-1.00, expression[expression.length-1]])
                        }
                    }
                } else if (symbol === ".") {
                    setNum((oldNum) => { return oldNum + "."} )
                }
            }
            setOp(symbol);  
        }
    }

    return (
        <>
            <div className="calc">
                <div className="display"> 
                    {view}
                </div>

                <div className="buttons">
                    <div className='row'> 
                        <div onClick={() => handleClick("C")} className='box'>
                            C
                        </div>
                        <div onClick={() => handleClick("+-")} className='box'>
                            +-
                        </div>
                        <div onClick={() => handleClick("%")} className='box'>
                            %
                        </div>
                        <div onClick={() => handleClick("/")} className='box'>
                            / 
                        </div>
                    </div>

                    <div className='row'>
                        <div onClick={() => handleClick("7")} className='box'>
                            7 
                        </div>
                        <div onClick={() => handleClick("8")} className='box'>
                            8
                        </div>
                        <div onClick={() => handleClick("9")} className='box'>
                            9 
                        </div>
                        <div onClick={() => handleClick("*")} className='box'>
                            x
                        </div>
                    </div>

                    <div className='row'>
                        <div onClick={() => handleClick("4")} className='box'>
                            4
                        </div>
                        <div onClick={() => handleClick("5")} className='box'>
                            5 
                        </div>
                        <div onClick={() => handleClick("6")} className='box'>
                            6 
                        </div>
                        <div onClick={() => handleClick("-")} className='box'>
                            -
                        </div>
                    </div>

                    <div className='row'>
                        <div onClick={() => handleClick("1")} className='box'>
                            1
                        </div>
                        <div onClick={() => handleClick("2")} className='box'>
                            2 
                        </div>
                        <div onClick={() => handleClick("3")} className='box'>
                            3 
                        </div>
                        <div onClick={() => handleClick("+")} className='box'>
                            +
                        </div>
                    </div>

                    <div className='row'>
                        <div onClick={() => handleClick("0")} className='box'>
                            0
                        </div>
                        <div onClick={() => handleClick(".")} className='box'>
                            .
                        </div>
                        <div onClick={() => handleClick("=")} className='equalsBox'>
                            =
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calculator; 