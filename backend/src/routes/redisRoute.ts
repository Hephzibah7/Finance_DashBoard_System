import express from "express"
import redisClient from "../configs/redis.js";
const router=express.Router();
router.get("/redis-test", async (req, res) => {

    await redisClient.set(
        "name",
        "Hephzibah"
    );

    const data =
        await redisClient.get("name");

     res.json({
        data
    });
});
export default router;