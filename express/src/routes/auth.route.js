import express from "express"
const router = express.Router();

router.route("/login").get()
router.route("signup").get()
router.route("/logout").get()

export default router