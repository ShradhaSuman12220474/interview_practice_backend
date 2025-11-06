import { IUser } from "../schemas/userSchema";
export declare const signUpUserService: (user: IUser) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const signInUserService: (userDetails: IUser) => Promise<string | undefined>;
export declare const doesUserExists: (email: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}) | null | undefined>;
//# sourceMappingURL=userServices.d.ts.map