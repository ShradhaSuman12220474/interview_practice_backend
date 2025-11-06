import mongoose, { Document } from "mongoose";
export interface IInterview extends Document {
    userId: string;
    role: string;
    level: string;
    type: string;
    techStack: string[];
    questions: {
        question: string;
        answer?: string;
        difficulty?: "easy" | "medium" | "hard";
    }[];
    finalised: boolean;
    coverImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const Interview: mongoose.Model<IInterview, {}, {}, {}, mongoose.Document<unknown, {}, IInterview, {}, {}> & IInterview & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=interviewSchema.d.ts.map