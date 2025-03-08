import { Job } from "../models/job.js";

export const creatJob = async (req, resizeBy, next) => {
  try {
    const { userId } = req.user;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobtype,
      experienceLevel,
      NumberOfPositions,
      companyId,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobtype ||
      !experienceLevel ||
      !NumberOfPositions ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const newJob = new Job({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobtype,
      experienceLevel,
      NumberOfPositions,
      company: companyId,
      createdBy: userId,
    });

    return res.status(201).json({
      message: "new Job posted successfully",
      newJob,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const JobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "Applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminJob = async (req, res, next) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdBy: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};
