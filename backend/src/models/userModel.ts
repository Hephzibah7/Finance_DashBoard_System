import mongoose, { mongo } from "mongoose";

const userSchema=new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    },
    status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }

})

const User=mongoose.model('User', userSchema);

export default User;