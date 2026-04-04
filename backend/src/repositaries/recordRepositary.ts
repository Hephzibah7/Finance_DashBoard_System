import Record from "../models/recordModel.js";
import recordType from "../types/recordType.js";

async function createRecord(data:recordType){
    const newRecord=new Record(data);
    await newRecord.save();
}

async function getAllRecord(userId:string){
    const data=await Record.find({ userId: userId}).sort({ date: -1 });
    return data;
}

async function deleteRecord(recordId:string){
    await Record.findByIdAndDelete(recordId);
}
const recordRepositary={
    createRecord:createRecord,
    getAllRecord:getAllRecord,
    deleteRecord:deleteRecord,
}

export default recordRepositary;