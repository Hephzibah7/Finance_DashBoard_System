import { Request, Response, NextFunction } from "express";
import userService from "../services/userService.js";

async function createUser(req:Request, res:Response, next:NextFunction){
    try{
        await userService.createUser(req.body);
        res.status(201).json({
        success:true,
        message:"User created successfully!"
       })
    }
    catch(error){
        next(error);
    }
}

async function deleteUser(req:Request, res:Response, next:NextFunction){
    try{
        await userService.deleteUser(req.params.id as string);
         res.status(200).json({
        success:true,
        message:"User deleted successfully!"
       })

    }
    catch(error){
        next(error);
    }
}

async function updateRole(req:Request, res:Response, next:NextFunction){
    try{
       await userService.updateRole(req.params.id as string, req.params.role as string);
        res.status(200).json({
        success:true,
        message:"Role updated successfully!"
       })

    }
    catch(error){
        next(error);
    }
}

async function updateStatus(req:Request, res:Response, next:NextFunction){
    try{
        await userService.updateStatus(req.params.id as string, req.params.status as string);
        res.status(200).json({
        success:true,
        message:"Status updated successfully!"
       })
    }
    catch(error){
        next(error);
    }
}

const userController={
    createUser:createUser,
    deleteUser:deleteUser,
    updateRole:updateRole,
    updateStatus:updateStatus
}

export default userController;
