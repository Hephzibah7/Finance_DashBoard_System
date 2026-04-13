import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import validate from "../middlewares/validate.js";
import getSummary from "../controllers/dashboardController.js";
import { PERMISSIONS } from "../utils/permissions.js";

const router = express.Router();

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     description: Returns financial summary including total income, expenses, net balance, category-wise totals, recent activity, and monthly trends.
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: object
 *                   properties:
 *                     totalIncome:
 *                       type: number
 *                       example: 50000
 *                     totalExpense:
 *                       type: number
 *                       example: 20000
 *                     netBalance:
 *                       type: number
 *                       example: 30000
 *                 category:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: FOOD
 *                       total:
 *                         type: number
 *                         example: 5000
 *                 recent:
 *                   type: array
 *                   items:
 *                     type: object
 *                 monthly:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized Error (invalid or missing token)
 *       403:
 *         description: Forbidden Error (insufficient permissions)
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/",
  verifyToken,
  authorize(PERMISSIONS.VIEW_SUMMARY),
  validate,
  getSummary
);

export default router;