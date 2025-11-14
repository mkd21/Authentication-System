
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export default function PasswordInputForm({backendURL , email , newPassword , resetOTP , updateNewPassword})
{
    
    const navigate = useNavigate();

    const handleClick = async() =>{
       
        try 
        {
            const res = await axios.post(backendURL + "/api/reset-password" , {email , password :  newPassword , otp :  resetOTP});
            console.log(res);
            toast.success("password updated!!");
            navigate("/");
        }
        catch(err)
        {
            toast.error("some error occured");
            console.log(err);
        }   
    }

    return <>
        <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 py-6 bg-transparent md:w-1/2 mx-auto rounded-lg shadow-lg" >

            <input type="password" placeholder="enter your new password" onChange={(e) => updateNewPassword(e.target.value)} 
                className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm md:text-base" />

            <button onClick={handleClick}
                className="w-full max-w-md py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors text-sm md:text-base font-semibold">
                    Reset Password
            </button>

        </div>
        
    </>
}