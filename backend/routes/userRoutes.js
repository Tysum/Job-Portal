import express from "express";
import { register } from "../controller/userController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", updateProfile);
