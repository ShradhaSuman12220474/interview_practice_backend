"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveGeneratedQuestions = void 0;
const interviewSchema_1 = require("../schemas/interviewSchema");
const appError_1 = require("../utils/appError");
const saveGeneratedQuestions = async (data) => {
    try {
        const response = await interviewSchema_1.Interview.create(data);
        return response;
    }
    catch (error) {
        console.log(error);
        throw new appError_1.AppError("Filed to save generated Questions", 400);
    }
};
exports.saveGeneratedQuestions = saveGeneratedQuestions;
//# sourceMappingURL=interviewRepository.js.map