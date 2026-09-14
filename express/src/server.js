import dotenv from "dotenv"
import express from "express";
import authRouter from "./routes/auth.route.js";
import messagesRoute from "./routes/message.route.js"
import userRouter from "./routes/user.route.js"
import path from "path"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import errorController from "./controller/error.Controller.js";
dotenv.config()
const app = express();
app.use(express.json({limit : "10kb"}));
app.use(cookieParser())
app.use("/api/auth/" , authRouter)
app.use("/api/user/" , userRouter)
app.use("/api/message/" , messagesRoute)

app.use(errorController);
const __dirname = path.resolve();
if(process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname , "../reactjs/dist")))

    app.get("*" , (req , res) => {
        res.sendFile(path.join(__dirname , "../reactjs/dist/index.html") )
    })
}

app.listen(process.env.PORT , ()=> {
    console.log("listening .....")
    connectDB();
})