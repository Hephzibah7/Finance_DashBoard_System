import { Request, Response, NextFunction } from "express";
import authService from "../services/authService.js";

async function login(req:Request, res:Response, next:NextFunction){
    try{
       const userCredentials=await authService.login(req.body);
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