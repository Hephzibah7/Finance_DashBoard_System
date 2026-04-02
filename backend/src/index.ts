// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";





dotenv.config();  

const app = express();
app.use(express.json());


const FRONTEND_URL = "http://localhost:3000";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Connect to MongoDB

connectDB();



//errorHandler should be registered last
// app.use(errorHandler);

// ✅ Start the server
const port = 9002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
