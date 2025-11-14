
import User from "../models/user.model.js";

import asyncWrapper from "../utils/asyncWrapper.utils.js";

import transporter from "../utils/nodemailer.utils.js";

import jwt from "jsonwebtoken";


const generate_Access_Refresh_Token = async(userId) =>{

    const currentUser = await User.findById(userId);

    const accessToken = currentUser.generateAccessToken();   // these methods are attached on user docs and not on whole model
    const refreshToken = currentUser.generateRefreshToken();

    currentUser.token = refreshToken;

    await currentUser.save({validateBeforeSave : false});

    return {accessToken , refreshToken};
}

const signUp = asyncWrapper( async(req , res) =>{

    const {email , password , name} = req.body;

    if(!email || !password || !name) throw new Error("all fields are required");

    // check if email already exist 

    const user = await User.findOne({email});

    if(user) throw new Error("user already exist..");


    // hash the password and add user to DB 

    const newUser = await User.create({name , email , password});

    // send email to user after successful signup 

    const emailOptions = {
        from : process.env.SENDER_EMAIL,
        to : email,
        subject : "Welcome to Auth App",
        text : `Hi, your account with email id ${email} has been successfully created, verification password will be sent shortly`
    }

    await transporter.sendMail(emailOptions);

    return res.status(200).json({message : "account created successfully"});

});

const login = asyncWrapper( async(req , res) =>{

    const {email , password} = req.body;

    if(!email || !password) throw new Error("email and password is mandatory");

    const specificUser = await User.findOne({email}).select("+password")

    if(!specificUser) return res.status(401).json({message : "no user found"});


    // if here then , verify password 

    const isUserGenuine = await specificUser.isPasswordCorrect(password);

    if(!isUserGenuine) return res.status(500).json({message : "wrong credentials"});

    const plainObject = specificUser.toObject();

    delete plainObject.password;

    const {accessToken , refreshToken} = await generate_Access_Refresh_Token(plainObject._id);

    return res.cookie("token" , refreshToken , {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : process.env.NODE_ENV === "development" ? "strict" : "none",
        maxAge : 7 * 24 * 60 * 60 * 1000 
    })
    .json({message : "user logged in successfully" , accessToken});

});


const logout = asyncWrapper( async(req , res) =>{

//   now we just need to delete the token from the user document 

    await User.findByIdAndUpdate(req.specificUser._id , { $set : {token : null} });

    res.clearCookie("token" , 
        {
            httpOnly : true , 
            secure : process.env.NODE_ENV === "production" , 
            sameSite : process.env.NODE_ENV === "development" ? "strict" : "none"
        }
    );

    return res.status(200).json({message : "user logged out successfully"});
    
});


// controller for sending OTP and verification of account 
const sendVerificationOtp = ( async(req , res) =>{

    const user = req.user;

    const otp = String( Math.floor(100000 + Math.random() * 900000) );

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() * 10 * 60 * 1000;  // otp expiry duration is 10 minutes

    // now send the same otp to the current user email 

    const emailOptions = {
        from : process.env.SENDER_EMAIL,
        to : user.email,
        subject : "Verification OTP",
        text : `Hi,Your OTP is ${otp}.Please use this OTP to verify your account`
    }

    await transporter.sendMail(emailOptions);

    await user.save();

    return res.status(200).json({message : "OTP sent successfully!!"});

});

const verifyAccount = ( async(req , res) =>{

    const user = req.specificUser;
    const {otp} = req.body;

    if(!otp) return res.status(401).json({message : "OTP is required"});

    if(!user) return res.status(500).json({message : "Internal Server Error"});

    if(user.verifyOtp != otp || user.verifyOtp === "") return res.status(401).json({message : "unauthorised request"});


    // if otp is valid now check for the expiry date 
    if(user.verifyOtpExpireAt < Date.now()) return res.status(401).json({message : "OTP already Expired"});
    
    user.isAccountVerified = true;

    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.status(200).json({message : "Account Verified Successfully"});

});


// controller to check if account is verified or not 
const isAuthenticated = ( async(req , res) =>{

    const token = req.cookie?.token || req.headers?.authorization?.split(" ")[1];

    if(!token) return res.status(401).json({message : "required token error"});

    const verifiedToken = jwt.verify(token , process.env.JWT_SECRET_ACCESS);

    console.log(verifiedToken);

    const user = await User.findById(verifiedToken.UserId);
    console.log(user);

    if(!user.isAccountVerified) return res.status(401).json({message : "account is not verified,please verify your account"});

    return res.status(200).json({message : "Account is Verified"});

});


// controllers for resetting password (user will send email and we will verify if )
const sendResetOtp = asyncWrapper( async(req , res) =>{

    const {email} = req.body;

    if(!email) return res.status(401).json({message : "email is required"});
    
    const user = await User.findOne({email});
    
    // if user exist then we will generate reset otp and otp expiry time 
    if(!user) return res.status(401).json({message : "no user found"});
    
    const Otp = Math.floor((100000 + Math.random() * 900000));

    const otpExpiryDate = Date.now() + 15 * 60 * 1000;

    user.resetOtp = Otp;
    user.resetOtpExpireAt = otpExpiryDate;

    user.save();

    const emailContent = {
        from : process.env.SENDER_EMAIL,
        to : email,
        subject : "Reset Password OTP",
        text : `Hi,your OTP for resetting your password is ${Otp}`
    }

    await transporter.sendMail(emailContent);

    return res.status(200).json({message : "OTP for resetting your account password is sent successfull to email"});
});

const resetPassword = asyncWrapper( async(req , res) =>{

    const {email , password , otp} = req.body;

    if(!email || !password || !otp) return res.status(401).json({message : "Email , Password and OTP are required"});

    const user = await User.findOne({email});

    if(!user) return res.status(401).json({message : "User not found"});

    // if otp is not correct 
    if(user.resetOtp != otp) return res.status(401).json({message : "OTP is not valid"});

    // if otp is expired 
    if(user.resetOtpExpireAt < Date.now()) return res.status(500).json({message : "OTP expired"});

    user.password = password;   // it will be encrypted when pre hook will execute before saving the data to DB
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    user.save();

    return res.status(200).json({message : "password updated successfully!!"});
});

export {signUp , login , logout , sendVerificationOtp , verifyAccount , isAuthenticated , sendResetOtp , resetPassword};