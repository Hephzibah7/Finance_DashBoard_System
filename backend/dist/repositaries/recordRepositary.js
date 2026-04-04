import Record from "../models/recordModel.js";
async function createRecord(data) {
    const newRecord = new Record(data);
    await newRecord.save();
}
async function getAllRecord(userId) {
    const data = await Record.find({ userId: userId }).sort({ date: -1 });
    return data;
}
async function deleteRecord(recordId) {
    await Record.findByIdAndDelete(recordId);
}
const recordRepositary = {
    createRecord: createRecord,
    getAllRecord: getAllRecord,
    deleteRecord: deleteRecord,
};
export default recordRepositary;
