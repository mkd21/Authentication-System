

import axios from "axios";
import { useState ,  createContext, useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  const [userData, updateUserData] = useState(false);
  const [accessToken , updateAccessToken ] = useState(() => localStorage.getItem("accessToken"));

  const backendURL = "http://localhost:4000/api";


  const getUserData = async() =>{

      try
      {
          const res = await axios.get(backendURL + "/get-data" , { headers : {Authorization : `Bearer ${accessToken}`} });
          console.log(res);

          if(res.status == 200)updateUserData(res.data.userName);
          
      }
      catch(err)
      {
        toast.error(err.response.data.message);
      }
  }

  useEffect( () => {

    console.log("use effect called");
    if(accessToken) getUserData();

  }, [accessToken] );

  
  return (<AppContext.Provider value={ {isLoggedIn , updateIsLoggedIn , userData , updateUserData , backendURL , updateAccessToken } }>
            {props.children}
        </AppContext.Provider>);
        
};
