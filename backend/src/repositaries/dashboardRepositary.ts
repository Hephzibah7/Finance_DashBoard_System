import Record from "../models/recordModel.js";

async function getSummary() {
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
        if (item._id === "income") income = item.total;
        if (item._id === "expense") expense = item.total;
    });

    return {
        totalIncome: income,
        totalExpense: expense,
        netBalance: income - expense
    };
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
        _id: { $month: "$date" },
        total: { $sum: "$amount" }
      }
    },
    { $sort: { "_id": 1 } }
  ]);
};

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