import {Request, Response, NextFunction} from "express"
import recordService from "../services/recordService.js";

async function createRecord(req:Request, res:Response, next:NextFunction){
    try{
        await recordService.createRecord(req.body, req.user as string);
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
       const data=await recordService.getAllRecord(req.query, req.user as string);
        res.status(200).json({
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
        await recordService.deleteRecord(req.params.id as string);
         res.status(200).json({
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
        await recordService.updateRecord(req.body, req.params.id as string);
         res.status(200).json({
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