import { Company } from "../models/company.js";
import { User } from "../models/user.js";

export const registerCompany = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { name, description, website, location, logo } = req.body;
    if (!name || !description || !website || !location || !logo) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    let company = Company.findOne({ name: name });
    if (company) {
      return res.status(400).json({
        message: "Company already exists, can't register same company",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const newCompany = new Company({
      name: name,
      description,
      website,
      location,
      logo,
      userId: userId,
    });
    await newCompany.save();
    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      company: newCompany,
    });
  } catch (error) {
    next(error);
  }
};

export const getCompany = async (req, res, next) => {
  try {
    const { userId } = req.id;
    const companies = await Company.findById(userId);
    if (!companies) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({
      message: "Company fetched successfully",
      success: true,
      companies: companies,
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const company = await Company.findById(id);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({
      message: "Company fetched successfully",
      success: true,
      company: company,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const { name, description, website, location, logo } = req.body;
    const file = req.file;

    // cloudinary implementation

    const company = await Company.findByIdAndUpdate(
      id,
      { name, description, website, location, logo },
      { new: true }
    );

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company: company,
    });
  } catch (error) {
    next(error);
  }
};
