import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategoryScore {
  name:
    | "Communication Skills"
    | "Technical Knowledge"
    | "Problem Solving"
    | "Cultural Fit"
    | "Confidence and Clarity";
  score: number;
  comment: string;
}

export interface IFeedback extends Document {
  interviewId: string;
  userId:string;

  totalScore: number;
  categoryScores: ICategoryScore[];

  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;

  createdAt: Date;
}

const categoryScoreSchema = new Schema<ICategoryScore>(
  {
    name: {
      type: String,
      enum: [
        "Communication Skills",
        "Technical Knowledge",
        "Problem Solving",
        "Cultural Fit",
        "Confidence and Clarity",
      ],
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const feedbackSchema = new Schema<IFeedback>(
  {
    interviewId: {
      type: String,
      ref: "Interview",
      required: true,
    },

    userId: {
      type: String,
      ref: "User",
      required: true,
    },

    totalScore: {
      type: Number,
      required: true,
    },

    categoryScores: {
      type: [categoryScoreSchema],
      required: true,
      validate: {
        validator: (v: ICategoryScore[]) => v.length === 5,
        message: "categoryScores must contain exactly 5 items.",
      },
    },

    strengths: {
      type: [String],
      default: [],
    },

    areasForImprovement: {
      type: [String],
      default: [],
    },

    finalAssessment: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const Feedback: Model<IFeedback> = mongoose.model<IFeedback>("Feedback", feedbackSchema);

export default Feedback;
