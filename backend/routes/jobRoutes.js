import express from "express";

import {
  creatJob,
  getAllJobs,
  getJobById,
  getAdminJob,
} from "../controller/jobController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, creatJob);
router.get("/all", isAuthenticated, getAllJobs);
router.get("/get/:id", isAuthenticated, getJobById);
router.get("/admin/all", isAuthenticated, getAdminJob);

export default router;
