import mongoose from "mongoose";

export const validateMongoDbId = (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
  } catch (error) {
    throw new Error("Error validating MongoDB ID");
  }
};
