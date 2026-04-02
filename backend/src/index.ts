// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import { NotFoundError } from "./errors/AppError.js";

dotenv.config();  

import { connectDB } from "./configs/db.js";

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

console.log(process.env.DATABASE_URL);
connectDB();


// Handle 404 (must be before error handler)
app.use((req, res, next) => {
  const error = new NotFoundError(`Cannot ${req.method} ${req.url}`)
  next(error);
  
})

//errorHandler should be registered last
app.use(errorHandler);

// ✅ Start the server
const port = 9002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
