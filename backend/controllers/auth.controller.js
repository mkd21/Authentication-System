
import User from "../models/user.model.js";

import asyncWrapper from "../utils/asyncWrapper.utils.js";

const generate_Access_Refresh_Token = async(userId) =>{

    const currentUser = await User.findById(userId);

    const accessToken = currentUser.generateAccessToken();
    const refreshToken = currentUser.generateRefreshToken();

    currentUser.refreshToken = refreshToken;

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

    // send token to frontend if user is successfully created 
    
    const {refreshToken , accessToken} = await generate_Access_Refresh_Token(newUser._id);

    return res.cookie( "token" , refreshToken , {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : process.env.NODE_ENV === "development" ? "strict" : "none",
        maxAge : 7 * 24 * 60 * 60 * 1000
    })
    .json({message : "success"});

});


const login = asyncWrapper( async(req , res) =>{

    const {email , password} = req.body;

    if(!email || !password) throw new Error("email and password is mandatory");

    const specificUser = await User.findOne({email});

    if(!specificUser) throw new Error("user don't exist");

    // if here then , verify password 

    

});

export {signUp};