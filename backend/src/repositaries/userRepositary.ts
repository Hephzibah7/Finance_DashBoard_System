import { Request, Response, NextFunction } from "express";
import userType from "../types/userType.js";
import User from "../models/userModel.js";
import { BadRequestError } from "../errors/AppError.js";
import bcrypt from "bcrypt"
import { ObjectId } from "mongoose";
import Role from "../models/roleModel.js";

async function createUser(data:userType){
    const {name, email, password, role}=data;
    const isExist = await User.findOne({email});
    if(isExist) throw new BadRequestError("User already Exists");
    const roleData = await Role.findOne({name:role});
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser=new User({name, email, password:hashedPassword, role:roleData!._id});
    const savedUser=await newUser.save();
}

async function deleteUser(userId:string){
    await User.findByIdAndDelete(userId);
}

async function updateRole(userId:string, role:string){
    const roleData=await Role.findOne({name:role});
    const user=await User.findByIdAndUpdate(userId, 
        {role:roleData?._id},
        {new:true}
    )
    return user;
}

async function updateStatus(userId:string, status:string){
    const user=await User.findByIdAndUpdate(userId,
        {status:status},
        {new:true}
    )
    return user;
}

const userRepositary={
    createUser:createUser,
    deleteUser:deleteUser,
    updateRole:updateRole,
    updateStatus:updateStatus
}

export default userRepositary;