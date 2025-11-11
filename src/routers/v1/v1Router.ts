import express from 'express';

import userRouter from './user';
import aiRouter from './ai';
import interviewRouter from './interview';

const router = express.Router();

router.use('/users',userRouter);
router.use('/ai',aiRouter);
router.use('/interview',interviewRouter);


export default router;