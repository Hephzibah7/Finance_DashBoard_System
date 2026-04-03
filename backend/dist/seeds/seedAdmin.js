import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../configs/db.js";
import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import bcrypt from "bcrypt";
import { ADMIN } from "../utils/constants.js";
const seedAdmin = async () => {
    try {
        await connectDB();
        console.log("✅ DB Connected");
        const password = await bcrypt.hash("admin123", 10);
        const adminRole = await Role.findOne({ name: ADMIN });
        if (!adminRole) {
            console.log("❌ Admin role not found. Run role seed first");
            process.exit(1);
        }
        const newUser = new User({
            name: "Hephzibah Ranjan",
            email: "hephzibahranjan@gmail.com",
            password,
            status: "active",
            role: adminRole._id
        });
        await newUser.save();
        console.log("✅ Admin created");
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
seedAdmin();
