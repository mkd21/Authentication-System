
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyAccessToken = async(req , res , next) =>{

    try 
    {
        const accessToken = req.header("Authorization")?.replace("Bearer " , "");
        
        if(!accessToken) return res.status(401).json({message : "access token not found"});

        const decodedData = jwt.verify(accessToken , process.env.JWT_SECRET_ACCESS);

        const user = await User.findById(decodedData.UserId);

        if(!user) return res.status(401).json({message : "user not found"});

        req.specificUser = user;

        next();
    }
    catch(error)
    {
        return res.status(401).json({message : "session expired"});
    }

}

export default verifyAccessToken;