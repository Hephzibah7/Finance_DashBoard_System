import { Request, Response, NextFunction } from "express";
import {validationResult} from 'express-validator'
import authRepositary from "../repositaries/authRepositary.js";
import loginType from "../types/loginType.js";
import User from "../models/userModel.js";
import { BadRequestError } from "../errors/AppError.js";

async function login(req:Request, res:Response, next:NextFunction){
    try{
        
        const {email, password}= req.body;
        var data={
            email,
            password
        }
        const userCredentials=await authRepositary.loginUser(data);
        res.status(200).json({
        user:userCredentials,
        success:true,
        message:"Login successful"
       })
    }
    catch(error)
    {
        return next(error);
    }
}

const authController={
    login:login
}

export default authController