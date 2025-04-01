import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./Database/config.js";
import userRoute from "./Routes/userRoute.js";
import authRoute from "./Routes/authRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

const allowedOrigins = ["http://localhost:5173"]

app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

// Error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

connectDb();

app.listen(port, () => {
  console.log("Server is started and running on the port");
});
