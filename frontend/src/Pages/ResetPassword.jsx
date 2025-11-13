
import { useState, useRef, useEffect , useContext } from "react";
import { AppContext } from "../context/createContext.jsx";

import EmailInput from "../Components/EmailInput.jsx";
import ResetOTPForm from "../Components/resetOTPForm.jsx";
import PasswordInputForm from "../Components/PasswordInputForm.jsx";


function ResetPassword() {

  const [inputArr, updateInput] = useState(new Array(6).fill(""));

  const inputRef = useRef([]);


  const {backendURL} = useContext(AppContext);



  // states to show different input forms 

  const [isEmailGiven , updateEmail] = useState(false);
  const [isOtpEntered , updateOTP] = useState(false);
  const [isPasswordGiven , updatePassword] = useState(false);


  const [resetotp , otpUpdate] = useState(null);   // will be used for verification
  const [email , emailUpdate] = useState(""); // will be used for verification
  const [newPassword , updateNewPassword] = useState("");  // will be used for setting new password


  // to keep the focus on 1st input when page gets loaded
  // dependency is based on email status

  useEffect(() => {

    if(isEmailGiven)
      inputRef.current[0].focus();

  },[isEmailGiven]);


  const handleChange = (e, index) => {
    const updatedArr = [...inputArr];
    updatedArr[index] = e.target.value;

    if (e.target.value && index < inputArr.length - 1) {
      inputRef.current[index + 1].focus();

      inputRef.current[index + 1].setSelectionRange(1, 1);
    }
    updateInput(updatedArr);

    const resetOTP = updatedArr.join("");

    if(resetOTP.length == inputArr.length)
    {
      otpUpdate(resetOTP);
      updateOTP(true);
      updateEmail(true);
    }

  };

  const handleKeyUp = (e, index) => {
    if (e.key == "Backspace" || (e.key == "ArrowLeft" && index > 0)) {
      inputRef.current[index - 1].focus();
    }
    if (e.key == "ArrowRight" && index < inputArr.length - 1) {
      // setting the caret postion at the end of the input
      const element = inputRef.current[index + 1];
      element.setSelectionRange(1, 1);
      inputRef.current[index + 1].focus();
    }
  };


  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 px-4">

        {
          ( (!isEmailGiven) && <EmailInput emailUpdate = {updateEmail} email = {email} emailUpdater = {emailUpdate} backendURL = {backendURL}  /> )
        }

        {
          ( (!isOtpEntered) && (isEmailGiven) && <ResetOTPForm inputArr = {inputArr} inputRef = {inputRef} handleChange = {handleChange} handleKeyUp = {handleKeyUp} /> )
        }
          
        {
          ( (isEmailGiven) && (isOtpEntered) && (!isPasswordGiven) && <PasswordInputForm updatePassword = {updatePassword} email = {email} resetOTP = {resetotp} newPassword = {newPassword} updateNewPassword = {updateNewPassword} backendURL = {backendURL} /> )
        }
      
      </div>
    </>
  );
}

export default ResetPassword;
