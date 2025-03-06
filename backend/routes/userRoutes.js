import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controller/userController.js"; // ✅ Ensure '.js' is present

import { isAuthenticated } from "../middleware/authMiddleware.js"; // Ensure .js extension

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile/update", isAuthenticated, updateProfile);

export default router;
