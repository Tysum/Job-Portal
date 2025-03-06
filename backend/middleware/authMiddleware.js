import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      return res.status(401).json({ message: "Token is invalid" });
    }
  } else {
    return res.status(401).json({ message: "Token is required" });
  }
};
