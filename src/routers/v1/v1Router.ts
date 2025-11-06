import express from 'express';

import userRouter from './user';
import aiRouter from './ai';

const router = express.Router();

router.use('/users',userRouter);
router.use('/ai',aiRouter);

export default router;