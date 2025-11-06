import { IInterview } from "../schemas/interviewSchema";
export interface InterviewData {
    role: string;
    type: string;
    level: string;
    techStack: string[];
    questions: {
        question: string;
        answer?: string;
        difficulty?: "easy" | "medium" | "hard";
    }[];
    userId: string;
    amount: number;
    finalised: boolean;
    coverImage: string;
}
export declare const generateService: (data: InterviewData) => Promise<import("mongoose").Document<unknown, {}, IInterview, {}, {}> & IInterview & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
//# sourceMappingURL=aiService.d.ts.map