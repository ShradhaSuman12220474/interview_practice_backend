import mongoose from "mongoose";
import { Interview } from "../schemas/interviewSchema";
import { InterviewData } from "../services/aiService";
import { AppError } from "../utils/appError";


export const saveGeneratedQuestions = async(data:InterviewData)=>{
    try{
        const response = await Interview.create(data);
        return response;
    }catch(error){
        console.log(error);
        throw new AppError("Filed to save generated Questions", 400);
    }
}


export const getAllInterviews = async(userId: string)=>{
    try{
        const response = await Interview.find({userId});
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