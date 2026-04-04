import mongoose from "mongoose";
import { ENTERTAINMENT, EXPENSE, FOOD, HEALTH, INCOME } from "../utils/constants.js";


const recordSchema=new mongoose.Schema({
     userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    amount:String,
    type: {
        type: String,
        enum: [INCOME, EXPENSE],
      },
    category:{
        type:String,
        enum:[FOOD, ENTERTAINMENT, HEALTH]
    },
    date:{
        type:Date
    },
    description:String


})

const Record=mongoose.model('Record', recordSchema);

export default Record;