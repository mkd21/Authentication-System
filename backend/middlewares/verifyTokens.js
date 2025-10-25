
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


const verifyTokens = async(req , res , next) =>{

    try
    {   
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer " , "");

        if(!token) return res.status(401).json({message : "unauthorised access"});

        const decoded = jwt.verify(token , process.env.JWT_SECRET_REFRESH);

        if(!decoded) return res.status(500).json({message : "internal error with verifying token"});

        const user = await User.findById(decoded.UserId);

        if(!user) return res.status(401).json({message : "user not found"});

        req.specificUser = user;

        next();

    }
    catch(err)
    {
        return res.status(401).json({message : err.message});
    }

}


export default verifyTokens;