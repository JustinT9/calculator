import { useEffect, useState } from 'react'; 
import "./Calculator.css";
import Key from "./Key.js";

function Calculator() {
    const symbols = [["C", "+-", "%", "/"], ["7", "8", "9", "X"],
                ["4", "5", "6", "-"], ["1", "2", "3", "+"],
                ["0", ".", "="]]; 

    const [char, setChar] = useState(""); 
    const [computation, setComputation] = useState(); 

    return (
        <>
            <div className="calc">
                <div className="display"> 
                    {char}
                </div>

                <div className="button-row">
                {   
                    symbols.map((symbol, index) => {
                        return (
                            <div className='row' key={index}>
                                {   
                                    symbol.map((sign) => {
                                            return <Key newChar={setChar} key={sign} symbol={sign} />
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