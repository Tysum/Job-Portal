import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: { type: [String] },
      education: { type: [String] },
      experience: { type: [String] },
      projects: { type: [String] },
      resume: { type: [String] },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
      profilePhoto: { type: String, default: "" },
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
