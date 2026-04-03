import jwt from "jsonwebtoken";
import {UnauthorizedError } from "../errors/AppError.js";
import {Request, Response, NextFunction} from "express"
import payLoadType from "../types/payLoadType.js";
import requestType from "../types/requestType.js";

const verifyToken=(req:requestType,res:Response,next:NextFunction)=>{
    try{
        const authHeader=req.headers.authorization;
         if (!authHeader || !authHeader.startsWith("Bearer ")) {
         throw new UnauthorizedError("Token is missing");
    }
    const token = authHeader.split(" ")[1];
    const secretKey = "secret_key";
    
    // Verify the token
    const decoded = jwt.verify(token, secretKey) as payLoadType;
    req.user=decoded.userId;
    next();
    }
    catch(error){
        next(error);
    }
}

export default verifyToken;