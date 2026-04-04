import dashboardRepositary from "../repositaries/dashboardRepositary.js";
async function getSummary(req, res, next) {
    try {
        const summary = await dashboardRepositary.getSummary();
        const category = await dashboardRepositary.getCategorySummary();
        const recent = await dashboardRepositary.getRecentRecords();
        const monthly = await dashboardRepositary.getMonthlyTrends();
        return res.status(200).json({
            success: true,
            data: {
                summary,
                category,
                recent,
                monthly
            }
        });
    }
    catch (error) {
        next(error);
    }
}
export default getSummary;
