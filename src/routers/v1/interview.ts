import express from 'express';
import { getAllInterviews, getInterviewById } from '../../controller/interviewController';

// import { validate } from '../../validators/zodValidators.js';
// import { zodSignUpSchema } from '../../validators/zodSignUpSchema.js';
// import { zodSignInSchema } from '../../validators/zodSignInSchema.js';
const router = express.Router();


router.get('',getAllInterviews);
router.get('/:id', getInterviewById);


export default router;