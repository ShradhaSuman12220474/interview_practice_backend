import { getAllInterviews, getInterviewById } from "../repositories/interviewRepository";
import { IInterview } from "../schemas/interviewSchema";


export const getAllInterviewsService = async (userId:string)=>{
    try{
        const data = await getAllInterviews(userId);
        return data;
    }
    catch(error){
        throw error;
    }
};

export const getInterviewByIdService = async(id:string) =>{
    try{
        const data = await getInterviewById(id);
        return data;
    }
    catch(error){
        throw error;
    }
}