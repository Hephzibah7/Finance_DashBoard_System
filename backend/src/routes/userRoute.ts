import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import { PERMISSIONS } from "../utils/permissions.js";
import userController from "../controllers/userController.js";
import { createUserValidator, deleteUserValidator, updateRoleValidator } from "../helpers/userValidator.js";

const router = express.Router();

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     description: Admin can create a new user and assign a role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 example: ANALYST
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  verifyToken,
  authorize(PERMISSIONS.CREATE_USER),
  createUserValidator,
  validate,
  userController.createUser
);

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Admin can delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:id",
  verifyToken,
  authorize(PERMISSIONS.DELETE_USER),
  deleteUserValidator,
  validate,
  userController.deleteUser
);

/**
 * @swagger
 * /api/user/{id}/role/{role}:
 *   patch:
 *     summary: Update user role
 *     description: Assign or update a user's role
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *         description: Role name (ADMIN, ANALYST, VIEWER)
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Invalid role or user
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/:id/role/:role",
  verifyToken,
  authorize(PERMISSIONS.ASSIGN_ROLE),
  updateRoleValidator,
  validate,
  userController.updateRole
);

/**
 * @swagger
 * /api/user/{id}/status/{status}:
 *   patch:
 *     summary: Update user status
 *     description: Activate or deactivate a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: Status (active/inactive)
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Invalid status or user
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/:id/status/:status",
  verifyToken,
  authorize(PERMISSIONS.CHANGE_USER_STATUS),
  validate,
  userController.updateStatus
);

export default router;