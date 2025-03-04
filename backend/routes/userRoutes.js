import express from "express";
import { register } from "../controller/userController";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile/update", isAuthenticated, updateProfile);

export default router;
