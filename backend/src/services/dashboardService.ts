import dashboardRepositary from "../repositaries/dashboardRepositary.js";

async function getSummary(){
    const summary = await dashboardRepositary.getSummary();
    const category = await dashboardRepositary.getCategorySummary();
    const recent = await dashboardRepositary.getRecentRecords();
    const monthly = await dashboardRepositary.getMonthlyTrends();

    const data= {
        summary,
        category,
        recent,
        monthly
      }

      return data;
}

const dashboardService={
    getSummary:getSummary
}

export default dashboardService;