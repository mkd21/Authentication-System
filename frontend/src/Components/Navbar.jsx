
import {useNavigate} from "react-router-dom";


import {assets} from "../assets/assets.js";

function Navbar()
{
    const navigate = useNavigate();

    return(

        <div className="w-full flex justify-between items-center fixed top-0
            md:h-16 md:px-16">
            
            <div>
                <img src={assets.logo} alt="project logo" />
            </div>
        
            <button onClick={() => navigate("/login")}  className="md:w-[6rem] p-2 flex items-center justify-around border-2 border-black rounded-full font-semibold hover:bg-blue-100 "> Login <img src={assets.arrow_icon} alt="" /> </button>
        </div>
    );
}

export default Navbar;