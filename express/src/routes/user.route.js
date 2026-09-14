import express from "express"

import { updateProfile } from "./../controller/user.controller.js"
import { protect } from "../middleware/auth.middleware.js";



const router = express.Router();

router.route("/update-profile").put(protect , updateProfile)

export default router