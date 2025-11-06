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