import express from 'express';

import userRouter from './user';
import aiRouter from './ai';
import interviewRouter from './interview';
import feedbackRouter from './feedback';

const router = express.Router();

router.use('/users',userRouter);
router.use('/ai',aiRouter);
router.use('/interview',interviewRouter);
router.use('/feedback', feedbackRouter);


export default router;