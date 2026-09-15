import express from "express";
import { 
    getAllContects ,
    getChatPartners ,
    getMessagesByUserId ,
    sendMessage
} from "../controller/message.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express();

router.use(protect)

router.route("/contects").get(  getAllContects)
router.route("/chat").get( getChatPartners)
router.route("/send/:id").post( sendMessage)
router.route("/:id").get( getMessagesByUserId)



export default router;