

import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({limit : "20kb"}));
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


// routes setup 
import authRoutes from "./routes/authRoutes.routes.js";


app.use("/api",authRoutes);

export default app;