import { useState } from 'react'; 
import "./Calculator.css";
import Key from "./Key.js";

function Calculator() {
    const keyboard = [["C", "+-", "%", "/"], ["7", "8", "9", "x"],
                ["4", "5", "6", "-"], ["1", "2", "3", "+"],
                ["0", ".", "="]]; 
    
    const [op, setOp] = useState(); 
    const [view, setView] = useState(""); 
    const [number, setNumber] = useState({num: null, sign: false});

    return (
        <>
            <div className="calc">
                <div className="display"> 
                    {view}
                </div>

                <div className="buttons">
                    {   
                        keyboard.map((symbols, index) => {
                            return (
                                <div className='row' key={index}>
                                    {   
                                        symbols.map((symbol) => {
                                                return <Key key={symbol} symbol={symbol} view={view} op={op}
                                                newOp={setOp} newView={setView} number={number} newNumber={setNumber} />
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