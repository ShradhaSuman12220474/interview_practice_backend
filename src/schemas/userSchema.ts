import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid"; 

// 1️⃣ Define a TypeScript interface for the user data
export interface IUser extends Document {
    _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;

  // optional method types (if you add instance methods later)
  comparePassword?(candidatePassword: string): Promise<boolean>;
}

// 2️⃣ Define the Mongoose schema
const userSchema = new Schema<IUser>(
  {
    //  _id: {
    //   type: String,
    //   default: uuidv4, // ✅ auto-generate a UUID for every user
    //   unique: true,
    //   immutable: true, // prevents modification after creation
    // },
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      validate: {
        validator: function (emailValue: string): boolean {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
        },
        message: "Invalid email format",
      },
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
  },
  { timestamps: true }
);

// 3️⃣ Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this as IUser;

  // only hash if password is new or modified
  if (!user.isModified("password")) return next();

  const SALT_ROUNDS = 9;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  user.password = hashedPassword;
  next();
});

// 4️⃣ Create and export model
export const User = mongoose.model<IUser>("User", userSchema);
