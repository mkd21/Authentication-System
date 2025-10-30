
import {createBrowserRouter , RouterProvider} from "react-router-dom";

// importing all the pages 

import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import VerifyAccount from "./Pages/VerifyAccount.jsx";

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

function App() {

  return (
    <>
      <RouterProvider router = {router} />
    </>
  )
}

export default App;