import { Router } from "express";
import { signup, verifyOtp, login } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);

export default router;