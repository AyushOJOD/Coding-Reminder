import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./data/database.js";
import authRoutes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/problem", problemRoutes);

app.use("/", (req, res) => {
  res.send("Server is working");
});

const server = app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

connectDB().catch(console.error);
