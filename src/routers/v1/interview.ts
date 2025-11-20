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

// /**
//  * @swagger
//  * /api/v1/interview:
//  *   post:
//  *     summary: Create a new interview
//  *     tags: [Interviews]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - role
//  *               - level
//  *               - type
//  *               - techStack
//  *             properties:
//  *               role:
//  *                 type: string
//  *                 description: Job role for the interview
//  *               level:
//  *                 type: string
//  *                 enum: [beginner, intermediate, advanced]
//  *               type:
//  *                 type: string
//  *                 description: Type of interview (e.g., technical, behavioral)
//  *               techStack:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                 description: List of technologies to focus on
//  *               coverImage:
//  *                 type: string
//  *                 format: uri
//  *                 description: URL to an optional cover image
//  *     responses:
//  *       201:
//  *         description: Interview created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                 data:
//  *                   $ref: '#/components/schemas/Interview'
//  *       400:
//  *         description: Invalid input data
//  *       401:
//  *         $ref: '#/components/responses/UnauthorizedError'
//  */
// router.post('', createInterview);

// /**
//  * @swagger
//  * /api/v1/interview/{id}:
//  *   put:
//  *     summary: Update an existing interview
//  *     tags: [Interviews]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Interview ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               role:
//  *                 type: string
//  *               level:
//  *                 type: string
//  *                 enum: [beginner, intermediate, advanced]
//  *               type:
//  *                 type: string
//  *               techStack:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *               coverImage:
//  *                 type: string
//  *                 format: uri
//  *               finalised:
//  *                 type: boolean
//  *     responses:
//  *       200:
//  *         description: Interview updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                 data:
//  *                   $ref: '#/components/schemas/Interview'
//  *       400:
//  *         description: Invalid input data
//  *       401:
//  *         $ref: '#/components/responses/UnauthorizedError'
//  *       404:
//  *         description: Interview not found
//  */
// router.put('/:id', updateInterview);

// /**
//  * @swagger
//  * /api/v1/interview/{id}:
//  *   delete:
//  *     summary: Delete an interview
//  *     tags: [Interviews]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: Interview ID
//  *     responses:
//  *       200:
//  *         description: Interview deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     id:
//  *                       type: string
//  *       401:
//  *         $ref: '#/components/responses/UnauthorizedError'
//  *       404:
//  *         description: Interview not found
//  */
// router.delete('/:id', deleteInterview);

export default router;