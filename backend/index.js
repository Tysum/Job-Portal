import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./utils/databaseConnection.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

dotenv.config({});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/company", companyRoutes);

app.listen(PORT, function () {
  dbConnection();
  console.log(`Server listening on port ${PORT}`);
});
