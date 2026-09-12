import express from "express"
import {
    login ,
    logout ,
    signUp
} from "./../controller/auth.controller.js"
const router = express.Router();

router.route("/login").get(login)
router.route("/signup").post(signUp)
router.route("/logout").get(logout)

export default router