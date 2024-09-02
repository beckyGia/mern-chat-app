import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers.js/user.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

// Declare userRoutes and then export it
const userRoutes = router;

export default userRoutes;
