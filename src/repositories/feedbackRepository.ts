import mongoose from "mongoose";
import { Interview } from "../schemas/interviewSchema";
import { InterviewData } from "../services/aiService";
import { AppError } from "../utils/appError";
import Feedback, { IFeedback } from "../schemas/feedbackSchema";
import { IFeedbackInput } from "../services/feedbackService";


export const saveGeneratedFeedback = async(data:IFeedbackInput)=>{
    try{
        const response = await Feedback.create(data);
        return response;
    }catch(error){
        console.log(error);
        throw new AppError("Filed to save generated Feedback", 400);
    }
}


export const getAllFeedback = async(interviewId:string,userId: string)=>{
    try{
        const response = await Feedback.find({userId:userId, interviewId:interviewId});
        return response;
    }
    catch(error){
        console.log(error);
        throw new AppError("Unable to fetch the data", 400);
    }
}

export const getInterviewById = async(id:string)=>{
    try{
        const objectId = new mongoose.Types.ObjectId(id);
        const response = await Interview.findOne({_id : objectId});

        if (!response) {
            throw new AppError("Interview not found", 404);
        }
        return response;
    }catch(error){
        console.log(error);
        throw new AppError("failed to get the interview data by Id", 400);
    }

}