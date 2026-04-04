import recordRepositary from "../repositaries/recordRepositary.js";
import recordType from "../types/recordType.js";
import { InternalServerError } from "../errors/AppError.js";

async function createRecord(body:any, userId:string){
    const {amount, type, category, description} = body;

        const obj={
            amount,
            type,
            category,
            description,
            date:new Date(),
            userId
        }

        await recordRepositary.createRecord(obj as recordType);
}

async function getAllRecord(query:any, recordId:string){
     const filters: any={};
            if(query.type){
                filters.type=query.type
            }
            if(query.category){
                filters.category=query.category
            }
            if (query.startDate && query.endDate) {
            filters.date = {
            $gte: new Date(query.startDate as string),
            $lte: new Date(query.endDate as string)
          };
        }
            const data=await recordRepositary.getAllRecord(recordId, filters);
            if(!data) throw new InternalServerError();
            return data;
}

async function deleteRecord(recordId:string){
    await recordRepositary.deleteRecord(recordId as string);
}

async function updateRecord(data:any, recordId:string){
     await recordRepositary.updateRecord(recordId as string,data);
}

const recordService={
    createRecord:createRecord,
    getAllRecord:getAllRecord,
    deleteRecord:deleteRecord,
    updateRecord:updateRecord
}

export default recordService;

