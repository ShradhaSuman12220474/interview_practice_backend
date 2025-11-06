import express from 'express';
import { generateQuestion } from '../../controller/aiController';

const router = express.Router();


router.post('/generate',generateQuestion);



export default router;