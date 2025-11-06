"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controller/userController");
// import { validate } from '../../validators/zodValidators.js';
// import { zodSignUpSchema } from '../../validators/zodSignUpSchema.js';
// import { zodSignInSchema } from '../../validators/zodSignInSchema.js';
const router = express_1.default.Router();
router.get('/profile', userController_1.getuserProfile);
router.post('/signUp', userController_1.signUp);
router.post('/signIn', userController_1.signIn);
exports.default = router;
//# sourceMappingURL=user.js.map