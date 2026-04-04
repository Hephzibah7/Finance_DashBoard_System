import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import { loginValidator } from "../helpers/authValidator.js";
import { PERMISSIONS } from "../utils/permissions.js";
import userController from "../controllers/userController.js";
import { deleteUserValidator, updateRoleValidator } from "../helpers/userValidator.js";

const router=express.Router();
router.post("/",verifyToken, authorize(PERMISSIONS.CREATE_USER), loginValidator, validate, userController.createUser);
router.delete("/:id", verifyToken, authorize(PERMISSIONS.DELETE_USER), deleteUserValidator,validate, userController.deleteUser);
router.patch("/role/:role", verifyToken, authorize(PERMISSIONS.ASSIGN_ROLE), updateRoleValidator, validate, userController.updateRole);
router.patch("/status/:status", verifyToken, authorize(PERMISSIONS.CHANGE_USER_STATUS), validate, userController.updateStatus);

export default router;