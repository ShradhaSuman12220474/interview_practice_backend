"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiController_1 = require("../../controller/aiController");
const router = express_1.default.Router();
router.post('/generate', aiController_1.generateQuestion);
exports.default = router;
//# sourceMappingURL=ai.js.map