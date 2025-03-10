import { Application } from "../models/application.js";
import { Job } from "../models/job.js";

export const aaplyJob = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { jobId } = req.params.id;

    if (!jobId) {
      return res.status(404).json({
        message: "Job Id is required.",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }

    const isJobExist = await Job.findById(jobId);
    if (!isJobExist) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    const newApplication = new Application({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    await newApplication.save();
    return res.status(201).json({
      message: "Application submitted successfully.",
      success: true,
      application: newApplication,
    });
  } catch (error) {
    next(error);
  }
};
