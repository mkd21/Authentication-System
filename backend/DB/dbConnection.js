
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const connectDb = () => mongoose.connect(`${process.env.MONGO_URI}/Auth_Project_DB`);

export default connectDb;