import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controller/userController.js"; // ✅ Ensure '.js' is present

import { isAuthenticated } from "../middleware/authMiddleware.js"; // Ensure .js extension

const router = express.Router();

router.post("/register", isAuthenticated, register);
router.post("/login", isAuthenticated, login);
router.post("/logout", isAuthenticated, logout);
router.put("/profile/update", isAuthenticated, updateProfile);

export default router;
