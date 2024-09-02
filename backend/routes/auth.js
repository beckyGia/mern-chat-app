import express from "express";
import { signup, login, logout } from "../controllers.js/auth.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

// Declare authRoutes and then export it
const authRoutes = router;

export default authRoutes;
