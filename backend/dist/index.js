// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./configs/db.js";
const app = express();
app.use(express.json());
const FRONTEND_URL = "http://localhost:3000";
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
// ✅ Connect to MongoDB
console.log(process.env.DATABASE_URL);
connectDB();
//errorHandler should be registered last
// app.use(errorHandler);
// ✅ Start the server
const port = 9002;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
