import { Application } from "../models/application.js";
import { Job } from "../models/job.js";

export const applyJobs = async (req, res, next) => {
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

export const getAppliedJobs = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications) {
      return res.status(404).json({
        message: "No applications found.",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicants = async (req, res, next) => {
  try {
    const { jobId } = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { applicationId } = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status not found.",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
      application,
    });
  } catch (error) {
    next(error);
  }
};
