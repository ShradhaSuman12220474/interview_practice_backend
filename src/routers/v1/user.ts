import express from 'express';
import {getuserProfile, signIn, signUp} from '../../controller/userController';
// import { validate } from '../../validators/zodValidators.js';
// import { zodSignUpSchema } from '../../validators/zodSignUpSchema.js';
// import { zodSignInSchema } from '../../validators/zodSignInSchema.js';
const router = express.Router();


router.get('/profile',getuserProfile);
router.post('/signUp',signUp);
router.post('/signIn',signIn);


export default router;