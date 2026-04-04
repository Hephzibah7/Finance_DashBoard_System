import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import getSummary from "../controllers/dashboardController.js";
import { PERMISSIONS } from "../utils/permissions.js";
const router = express.Router();
router.get("/", verifyToken, authorize(PERMISSIONS.VIEW_SUMMARY), validate, getSummary);
export default router;
