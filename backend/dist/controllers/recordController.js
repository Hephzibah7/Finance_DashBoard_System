import recordRepositary from "../repositaries/recordRepositary.js";
import { InternalServerError } from "../errors/AppError.js";
async function createRecord(req, res, next) {
    try {
        const { amount, type, category, description } = req.body;
        const obj = {
            amount,
            type,
            category,
            description,
            date: new Date(),
            userId: req.user
        };
        await recordRepositary.createRecord(obj);
        res.status(201).json({
            success: true,
            message: "Record created successfully!"
        });
    }
    catch (error) {
        next(error);
    }
}
async function getAllRecord(req, res, next) {
    try {
        const filters = {};
        if (req.query.type) {
            filters.type = req.query.type;
        }
        if (req.query.category) {
            filters.category = req.query.category;
        }
        if (req.query.startDate && req.query.endDate) {
            filters.date = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            };
        }
        const data = await recordRepositary.getAllRecord(req.user, filters);
        if (!data)
            throw new InternalServerError();
        res.status(200).json({
            record: data,
            success: true,
            message: "Record fetched successfully!"
        });
    }
    catch (error) {
        next(error);
    }
}
async function deleteRecord(req, res, next) {
    try {
        const recordId = req.params.id;
        await recordRepositary.deleteRecord(recordId);
        res.status(200).json({
            success: true,
            message: "Record deleted successfully!"
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateRecord(req, res, next) {
    try {
        const data = req.body;
        const recordId = req.params.id;
        await recordRepositary.updateRecord(recordId, data);
        res.status(200).json({
            success: true,
            message: "Record updated successfully!"
        });
    }
    catch (error) {
        next(error);
    }
}
const recordController = {
    createRecord: createRecord,
    getAllRecord: getAllRecord,
    deleteRecord: deleteRecord,
    updateRecord: updateRecord
};
export default recordController;
