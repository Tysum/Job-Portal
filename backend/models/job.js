import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    salary: { type: Number },
    location: { type: String },
    jobtype: { type: String, required: true },
    experienceLevel: {
      type: Number,
      required: true,
    },
    NumberOfPositions: { type: Number, required: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    ],
  },
  { timestamps: true }
);
export const Job = mongoose.model("Job", jobSchema);
