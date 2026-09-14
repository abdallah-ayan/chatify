import express from "express"
import {
    login ,
    logout ,
    signUp 
} from "./../controller/auth.controller.js"
import { protect } from "../middleware/auth.middleware.js";
import Res from "../utils/Res.js";

const router = express.Router();

router.route("/signup").post(signUp)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/check").get(protect , (req , res) => Res(res).status(200).data({user : req.user}).end());
export default router