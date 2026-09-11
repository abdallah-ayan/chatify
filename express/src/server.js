import dotenv from "dotenv"
import express from "express";
import authRouter from "./routes/auth.route.js";
import messagesRoute from "./routes/message.route.js"
import path from "path"
const app = express();
app.use("/api/auth/" , authRouter)
app.use("/api/message/" , messagesRoute)
dotenv.config()

const __dirname = path.resolve();
if(process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname , "../reactjs/dist")))

    app.get("*" , (req , res) => {
        res.sendFile(path.join(__dirname , "../reactjs/dist/index.html") )
    })
}

app.listen(process.env.PORT , ()=> {})