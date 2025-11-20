import express from 'express';
import { generateQuestion } from '../../controller/aiController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: AI-powered interview question generation
 */

/**
 * @swagger
 * /api/v1/ai/generate:
 *   post:
 *     summary: Generate interview questions using AI
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - level
 *               - techStack
 *             properties:
 *               role:
 *                 type: string
 *                 description: Job role to generate questions for (e.g., 'Frontend Developer', 'Data Scientist')
 *               level:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced]
 *                 description: Experience level of the candidate
 *               techStack:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of technologies to include in questions
 *               count:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *                 default: 5
 *                 description: Number of questions to generate
 *               type:
 *                 type: string
 *                 enum: [technical, behavioral, system-design, all]
 *                 default: 'all'
 *                 description: Type of questions to generate
 *     responses:
 *       200:
 *         description: Questions generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           question:
 *                             type: string
 *                           type:
 *                             type: string
 *                             enum: [technical, behavioral, system-design]
 *                           difficulty:
 *                             type: string
 *                             enum: [easy, medium, hard]
 *                           topic:
 *                             type: string
 *                           exampleAnswer:
 *                             type: string
 *                             description: Sample answer or approach
 *       400:
 *         description: Invalid input parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       429:
 *         description: Too many requests - rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Rate limit exceeded. Please try again later.'
 */
router.post('/generate', generateQuestion);

export default router;