

import { useState ,  createContext } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  const [userData, updateUserData] = useState(false);

  const backendURL = "http://localhost:4000/api";


  return (<AppContext.Provider value={ {isLoggedIn , updateIsLoggedIn , userData , updateUserData , backendURL } }>
            {props.children}
        </AppContext.Provider>);
        
};
