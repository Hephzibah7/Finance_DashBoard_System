import jwt from "jsonwebtoken";
import {UnauthorizedError } from "../errors/AppError.js";
import {Request, Response, NextFunction} from "express"
import payLoadType from "../types/payLoadType.js";


const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    try{
        const authHeader=req.headers.authorization;
         if (!authHeader || !authHeader.startsWith("Bearer ")) {
         throw new UnauthorizedError("Token is missing");
    }
    const token = authHeader.split(" ")[1];
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECREY_KEY as string) as payLoadType;
    req.user=decoded.userId;
    next();
    }
    catch(error){
        next(error);
    }
}

export default verifyToken;