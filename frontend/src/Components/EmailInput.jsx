
import { toast } from "react-toastify";
import axios from "axios";


export default function EmailInput({emailUpdate , email , emailUpdater , backendURL})
{

    const handleSubmit = async() =>{
        
        try 
        {
            const res = await axios.post(backendURL + "/api/reset-password-otp" , {email});
            console.log(res);
            toast.success("OTP sent successfully");
            emailUpdate(true);
        }
        catch(err)
        {
            toast.error(err.response.data.message);
            console.log(err);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 py-6 bg-transparent md:w-1/2 mx-auto rounded-lg shadow-lg">
                <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={ (e) => emailUpdater(e.target.value) }
                    className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm md:text-base"
                />
                <button onClick={handleSubmit}
                        className="w-full max-w-md py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors text-sm md:text-base font-semibold">
                    Send reset OTP
                </button>
            </div>
        </>
     )
}