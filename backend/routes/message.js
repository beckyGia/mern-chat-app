import express from "express";
import { sendMessage, getMessages } from "../controllers.js/message.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

// Declare messageRoutes and then export it
const messageRoutes = router;

export default messageRoutes;
