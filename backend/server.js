import express from "express";
import { config } from "dotenv";
import taskRouter from "./routes/task.js"

import userRouter from "./routes/user.routes.js"
import { connectDB} from "./data/database.js"
import cookieParser from "cookie-parser";
import cors from "cors";
 

const app = express();
config({
    path:"./data/config.env",
});
 //isko router se uper rakho bar bar error de rha hai 
//using a middleware
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
 connectDB();
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.get("/" , (req, res)=>{
res.send("working server working")
});

app.listen(4000,()=>{
console.log("server is working ");
})
