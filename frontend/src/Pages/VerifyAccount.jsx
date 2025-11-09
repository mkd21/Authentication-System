
import { useState , useRef, useEffect , useContext } from "react";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

import { AppContext } from "../context/createContext.jsx";

import axios from "axios";

function VerifyAccount()
{
    const {backendURL , accessToken , updateUserData , userData} = useContext(AppContext); 
    const navigate = useNavigate();

    const [formBox , updateBox] = useState(new Array(6).fill(""));
  
    const inputRefs = useRef([]);
    

    const handleChange = async(index , e) =>{
    
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

            if(otp.length == formBox.length)
            {

                try 
                {
                    const res = await axios.post(backendURL + "/verify-account" , {otp});

                    console.log(res);

                    if(res.status == 200)
                    {
                        navigate("/");
                        toast.success("Account Verified");

                        // this will remove the verify account option when we will be redirected to homepage.
                        const res = await axios.post(backendURL + "/is-auth" , {} , {headers : {Authorization : `Bearer ${accessToken}`}});
                        if(res.status == 200)
                        {
                            updateUserData( (prev) => ( {...prev , accountVerificationStatus : true} ) );
                        }
                    }
                } 
                catch (error) 
                {
                    toast.error("unable to verify account");
                }
                
            }
        }        
    }
 
    // will not allow to open the verify-account url if the account is verified 
    useEffect( () => {

        if(userData?.accountVerificationStatus)
            navigate("/");

    } , [userData] )


    // will keep the focus on first input when page is loaded
    useEffect( () => {

        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }

    } , [] );


    const handleKeyDown = (e , index) => {
        if(e.key == "Backspace" && index > 0)
        {
            inputRefs.current[index - 1].focus();
        }
    }

    return (
        <>
            
            <div className="flex justify-center items-center bg-gradient-to-br from-blue-400 via-purple-300 to-blue-500
                min-h-screen ">

                <div className="flex-col w-[50%] m-auto ">

                    <p className="text-2xl font-semibold text-center ">Enter Otp</p>

                    <form>

                        <div className="flex p-6 rounded-xl mx-3 max-w-full sm:max-w-lg">

                            {formBox.map((val, idx) => (
                            <input
                                type="text"
                                key={idx}
                                value={val}
                                maxLength={1}
                                ref={(e) => inputRefs.current[idx] = e}

                                className="w-14 h-14 sm:w-20 sm:h-20 text-2xl sm:text-3xl text-center mx-3 font-semibold
                                border-2 border-b-4 border-transparent
                                rounded-xl shadow-md focus:outline-none
                                focus:border-0 focus:ring-4 focus:ring-pink-300
                                transition-all duration-200 ease-in-out
                                hover:scale-105 focus:scale-110"

                                onChange={(e) => handleChange(idx, e)}
                                onKeyUp={(e) => handleKeyDown(e, idx)}
                            />
                            ))}
                        </div>
                    </form>

                </div>
                
            </div>
            
        </>
    );
}

export default VerifyAccount;