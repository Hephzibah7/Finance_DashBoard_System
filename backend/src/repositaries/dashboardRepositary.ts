import Record from "../models/recordModel.js";
import { EXPENSE, INCOME } from "../utils/constants.js";
import redisClient from "../configs/redis.js";

async function getSummary() {
  const start = Date.now();
  const cacheKey="dashboard-summary";
  const cachedData=await redisClient.get(cacheKey);
  if(cachedData){
    console.log("CACHE_HIT");
    console.log(Date.now()-start);
    return cachedData;
  }
  console.log("CACHE_MISS");
    
  

    const result = await Record.aggregate([
        {
            $group: {
                _id: "$type",
                total: { $sum: "$amount" }
            }
        }
    ]);

   

    let income = 0;
    let expense = 0;

    result.forEach(item => {
        if (item._id === INCOME) income = item.total;
        if (item._id === EXPENSE) expense = item.total;
    });

    const data={
      totalIncome: income,
        totalExpense: expense,
        netBalance: income - expense
    }

    await redisClient.set(
        cacheKey,
        JSON.stringify(data),
        {
            EX: 300
        }
    );
console.log(Date.now()-start);
   return data;
}

async function getCategorySummary(){
    return await Record.aggregate([
        {
            $group:{
                _id:{ "category":"$category"},
                total:{ $sum: "$amount"}
            }
        }
    ])
}

async function getMonthlyTrends() {
  return await Record.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          type: "$type"
        },
        total: {
          $sum: "$amount" 
        }
      }
    },
    {
      $sort: {
        "_id.month": 1
      }
    }
  ]);
}

async function getRecentRecords(){
    return await Record.find().sort({ createdAt: -1 }).limit(5);
}

const dashboardRepositary = {
    getSummary:getSummary,
    getCategorySummary:getCategorySummary,
    getMonthlyTrends:getMonthlyTrends,
    getRecentRecords:getRecentRecords

}

export default dashboardRepositary;