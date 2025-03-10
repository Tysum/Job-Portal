import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  applyJobs,
  getAppliedJobs,
  getApplicants,
  updateStatus,
} from "../controller/applicationController.js";

const router = express.Router();

router.post("/apply", isAuthenticated, applyJobs);
router.get("/get", isAuthenticated, getAppliedJobs);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.put("/status/:id/update", isAuthenticated, updateStatus);

export default router;
