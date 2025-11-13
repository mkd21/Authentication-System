
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const sendOtp = async(req , res , next) =>{

    try 
    {
        const token = req.header("Authorization")?.replace("Bearer " , "");


        if(!token) return res.status(401).json({message : "invalid request"});

        const verifiedUser = jwt.verify(token , process.env.JWT_SECRET_ACCESS);

        if(!verifiedUser) return res.status(401).json({message : "unauthorised access"});

        const targetUser = await User.findById(verifiedUser.UserId);

        if(!targetUser) throw res.status(400).json({message : "user not found"});

        req.user = targetUser;
        next();
        
    }
    catch(err)
    {
        throw new Error(err);
    }

}