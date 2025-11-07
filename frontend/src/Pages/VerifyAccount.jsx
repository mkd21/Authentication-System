
import { useState , useRef, useEffect } from "react";

function VerifyAccount()
{

    const [formBox , updateBox] = useState(new Array(4).fill(""));
  
    const inputRefs = useRef([]);
    

    const handleChange = (index , e) =>{
    
        const value = e.target.value;
        console.log(value);
        if(/^[0-9]$/.test(value) || value == "" )
        {
            const updatedArr = [...formBox];
            updatedArr[index] = value;
            updateBox(updatedArr);
            
            if(e.target.value && index < formBox.length-1)
            {
                inputRefs.current[index + 1].focus();
            }

            const otp = updatedArr.join("");

            if(otp.length == formBox.length) console.log("serval call made with opt",otp);
        }        
    }

    
    // will keep the focus on first input when page is loaded
    useEffect( () => {

        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }

    } , [] );

    const handleClick = () => {}

    const handleKeyDown = (e , index) => {
        if(e.key == "Backspace" && index > 0)
        {
            inputRefs.current[index - 1].focus();
        }
    }

    return (
        <>
            
            <form>
                {
                    formBox.map( (val , idx) => (
                        <input 
                            type="string" 
                            key={idx} 
                            value={val}
                            maxLength={1}
                            ref={ (e) => inputRefs.current[idx] = e }
                            className="border-2 border-black mt-12 mx-3 w-14 ps-6 focus:outline-blue-300 "
                            onChange={ (e) => handleChange(idx , e)}
                            onClick={handleClick}
                            onKeyUp={ (e) =>  handleKeyDown(e , idx)}
                        />)
                    )
                }
            </form>
    

        </>
    );
}

export default VerifyAccount;