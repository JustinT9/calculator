import { useEffect, useState } from 'react'; 
import "./Calculator.css";

function Calculator() {
    
    // what is displayed 
    const [view, setView] = useState("0"); 
    // expression for the calculation
    const [expression, setExpression] = useState([]); 
    // a number to input into the expression 
    const [num, setNum] = useState(""); 
    // current operation 
    const [op, setOp] = useState();  
    // the number used to add if equals operation is spammed 
    const [saved, setSaved] = useState({num: null, op: null}); 

    // to update the view 
    useEffect(() => {
        if (num !== "") {
            setView(num); 
        } else if (expression.length > 2) {
            if (op !== "=") {
                setView(eval(expression.slice(0, expression.length-1).join("")))
                setExpression((oldExpression) => { 
                    return [eval(oldExpression.slice(0, oldExpression.length-1).join("")), oldExpression[oldExpression.length-1]]
                })
            } else {
                if (op === "=") {
                    if (!Number.isInteger(expression[expression.length-1])) {
                        setView(eval(expression.join("")));
                        setExpression((oldExpression) => { return [eval(oldExpression.join("")), saved.op]});
                    } else {
                        setView(eval(expression.join(""))); 
                        setExpression([]);
                        setNum(eval(expression.join("")));
                    }
                }
            }
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
            setNum(""); 
        } 

        // otherwise if a number is inputted 
       else if (symbol === "1" || symbol === "2" || symbol === "3" || 
        symbol === "4" || symbol === "5" || symbol === "6" || symbol === "7" || 
        symbol === "8" || symbol === "9") {
            setNum((oldNum) => { return oldNum + symbol })

        // if an operation is inputted 
        } else {
            if (symbol !== "+-" && symbol !== "." && symbol !== "=") {
                if (num !== "") {
                    setExpression((oldExpression) => { return [...oldExpression, num, symbol] } ); 
                    setSaved({num: num, op: symbol});
                    setNum(""); 
                } else if (expression.length > 0) {
                    setExpression((oldExpression) => { return [...oldExpression.slice(0, expression.length-1), symbol] } ); 
                }
            } else {
                if (symbol === "=" && expression.length > 0) {
                    if (!Number.isInteger(expression[expression.length-1]) && num === "") {
                        setExpression((oldExpression) => { return [...oldExpression, saved.num]})
                    } else {
                        setExpression((oldExpression) => { return [...oldExpression, num]} );
                        setSaved((oldSave) => { return {...oldSave, num: num}}); 
                        setNum(""); 
                    }
                } else if (symbol === "+-") {
                    setNum((parseInt(num)*-1).toString());
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