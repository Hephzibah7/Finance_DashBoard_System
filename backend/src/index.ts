import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import { NotFoundError } from "./errors/AppError.js";
import  authRoute  from "./routes/authRoute.js"
import { connectDB } from "./configs/db.js";
import userRoute from "./routes/userRoute.js"
import recordRoute from "./routes/recordRoute.js"
import dashboardRoute from "./routes/dashboardRoute.js"
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./configs/swagger.js";
import redisClient from "./configs/redis.js";
import testRoutes from "./routes/redisRoute.js"
dotenv.config();


const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({
  origin: "*",
  credentials: true,
}));

// ✅ Routes FIRST

app.use('/api', authRoute);
app.use('/api/user', userRoute);
app.use('/api/record', recordRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('',testRoutes);

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
    await redisClient.connect();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();