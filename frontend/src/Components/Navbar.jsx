
import {assets} from "../assets/assets.js";

function Navbar()
{
    return(

        <div className=" bg-yellow-100 w-full flex justify-between items-center
            md:h-16 md:px-16">
            
            <div>
                <img src={assets.logo} alt="project logo" />
            </div>
        
            <button className="md:w-[6rem] p-2 flex items-center justify-around border-2 border-black rounded-full font-semibold hover:bg-blue-100 "> Login <img src={assets.arrow_icon} alt="" /> </button>
        </div>
    );
}

export default Navbar;