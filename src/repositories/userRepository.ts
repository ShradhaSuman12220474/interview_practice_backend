import {User} from "../schemas/userSchema";
import { IUser } from "../schemas/userSchema";
import { AppError } from "../utils/appError";

export const findUserByEmail = async(email:string)=>{
    try{
        const user = await User.findOne({email});
        return user;
    }
    catch(error){
        console.log(error);
    }
}

export const findAllUsers = async()=>{
    try{
        const users = await User.find();
        return users;
    }
    catch(error){
        console.log(error);
    }
}

export const createUser = async (user: IUser) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error: unknown) {
    console.error("Failed to register user to the DB:", error);

    // Narrow down the error type
    if (error instanceof Error && "code" in error) {
      const mongoError = error as { code?: number; keyValue?: Record<string, any> };

      // Handle duplicate key error (email or username already exists)
      if (mongoError.code === 11000) {
        const duplicateField = Object.keys(mongoError.keyValue || {})[0];
        const duplicateValue = duplicateField
            ? mongoError.keyValue?.[duplicateField]
            : undefined;

        throw new AppError(
          `User with ${duplicateField} "${duplicateValue}" already exists.`,
          409 // HTTP Conflict
        );
      }
    }

    // Generic fallback error
    throw new AppError("Internal server error while creating user", 500);
  }
}