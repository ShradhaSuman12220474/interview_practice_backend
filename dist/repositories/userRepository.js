"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findAllUsers = exports.findUserByEmail = void 0;
const userSchema_1 = require("../schemas/userSchema");
const appError_1 = require("../utils/appError");
const findUserByEmail = async (email) => {
    try {
        const user = await userSchema_1.User.findOne({ email });
        return user;
    }
    catch (error) {
        console.log(error);
    }
};
exports.findUserByEmail = findUserByEmail;
const findAllUsers = async () => {
    try {
        const users = await userSchema_1.User.find();
        return users;
    }
    catch (error) {
        console.log(error);
    }
};
exports.findAllUsers = findAllUsers;
const createUser = async (user) => {
    try {
        const newUser = await userSchema_1.User.create(user);
        return newUser;
    }
    catch (error) {
        console.error("Failed to register user to the DB:", error);
        // Narrow down the error type
        if (error instanceof Error && "code" in error) {
            const mongoError = error;
            // Handle duplicate key error (email or username already exists)
            if (mongoError.code === 11000) {
                const duplicateField = Object.keys(mongoError.keyValue || {})[0];
                const duplicateValue = duplicateField
                    ? mongoError.keyValue?.[duplicateField]
                    : undefined;
                throw new appError_1.AppError(`User with ${duplicateField} "${duplicateValue}" already exists.`, 409 // HTTP Conflict
                );
            }
        }
        // Generic fallback error
        throw new appError_1.AppError("Internal server error while creating user", 500);
    }
};
exports.createUser = createUser;
//# sourceMappingURL=userRepository.js.map