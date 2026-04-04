import mongoose from "mongoose";
import { ENTERTAINMENT, EXPENSE, FOOD, HEALTH, INCOME, INVESTMENT, PROPERTY, SALARY } from "../utils/constants.js";


const recordSchema=new mongoose.Schema({
     userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    amount:Number,
    type: {
        type: String,
        enum: [INCOME, EXPENSE],
      },
    category:{
        type:String,
        enum:[FOOD, ENTERTAINMENT, HEALTH, SALARY, PROPERTY, INVESTMENT]
    },
    date:{
        type:Date
    },
    description:String


})

const Record=mongoose.model('Record', recordSchema);

export default Record;