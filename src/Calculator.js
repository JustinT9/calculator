import { useEffect, useState } from 'react'; 
import "./Calculator.css";
import Key from "./Key.js";

function Calculator() {
    const keyboard = [["C", "+-", "%", "/"], ["7", "8", "9", "x"],
                ["4", "5", "6", "-"], ["1", "2", "3", "+"],
                ["0", ".", "="]]; 
    
    // current operation 
    const [op, setOp] = useState(null); 
    // what is displayed 
    const [view, setView] = useState("0"); 
    // expression for the calculation
    const [expression, setExpression] = useState([]); 
    // result 
    const [num, setNum] = useState(null); 
    // previous 
    const [prev, setPrev] = useState(null)

    return (
        <>
            <div className="calc">
                <div className="display"> 
                    {view}
                </div>

                <div className="buttons">
                    {   

                        // printing the keys 
                        keyboard.map((symbols, index) => {
                            return (
                                <div className='row' key={index}>
                                    {   
                                        symbols.map((symbol) => {
                                                return <Key key={symbol} symbol={symbol} op={op}
                                                newOp={setOp} view={view} newView={setView} 
                                                expression={expression} newExpression={setExpression} />
                                            }
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Calculator; 