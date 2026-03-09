import express from "express";
import { getProfileHandler } from "../api/users/getProfile";
import { updateProfileHandler } from "../api/users/updateProfile";


const router = express.Router()

router.get("/users/:id", getProfileHandler);
router.patch("/users/:id", updateProfileHandler);

export default router;