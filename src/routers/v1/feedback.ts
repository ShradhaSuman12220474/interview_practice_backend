import express from 'express';
import { generateFeedback, getFeedback } from '../../controller/feedback';

const router = express.Router();

router.post('/generate',generateFeedback);
router.get('/:userId/:interviewId',getFeedback);


export default router;