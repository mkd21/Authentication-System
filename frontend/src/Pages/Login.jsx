
import { useState } from "react";

import { assets } from "../assets/assets.js";

function Login() {

    const [formState , updateState] = useState("Signup");

    const [formData , updateFormData] = useState({ fullname : "" , email : "" , password : "" });

    const handleChange = (e) =>{
      
      const {name , value} = e.target;

      updateFormData( (prev) => {

        return {...prev , [name] : value}

      });

    }

  return (

    <div className="bg-gradient-to-l from-blue-400 to-violet-300 min-h-screen ">
      <div className="">
        <img src={assets.logo} alt="" />
      </div>

      {/* form  */}
      <div>
        <form className="max-w-md mx-auto p-6 bg-gradient-to-r from-[#4a2470] to-[#130740] rounded-lg shadow-md mt-10">

            {
                formState == "Signup" ? (<h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Sign Up
                </h2>)
                :
                (<h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Login
                </h2>)
            }
          
          
          {
             (formState == "Signup" && ( <label className="block mb-4">
              <span className="text-white font-medium">Full Name</span>
              <input
                type="text"
                name="fullname"
                className="mt-1 block w-full rounded-md px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                onChange={handleChange}
              />
            </label>))
          }
         
          <label className="block mb-4">
            <span className="text-white font-medium">Email</span>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
              onChange={handleChange}
            />
          </label>

          <label className="block mb-6">
            <span className="text-white font-medium">Password</span>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
              onChange={handleChange}
            />
          </label>

          {/* forgot password option  */}

          <p className="text-blue-500 my-4 hover:cursor-pointer ">
            forgot password?
          </p>

          <button type="submit" className="w-full bg-white text-gray-800 py-2 rounded-md hover:bg-gray-100 transition-colors font-semibold">
            Register
          </button>

          {/* text to choose btwn login and signup  */}

          {formState == "Signup" ? (<p onClick={() => updateState("login")} className="text-white mt-4 hover:cursor-pointer" >
              Already have an account?  {" "} <span>Login here</span>
            </p>) 
            : 
            (<p onClick={() => updateState("Signup")} className="text-white mt-4 hover:cursor-pointer" >
              Don't have an account? {" "} <span>Signup</span>
            </p>)
          }

        </form>
      </div>
    </div>
  );
}

export default Login;
