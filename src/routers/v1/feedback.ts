import express from 'express';
import { generateFeedback, getFeedback } from '../../controller/feedback';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Interview feedback generation and retrieval
 */

/**
 * @swagger
 * /api/v1/feedback/generate:
 *   post:
 *     summary: Generate AI feedback for an interview
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - interviewId
 *               - questions
 *             properties:
 *               interviewId:
 *                 type: string
 *                 description: ID of the interview to generate feedback for
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *                     difficulty:
 *                       type: string
 *                       enum: [easy, medium, hard]
 *     responses:
 *       200:
 *         description: Feedback generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Invalid input data
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Interview not found or no feedback available
 */
router.post('/generate', generateFeedback);

/**
 * @swagger
 * /api/v1/feedback/{userId}/{interviewId}:
 *   get:
 *     summary: Get feedback for a specific interview
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user who owns the feedback
 *       - in: path
 *         name: interviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the interview
 *     responses:
 *       200:
 *         description: Feedback retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Feedback'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Not authorized to access this feedback
 *       404:
 *         description: Feedback not found
 */
router.get('/:userId/:interviewId', getFeedback);

export default router;