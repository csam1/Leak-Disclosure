import cron from "node-cron"

export async function cronTest(data) {
    console.log("hey this is inside cronTEst");
    console.log("runs every 30 sec for testing");
    console.log("data : ",data);
}

cron.schedule("*/30 * * * * *",()=>{
    console.log("RUNNING THE CRON JOBB");
    cronTest("HEY ACPx1337.io")
})