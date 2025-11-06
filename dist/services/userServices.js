"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doesUserExists = exports.signInUserService = exports.signUpUserService = void 0;
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const signUpUserService = async (user) => {
    try {
        const newUser = await (0, userRepository_1.createUser)(user);
        return newUser;
    }
    catch (error) {
        console.log("service layer");
        // console.log("error name",error.name);
        // console.log("error code",error.code);
        // if(error instanceof AppError && error.name === 'MongoServerError' && error.code === 11000){
        //     throw {
        //         status:400,
        //         message:"User with the same username or email already exists",
        //     }
        // }
        throw error;
    }
};
exports.signUpUserService = signUpUserService;
const signInUserService = async (userDetails) => {
    try {
        // check if the user already exits or not
        const user = await (0, userRepository_1.findUserByEmail)(userDetails.email);
        if (!user) {
            throw {
                status: 404,
                message: "User not found"
            };
        }
        // now compare the password
        if (userDetails.password) {
            const isPasswordValid = bcrypt_1.default.compareSync(userDetails.password, user.password);
            if (!isPasswordValid) {
                throw {
                    status: 401,
                    message: "invalid password",
                };
            }
            // now generate the token and send it
            const token = (0, jwt_1.generateJwtToken)({ name: user.name, email: user.email, userId: user._id }, 1);
            return token;
        }
    }
    catch (error) {
        throw error;
    }
};
exports.signInUserService = signInUserService;
const doesUserExists = async (email) => {
    try {
        const user = await (0, userRepository_1.findUserByEmail)(email);
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.doesUserExists = doesUserExists;
//# sourceMappingURL=userServices.js.map