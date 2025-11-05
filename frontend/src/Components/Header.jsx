
import { useContext } from "react";
import { AppContext } from "../context/createContext.jsx";

import { assets } from "../assets/assets.js";

export default function Header() {

    const {userData} = useContext(AppContext);

    // console.log(userData);

  return (

    <div className="flex flex-col items-center justify-center min-h-[90.7vh] bg-[url('../bg_img.png')]  bg-cover bg-center
        md:mt-[4rem]">

            {/* image */}
            <div className=" md:w-[10%] ">
                <img
                    src={assets.header_img}
                    alt="robo image"
                    className=" rounded-full "
                />
            </div>

            {/* texts  */}
            <div>
                
                <section className="flex items-center justify-center ">

                    <h1 className=" md:text-[1.6rem] md:mr-4 font-semibold ">
                        { userData ? `Hey, ${userData.userName.charAt(0).toUpperCase() + userData.userName.slice(1) }` : "Hey Developer" }
                    </h1>

                    <img src={assets.hand_wave} alt="" className=" md:w-[1.7rem] " />

                </section>

                <section className="">
                    <h1 className=" md:text-[2rem] font-[600] text-center"> Welcome to our app </h1>
                </section>

                <section className="">
                    <h2 className=" text-[1.2rem]">Lets start with a quick product tour and we will have you up and running in no time!</h2>
                </section>

            </div>

            {/* button  */}
            <div className="md:mt-8" >
                <button className=" border p-[0.7rem] rounded-full hover:bg-gray-200 " >Get Started</button>
            </div>
    </div>
  );
}
