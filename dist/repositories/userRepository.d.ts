import { IUser } from "../schemas/userSchema";
export declare const findUserByEmail: (email: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}) | null | undefined>;
export declare const findAllUsers: () => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
})[] | undefined>;
export declare const createUser: (user: IUser) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}>;
//# sourceMappingURL=userRepository.d.ts.map