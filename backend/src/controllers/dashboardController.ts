import {Request, Response, NextFunction} from "express"
import dashboardService from "../services/dashboardService.js";

async function getSummary(req:Request, res:Response, next:NextFunction){
    try{
      const data=await dashboardService.getSummary();

    return res.status(200).json({
      success: true,
      data
    });
    }
    catch(error){
        next(error);
    }
}

export default getSummary;