import Record from "../models/recordModel.js";
import recordType from "../types/recordType.js";

async function createRecord(data:recordType){
    const newRecord=new Record(data);
    await newRecord.save();
}

async function getAllRecord(userId:string, filters:any){
    const data=await Record.find({ userId: userId, ...filters}).sort({ date: -1 });
    return data;
}

async function deleteRecord(recordId:string){
    await Record.findByIdAndDelete(recordId);
}
async function updateRecord(recordId:string, data:any){
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