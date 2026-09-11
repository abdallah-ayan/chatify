import dotenv from "dotenv"
import express from "express";
import authRouter from "./routes/auth.route.js";
import messagesRoute from "./routes/message.route.js"
const app = express();
app.use("/api/auth/" , authRouter)
app.use("/api/message/" , messagesRoute)
dotenv.config()

app.listen(process.env.PORT , ()=> {})