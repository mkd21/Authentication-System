

import axios from "axios";
import { useState ,  createContext, useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  const [userData, updateUserData] = useState(null);
  const [accessToken , updateAccessToken ] = useState(() => localStorage.getItem("accessToken"));

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const getUserData = async() =>{

      try
      {
          const res = await axios.get(backendURL + "/api/get-data" , { headers : {Authorization : `Bearer ${accessToken}`} });
          console.log(res);

          if(res.status == 200)updateUserData(res.data);
          
      }
      catch(err)
      {
        toast.error(err.response.data.message);
      }
  }

  useEffect( () => {
    if(accessToken) getUserData();
  }, [accessToken] );

  
  return (<AppContext.Provider value={ {isLoggedIn , updateIsLoggedIn , userData , updateUserData , backendURL , updateAccessToken , accessToken } }>
            {props.children}
        </AppContext.Provider>);
        
};
