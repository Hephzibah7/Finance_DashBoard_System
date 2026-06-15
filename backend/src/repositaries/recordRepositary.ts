import { BadRequestError } from "../errors/AppError.js";
import Record from "../models/recordModel.js";
import recordType from "../types/recordType.js";
import redisClient from "../configs/redis.js";

async function createRecord(data:recordType){
    const newRecord=await new Record(data);
    await newRecord.save();
    await redisClient.del("dashboard-summary");
}

async function getAllRecord(userId:string, filters:any){

    const data=await Record.find({ userId: userId, ...filters}).sort({ date: -1 });
    return data;
}

async function deleteRecord(recordId:string){
    const isExist = await Record.findById(recordId);
    if(!isExist) throw new BadRequestError("Record does not Exist");
    await redisClient.del("dashboard-summary");
    await Record.findByIdAndDelete(recordId);
}
async function updateRecord(recordId:string, data:any){
    
     const isExist = await Record.findById(recordId);
    if(!isExist) throw new BadRequestError("Record does not Exist");
    await redisClient.del("dashboard-summary");
    await Record.findByIdAndUpdate(recordId,
        data,
        {new:true}
    )
}
const recordRepositary={
    createRecord:createRecord,
    getAllRecord:getAllRecord,
    deleteRecord:deleteRecord,
    updateRecord:updateRecord
}

export default recordRepositary;