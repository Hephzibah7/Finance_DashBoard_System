import { Request, Response, NextFunction } from "express";
import {AppError} from "../errors/AppError.js";
import winston from "winston";


const LogErrors = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'app_error.log' })
    ]
  });
    

class ErrorLogger {
    constructor(){}
    async logError(err:Error|AppError){
        console.log('==================== Start Error Logger ===============');
        LogErrors.log({
            private: true,
            level: 'error',
            message: `${new Date()}-${JSON.stringify(err)}`,
            stack:err.stack
            
          });
        console.log('==================== End Error Logger ===============');
        // log error with Logger plugins
      
        return false;
    }

    isTrustError(error:Error|AppError){
        if(error instanceof AppError){
            return error.isOperational;
        }else{
            return false;
        }
    }
}

const errorHandler = async(err:AppError,req:Request,res:Response,next:NextFunction) => {
    
    const errorLogger = new ErrorLogger();

    process.on('uncaughtException', (error) => {
        errorLogger.logError(error);
        if(errorLogger.isTrustError(err)){
            //process exist // need restart
        }
    })
    
    // console.log(err.description, '-------> DESCRIPTION')
    // console.log(err.message, '-------> MESSAGE')
    // console.log(err.name, '-------> NAME')
   if (err) {
  await errorLogger.logError(err);

  // Operational errors (safe)
  if (errorLogger.isTrustError(err)) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Non-operational errors (bugs)
  return  res.status(err.statusCode || 500).json({
    success: false,
    error: { message: err.message }
  })
}

    next();
}

export default  errorHandler;