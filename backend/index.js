import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./utils/databaseConnection.js";

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

app.listen(PORT, function () {
  dbConnection();
  console.log(`Server listening on port ${PORT}`);
});
