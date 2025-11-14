
import { useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { assets } from "../assets/assets.js";

import { AppContext } from "../context/createContext.jsx";

import { toast } from 'react-toastify';

function Login() {

    const [formState , updateState] = useState("Signup");

    const [formData , updateFormData] = useState({name : "" , email : "" , password : "" });

    const handleChange = (e) =>{
      
      const {name , value} = e.target;

      updateFormData( (prev) => {

        return {...prev , [name] : value}

      });

    }

    const navigate = useNavigate();

    // using context variables 
    const {isLoggedIn , updateIsLoggedIn , backendURL , userData  , updateAccessToken} = useContext(AppContext);
    
    const handleFormSubmit = async(e) =>{

      e.preventDefault();
      axios.defaults.withCredentials = true;

      try
      { 
        if(formState == "Signup")
        {
          const res =  await axios.post(backendURL + "/api/signup" , formData);
          
          if(res.status == 200)
          {
            updateIsLoggedIn(true);
            navigate("/");
          }
        }
        else
        {
            const res = await axios.post(backendURL + "/api/login" , {email : formData.email , password : formData.password});

            if(res.status == 200)
            {
              navigate("/");
              toast.success(res.data.message);
              updateAccessToken(res.data.accessToken);
              localStorage.setItem("accessToken" , res.data.accessToken);
            }
        }
      }
      catch(err)
      {
        
        console.log(err);
        toast.error(err.response.data.message);
      }

    }

  return (

    <div className="bg-gradient-to-l from-blue-400 to-violet-300 min-h-screen ">
      <div className="ps-12 md:h-16 flex items-center ">
        <img className="hover:cursor-pointer" onClick={() => navigate("/")} src={assets.logo} alt="" />
      </div>

      {/* form  */}
      <div>
        <form onSubmit={handleFormSubmit} className="max-w-md mx-auto p-6 bg-gradient-to-r from-[#4a2470] to-[#130740] rounded-lg shadow-md mt-10">

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
                name="name"
                className="mt-1 block w-full rounded-md px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                value={formData.fullname}
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
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          {/* forgot password option  */}

          <p className="text-blue-500 my-4 hover:cursor-pointer" onClick={() => navigate("/reset-password")} >
            forgot password?
          </p>

          <button type="submit" className="w-full bg-white text-gray-800 py-2 rounded-md hover:bg-gray-100 transition-colors font-semibold">
            {formState.toUpperCase()}
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
