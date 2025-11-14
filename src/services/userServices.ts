import { createUser, findUserByEmail } from "../repositories/userRepository"
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../utils/jwt";
import { AppError } from "../utils/appError";
import { IUser } from "../schemas/userSchema";

export const signUpUserService = async (user: IUser)=>{
    try{
        const newUser = await createUser(user);
        return newUser;
    }
    
    catch(error:unknown){
        
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
}

export const signInUserService = async (userDetails : IUser)=>{
    try{
    // check if the user already exits or not
        const user = await findUserByEmail(userDetails.email) as IUser;
        if(!user){
            throw{
                status:404,
                message:"User not found"
            }
        }

        // now compare the password
        if(userDetails.password){
        const isPasswordValid = bcrypt.compareSync(userDetails.password,user.password);
        

        if(!isPasswordValid){
            throw{
                status:401,
                message:"invalid password",
            }
        }
        // now generate the token and send it
        const token = generateJwtToken({name: user.name, email:user.email,userId:user._id});
        return token;
        }
    }
    catch(error){
        throw error;
    }

}

export const doesUserExists = async (email:string)=>{
    try{
        const user = await findUserByEmail(email);
        return user;
    }
    catch(error){
        throw error;
    }
}