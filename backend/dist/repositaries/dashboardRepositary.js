import Record from "../models/recordModel.js";
import { EXPENSE, INCOME } from "../utils/constants.js";
async function getSummary() {
    const result = await Record.aggregate([
        {
            $group: {
                _id: "$type",
                total: { $sum: "$amount" }
            }
        }
    ]);
    console.log(result);
    let income = 0;
    let expense = 0;
    result.forEach(item => {
        if (item._id === INCOME)
            income = item.total;
        if (item._id === EXPENSE)
            expense = item.total;
    });
    return {
        totalIncome: income,
        totalExpense: expense,
        netBalance: income - expense
    };
}
async function getCategorySummary() {
    return await Record.aggregate([
        {
            $group: {
                _id: { "category": "$category" },
                total: { $sum: "$amount" }
            }
        }
    ]);
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
                    $sum: "$amount" // ✅ if amount is string
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
async function getRecentRecords() {
    return await Record.find().sort({ createdAt: -1 }).limit(5);
}
const dashboardRepositary = {
    getSummary: getSummary,
    getCategorySummary: getCategorySummary,
    getMonthlyTrends: getMonthlyTrends,
    getRecentRecords: getRecentRecords
};
export default dashboardRepositary;
