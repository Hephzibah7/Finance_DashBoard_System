import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import authController from "../controllers/authController.js";
import { loginValidator } from "../helpers/authValidator.js";

const router=express.Router();
router.post("/login", loginValidator, validate, authController.login);

export default router;