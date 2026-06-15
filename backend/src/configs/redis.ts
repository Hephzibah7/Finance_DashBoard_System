import { createClient } from "redis";
console.log("Redis file loaded");
const redisClient = createClient({
    url: "redis://localhost:6379"
});

redisClient.on("error", (err) => {
    console.log("Redis Error:", err);
});

redisClient.on("connect", () => {
    console.log("✅ Redis Connected");
});



export default redisClient;