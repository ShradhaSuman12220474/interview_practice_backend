"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import postRouter from './post.js';
// import userRouter from './user.js';
const v1Router_1 = __importDefault(require("./v1/v1Router"));
const router = express_1.default.Router();
router.use('/v1', v1Router_1.default);
// router.use('/posts',postRouter);
// router.use('/users',userRouter);
exports.default = router;
//# sourceMappingURL=apiRouter.js.map