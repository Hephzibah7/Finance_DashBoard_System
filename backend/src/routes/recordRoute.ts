import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import { PERMISSIONS } from "../utils/permissions.js";
import recordController from "../controllers/recordController.js";
import { createRecordValidator, updateRecordValidator, deleteRecordValidator } from "../helpers/recordValidator.js";

const router = express.Router();

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a financial record
 *     description: Create a new income or expense record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *               - category
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1000
 *               type:
 *                 type: string
 *                 example: income
 *               category:
 *                 type: string
 *                 example: FOOD
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-10
 *               notes:
 *                 type: string
 *                 example: Lunch expense
 *     responses:
 *       201:
 *         description: Record created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  verifyToken,
  authorize(PERMISSIONS.CREATE_RECORDS),
  createRecordValidator,
  validate,
  recordController.createRecord
);

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all records
 *     description: Fetch all records with optional filters (type, category, date range)
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by type (income/expense)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date filter
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date filter
 *     responses:
 *       200:
 *         description: Records fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/",
  verifyToken,
  authorize(PERMISSIONS.VIEW_RECORDS),
  recordController.getAllRecord
);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record
 *     description: Delete a record by ID
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  verifyToken,
  authorize(PERMISSIONS.DELETE_RECORDS),
  deleteRecordValidator,
  validate,
  recordController.deleteRecord
);

/**
 * @swagger
 * /api/records/{id}:
 *   patch:
 *     summary: Update a record
 *     description: Update fields of an existing record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.patch(
  "/:id",
  verifyToken,
  authorize(PERMISSIONS.UPDATE_RECORDS),
  updateRecordValidator,
  validate,
  recordController.updateRecord
);

export default router;