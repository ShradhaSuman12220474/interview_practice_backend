import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    password: string;
    comparePassword?(candidatePassword: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=userSchema.d.ts.map