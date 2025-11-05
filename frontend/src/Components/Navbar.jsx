
import {useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/createContext.jsx";
import {assets} from "../assets/assets.js";

function Navbar()
{
    const {userData} = useContext(AppContext);

    const navigate = useNavigate();

    return(

        <div className="w-full flex justify-between items-center fixed top-0
            md:h-16 md:px-16">
            
            <div>
                <img src={assets.logo} alt="project logo" />
            </div>
        
            {
                (userData) ? <div className=" relative group md:w-[3rem] p-[10px] text-white bg-black flex items-center justify-around border-2 rounded-full font-bold hover:cursor-pointer">
                        <div> <p>{userData.userName[0].toUpperCase()} </p> </div>

                        <div className="hidden absolute mt-[7rem] w-[8rem] text-center bg-slate-100 text-black rounded-lg group-hover:block" >
                            <button className=" mt-1 border-b-2" >Verify Account</button>
                            <button className="my-1 border-b-2 " >Log out</button>
                        </div>
                        
                    </div> 
                : 
                <button onClick={() => navigate("/login")}  className="md:w-[6rem] p-2 flex items-center justify-around border-2 border-black rounded-full font-semibold hover:bg-blue-100 "> Login <img src={assets.arrow_icon} alt="" /> </button>
            }
            
        </div>
    );
}

export default Navbar;