import { generateObject } from "ai";
import { getAllInterviews, getInterviewById } from "../repositories/interviewRepository";
import { IInterview } from "../schemas/interviewSchema";
import { google } from "@ai-sdk/google";
import {z} from 'zod';
import { getAllFeedback, saveGeneratedFeedback } from "../repositories/feedbackRepository";
import { ICategoryScore } from "../schemas/feedbackSchema";

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface generateFeedbackBody{
    interviewId:string;
    userId: string;
    transcript:SavedMessage[];
};

export interface IFeedbackInput {
  interviewId: string;
  userId: string;
  totalScore: number;
  categoryScores: ICategoryScore[];
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
}


export const feedbackSchema = z.object({
  totalScore: z.number(),

  // FIXED: Gemini-compatible array schema (no tuple)
  categoryScores: z.array(
    z.object({
      name: z.enum([
        "Communication Skills",
        "Technical Knowledge",
        "Problem Solving",
        "Cultural Fit",
        "Confidence and Clarity",
      ]),
      score: z.number(),
      comment: z.string(),
    })
  ).length(5),  // Enforces exactly 5 categories

  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const generateFeedbackService = async ({interviewId, userId, transcript}: generateFeedbackBody)=>{
    try{
        console.log(interviewId);
        console.log(userId);
        console.log(transcript);

        const formattedTranscript = transcript
        .map((sentence:{role:string; content:string;})=>(
            `-${sentence.role}: ${sentence.content}\n`
            )).join('');

        console.log("formated data ============>",formattedTranscript);

        
        const {object : {totalScore, categoryScores, strengths,areasForImprovement, finalAssessment}} = await generateObject({
            model: google("gemini-2.0-flash-001"),
            schema:feedbackSchema,
            messages: [
                {
                    role: "system",
                    content:
                    "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories."
                },
            {
                role: "user",
                content: `
                    You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.

                    Transcript:
                    ${formattedTranscript}

                    Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
                    - **Communication Skills**: Clarity, articulation, structured responses.
                    - **Technical Knowledge**: Understanding of key concepts for the role.
                    - **Problem-Solving**: Ability to analyze problems and propose solutions.
                    - **Cultural & Role Fit**: Alignment with company values and job role.
                    - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
                    `
                }
                ]
            });

        const feedback:IFeedbackInput = {
            interviewId: interviewId,
            userId: userId,
            totalScore:totalScore,
            categoryScores: categoryScores,
            strengths:strengths,
            areasForImprovement:areasForImprovement,
            finalAssessment:finalAssessment,
        };
        console.log(feedback);
        const data = await saveGeneratedFeedback(feedback);
        return data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
};

export const getFeedbackService = async(interviewId:string, userId:string) =>{
    try{
        const data = await getAllFeedback(interviewId, userId);
        return data;
    }
    catch(error){
        throw error;
    }
}