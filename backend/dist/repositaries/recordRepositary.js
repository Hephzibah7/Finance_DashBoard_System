import { BadRequestError } from "../errors/AppError.js";
import Record from "../models/recordModel.js";
async function createRecord(data) {
    const newRecord = new Record(data);
    await newRecord.save();
}
async function getAllRecord(userId, filters) {
    const data = await Record.find({ userId: userId, ...filters }).sort({ date: -1 });
    return data;
}
async function deleteRecord(recordId) {
    const isExist = await Record.findById(recordId);
    if (!isExist)
        throw new BadRequestError("Record does not Exist");
    await Record.findByIdAndDelete(recordId);
}
async function updateRecord(recordId, data) {
    const isExist = await Record.findById(recordId);
    if (!isExist)
        throw new BadRequestError("Record does not Exist");
    await Record.findByIdAndUpdate(recordId, data, { new: true });
}
const recordRepositary = {
    createRecord: createRecord,
    getAllRecord: getAllRecord,
    deleteRecord: deleteRecord,
    updateRecord: updateRecord
};
export default recordRepositary;
