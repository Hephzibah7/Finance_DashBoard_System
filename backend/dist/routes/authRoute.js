import express from "express";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import authController from "../controllers/authController.js";
import { loginValidator } from "../helpers/authValidator.js";
const router = express.Router();
router.post("/login", authorize, loginValidator, validate, authController.login);
export default router;
