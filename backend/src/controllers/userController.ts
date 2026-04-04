import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/AppError.js";
import User from "../models/userModel.js";
import userRepositary from "../repositaries/userRepositary.js";
import userType from "../types/userType.js";

async function createUser(req:Request, res:Response, next:NextFunction){
    try{
        const {name, email, password, role} = req.body;
       
        const obj={
            name, email, password, role
        }
        const userData=await userRepositary.createUser(obj as userType);

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
        const {userId}=req.params;
        await userRepositary.deleteUser(userId as string);
         res.status(201).json({
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
        const {userId, role} = req.params;
        const user=userRepositary.updateRole(userId as string,role as string);
        if(!user) throw new BadRequestError("Role could not be updated! Try again later");
        res.status(201).json({
        user:user,
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
        const {userId, status}=req.params;
        const user=userRepositary.updateStatus(userId as string, status as string);
        if(!user) throw new BadRequestError("Status could not be updated! Try again later");
        res.status(201).json({
        user:user,
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
