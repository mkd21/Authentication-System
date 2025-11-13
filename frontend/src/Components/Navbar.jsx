
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/createContext.jsx";
import {assets} from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar()
{
    const {userData , backendURL , updateUserData , accessToken } = useContext(AppContext);

    const navigate = useNavigate();

    const handleLogout = async() =>{

        axios.defaults.withCredentials = true;
        try
        {
            const res = await axios.post(backendURL + "/logout");

            if(res.status == 200) localStorage.removeItem("accessToken");
            updateUserData(null);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const handleVerifyAccount = async() =>{

        try {
            const res = await axios.post(backendURL + "/send-verification-otp", {},
                { headers : {Authorization : `Bearer ${accessToken}`} });

                if(res.status == 200)
                {
                    navigate("/verify-account");
                }

        } catch (error) {
            console.log(error);
        }

    }

    return(

        <div className="w-full flex justify-between items-center fixed top-0
            h-16 px-4 md:px-16">
            
            <div>
                <img src={assets.logo} alt="project logo" className="w-full" />
            </div>
        
            {
                (userData) ? <div className=" relative group md:w-[3rem] p-[10px] text-white bg-black flex items-center justify-around border-2 rounded-full font-bold hover:cursor-pointer">
                        <div> <p>{userData.userName[0].toUpperCase()} </p> </div>

                        <div className={ (userData.accountVerificationStatus) ? `hidden absolute mt-[4.4rem] w-[8rem] text-center bg-slate-100 text-black rounded-lg group-hover:block` : `hidden absolute mt-[6.3rem] w-[8rem] text-center bg-slate-100 text-black rounded-lg group-hover:block`} >

                            { !userData.accountVerificationStatus && 
                                <button className=" mt-1 border-b-2" onClick={handleVerifyAccount}>Verify Account</button>
                            }
                            
                            <button className="" onClick={handleLogout} >Log out</button>
                        </div>
                        
                    </div> 
                : 
                <button onClick={() => navigate("/login")}  
                    className ="
                    flex items-center justify-around border-2 border-black rounded-full font-semibold hover:bg-blue-100 
                    w-[5rem]
                    md:w-[6rem] p-2 "> 

                    Login <img src={assets.arrow_icon} alt="" /> 

                </button>
            }
            
        </div>
    );
}

export default Navbar;