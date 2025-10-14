

import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connectDb from "./DB/dbConnection.js";

connectDb()
.then( () =>{
    app.listen(process.env.PORT , () =>{
        console.log("server is live at port no.",process.env.PORT);
    });
})
.catch( (err) =>{
    console.log("error occured",err);
    process.exit(1);
});