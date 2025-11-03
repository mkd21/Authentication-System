
import asyncWrapper from "../utils/asyncWrapper.utils.js";


const getUserData = asyncWrapper( async(req , res) =>{

    const user = req.specificUser;   // will be attached by middleware

    if(!user) return res.status(500).json({message : "internal server error"});

    return res.status(200).json({userName : user.name , accountVerificationStatus : user.isAccountVerified});
   
});

export {getUserData};