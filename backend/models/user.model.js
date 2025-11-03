
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({

    name : { 
        type : String , 
        required : true 
    },
    email : {
        type : String ,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },

    verifyOtp : {
        type : String,
        default : ''
    },
    verifyOtpExpireAt : {
        type : Number,
        default : 0
    },

    isAccountVerified : {
        type : Boolean,
        default : false
    },

    resetOtp : {
        type : String,
        default : ''
    },
    resetOtpExpireAt : {
        type : Number,
        default : 0
    },

    token : {
        type : String
    }
});

UserSchema.pre("save" , async function(next){

    if( !this.isModified("password") ) return next();

    this.password = await bcrypt.hash(this.password , 10);

    next();
});

// tokens generation methods 
UserSchema.methods.generateAccessToken = function()
{
    return jwt.sign({ userId : this._id} , process.env.JWT_SECRET_ACCESS , {expiresIn : "30m"});
}

UserSchema.methods.generateRefreshToken = function()
{
    return jwt.sign({UserId : this._id} , process.env.JWT_SECRET_REFRESH , {expiresIn : "7d"});
}

UserSchema.methods.isPasswordCorrect = async function(userPassword)
{
    return await bcrypt.compare(userPassword , this.password);
}

// checks if model already exist or what 
const User = mongoose.models.user || mongoose.model("User" , UserSchema);

export default User;