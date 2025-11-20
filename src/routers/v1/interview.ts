import express from 'express';
import { getAllInterviews, getInterviewById, } from '../../controller/interviewController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Interviews
 *   description: Interview management endpoints
 */

/**
 * @swagger
 * /api/v1/interview:
 *   get:
 *     summary: Get all interviews for the authenticated user
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of interviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Interview'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('', getAllInterviews);

/**
 * @swagger
 * /api/v1/interview/{id}:
 *   get:
 *     summary: Get a specific interview by ID
 *     tags: [Interviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Interview ID
 *     responses:
 *       200:
 *         description: Interview details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Interview'
 *       404:
 *         description: Interview not found
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:id', getInterviewById);


export default router;