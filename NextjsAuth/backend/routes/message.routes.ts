import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller";
import isAuth from "../middleware/isAuth";
const router = express.Router();

router.post("/send", isAuth, sendMessage);
router.get("/:id", isAuth, getMessages);

export default router;