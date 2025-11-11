

import {createBrowserRouter , RouterProvider} from "react-router-dom";

// importing all the pages 

import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import VerifyAccount from "./Pages/VerifyAccount.jsx";

// react toastify 
import { ToastContainer} from 'react-toastify';

import './App.css';


const router = createBrowserRouter([

  {
    path : "/",
    element : <Home />
  },
  {
    path : "/login",
    element : <Login />
  },
  {
    path : "/verify-account",
    element : <VerifyAccount />
  },
  {
    path : "/reset-password",
    element : <ResetPassword />
  }

]);


import { AppContextProvider } from "./context/createContext.jsx";

function App() {


  return (
    <>
        {/* <AppContextProvider>
          <RouterProvider router = {router} /> 
          <ToastContainer autoClose = {1000} />
        </AppContextProvider> */}

        <ResetPassword />
    </>
  )
}

export default App;