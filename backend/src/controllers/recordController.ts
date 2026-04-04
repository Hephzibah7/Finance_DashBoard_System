import {Request, Response, NextFunction} from "express"
import recordRepositary from "../repositaries/recordRepositary.js";
import recordType from "../types/recordType.js";
import { InternalServerError } from "../errors/AppError.js";

async function createRecord(req:Request, res:Response, next:NextFunction){
    try{
        const {amount, type, category, description} = req.body;

        const obj={
            amount,
            type,
            category,
            description,
            date:new Date(),
            userId:req.user
        }

        await recordRepositary.createRecord(obj as recordType);

         res.status(201).json({
        success:true,
        message:"Record created successfully!"
       })

    }
    catch(error){
        next(error);
    }
}

async function getAllRecord(req:Request, res:Response, next:NextFunction){
    try{
        const filters: any={};
        if(req.query.type){
            filters.type=req.query.type
        }
        if(req.query.category){
            filters.category=req.query.category
        }
        if (req.query.startDate && req.query.endDate) {
        filters.date = {
        $gte: new Date(req.query.startDate as string),
        $lte: new Date(req.query.endDate as string)
      };
    }
        const data=await recordRepositary.getAllRecord(req.user as string, filters);
        if(!data) throw new InternalServerError();
        res.status(201).json({
        record:data,
        success:true,
        message:"Record fetched successfully!"
       })
    }
    catch(error){
        next(error);
    }
}

async function deleteRecord(req:Request, res:Response, next:NextFunction){
    try{
        const recordId = req.params.id;
        await recordRepositary.deleteRecord(recordId as string);
         res.status(201).json({
        success:true,
        message:"Record deleted successfully!"
       })
    }
    catch(error){
        next(error);
    }
}

async function updateRecord(req:Request, res:Response,next:NextFunction){
    try{
        const data=req.body;
        const recordId=req.params.id;
        await recordRepositary.updateRecord(recordId as string,data);
         res.status(201).json({
        success:true,
        message:"Record updated successfully!"
       })
    }
    catch(error){
        next(error);
    }
}

const recordController={
    createRecord:createRecord,
    getAllRecord:getAllRecord,
    deleteRecord:deleteRecord,
    updateRecord:updateRecord

}

export default recordController;