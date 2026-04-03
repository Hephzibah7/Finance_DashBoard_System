
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel.js";
import userType from "../types/userType.js";
import { ForbiddenError } from "../errors/AppError.js";
import { ADMIN } from "../utils/constants.js";

const authorize = (requiredPermission:string) => {
  return async (req:Request, res:Response, next:NextFunction) => {

    const user = await User.findById(req.user) as userType;

    if(user.role.name==ADMIN){
      return next();
    }

    // Check inactive user
    if (user.status === 'inactive') {
      throw new ForbiddenError("User is inactive");
    }

    // Check permission
    if (!user.role.permissions.includes(requiredPermission)) {
      throw new ForbiddenError("Access Denied");
    }

    next();
  };
};

export default authorize;