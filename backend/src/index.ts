import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import { NotFoundError } from "./errors/AppError.js";
import  authRoute  from "./routes/authRoute.js"
import { connectDB } from "./configs/db.js";
import userRoute from "./routes/userRoute.js"
import recordRoute from "./routes/recordRoute.js"

dotenv.config();

const app = express();
app.use(express.json());

const FRONTEND_URL = "http://localhost:3000";

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// ✅ Routes FIRST

app.use('/api', authRoute);
app.use('/api/user', userRoute);
app.use('/api/record', recordRoute);

// 404 AFTER routes
app.use((req, res, next) => {
  next(new NotFoundError(`Cannot ${req.method} ${req.url}`));
});

// ✅ Error handler LAST
app.use(errorHandler);

const port = 9002;

// ✅ Start server AFTER DB
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();