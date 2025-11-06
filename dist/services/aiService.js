"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateService = void 0;
const google_1 = require("@ai-sdk/google");
const ai_1 = require("ai");
const interviewRepository_1 = require("../repositories/interviewRepository");
const generateService = async (data) => {
    try {
        const { type, role, level, techStack, amount, userId } = data;
        console.log("-----------------");
        const { text: questions } = await (0, ai_1.generateText)({
            model: (0, google_1.google)("gemini-2.0-flash-001"),
            prompt: `Prepare questions for a job interview.
                The job role is ${role}.
                The job experience level is ${level}.
                The tech stack used in the job is: ${techStack}.
                The focus between behavioural and technical questions should lean towards: ${type}.
                The amount of questions required is: ${amount}.
                Please return only the questions, without any additional text.
                The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
                Return the questions formatted like this:
                questions: {
                    question: string;
                    answer?: string;
                    difficulty?: "easy" | "medium" | "hard";
                }[];
                
                
                Thank you! <3
            `,
        });
        console.log(questions);
        let cleanedQuestions = questions.trim();
        // remove Markdown code fences (```json ... ```)
        if (cleanedQuestions.startsWith("```")) {
            cleanedQuestions = cleanedQuestions.replace(/```(json)?/g, "").trim();
        }
        const parsed = JSON.parse(cleanedQuestions);
        const questionsArray = parsed.questions || []; // safely get inner array
        const interview = {
            role,
            type,
            level,
            techStack,
            amount,
            finalised: true,
            questions: questionsArray,
            userId,
            coverImage: "",
        };
        const response = await (0, interviewRepository_1.saveGeneratedQuestions)(interview);
        return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.generateService = generateService;
//# sourceMappingURL=aiService.js.map