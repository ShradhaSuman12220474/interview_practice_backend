import mongoose, { Schema, Document, Types } from "mongoose";

// Define TypeScript interface for Interview
export interface IInterview extends Document {
  userId: string; // reference to User
  role: string;
  level: string;
  type:string;
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

// Define Mongoose schema
const interviewSchema = new Schema<IInterview>(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    type:{
        type:String,
        required:true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    techStack: {
      type: [String],
      default: [],
    },
    questions: [
      {
        question: { type: String, required: true },
        answer: { type: String },
        difficulty: {
          type: String,
          enum: ["easy", "medium", "hard"],
          default: "medium",
        },
      },
    ],
    finalised: {
      type: Boolean,
      default: false,
    },
    coverImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Create and export model
export const Interview = mongoose.model<IInterview>("Interview", interviewSchema);
