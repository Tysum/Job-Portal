import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (res, req, next) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;
    if (!name || !email || !password || !phoneNumber || !role) {
      return res
        .status(400)
        .json({ message: "All field are required", success: false });
    }

    const user = await User.findOne({
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      role: role,
    });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      res.status(400).json({ message: "Fields are missing" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (role !== user.role) {
      return res
        .status(401)
        .json({ message: "Account does not exist with current role" });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    return res
      .status(200)
      .cookies("token", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const logout = async (res, req, next) => {
  try {
    res.clearCookie("token", { path: "/" });
    return res
      .status(200)
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { name, bio, skills, education, experience, projects, resume } =
      req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          profile: {
            bio,
            skills,
            education,
            experience,
            projects,
            resume,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
