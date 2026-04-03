import mongoose, { mongo } from "mongoose";

const roleSchema=new mongoose.Schema({
   name:String,
   permissions:[String]

})

const Role=mongoose.model('Role', roleSchema);

export default Role;