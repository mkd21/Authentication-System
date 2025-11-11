
import { useState , useRef , useEffect } from "react";

function ResetPassword()
{
    const [inputArr , updateInput] = useState(new Array(6).fill(""));

    const inputRef = useRef([]);

    // to keep the focus on 1st input when page gets loaded 


    useEffect( () =>{

        inputRef.current[0].focus();

    } , []);

    const handleChange = (e , index) =>{
        
        const updatedArr = [...inputArr];
        updatedArr[index] = e.target.value;

        if(e.target.value && index < inputArr.length - 1)
        {
            inputRef.current[index + 1].focus();

            inputRef.current[index + 1].setSelectionRange(1 , 1);
        }


        updateInput(updatedArr);

    }

    const handleKeyUp = (e , index) =>{

        if(e.key == "Backspace" || e.key == "ArrowLeft" && index > 0)
        {
            inputRef.current[index - 1].focus();
        }
        if(e.key == "ArrowRight" && index < inputArr.length - 1)
        {
            // setting the caret postion at the end of the input
            const element = inputRef.current[index + 1];
            element.setSelectionRange(1 , 1);
            inputRef.current[index + 1].focus();
        }
    }

    return (
        <>
            <div>
                <div>
                    <p>Enter Reset Password OTP</p>
                </div>

                <div className=" mt-12 " >
                    <form>
                        {
                            inputArr.map( (value , index) => {
                                return <input type="text" 
                                    key={index} 
                                    value={value} 
                                    maxLength={1}
                                    ref={(e) => inputRef.current[index] = e}
                                    onChange={(e) => handleChange(e,index)}
                                    onKeyUp={(e) => handleKeyUp(e , index)}
                                    className=" border w-12 mx-5 focus:border-0 focus:ring-4 focus:ring-pink-300"
                                    />
                            } )
                        }
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;