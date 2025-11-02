

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json({limit : "20kb"}));
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


const allowedOrigins = ["http://localhost:5173"]
app.use(cors({ origin : allowedOrigins , credentials : true }))

// routes setup 
import authRoutes from "./routes/authRoutes.routes.js";

import UserData from "./routes/userData.route.js";


app.use("/api",authRoutes);
app.use("/api",UserData);

export default app;