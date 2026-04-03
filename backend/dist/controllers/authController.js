import authRepositary from "../repositaries/authRepositary.js";
import User from "../models/userModel.js";
import { BadRequestError } from "../errors/AppError.js";
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const isExist = await User.findOne({ email });
        if (!isExist)
            throw new BadRequestError("User does not exist");
        var data = {
            email,
            password
        };
        const userCredentials = await authRepositary.loginUser(data, next);
        res.status(201).json({
            user: userCredentials,
            success: true,
            message: "Login successful"
        });
    }
    catch (error) {
        next();
    }
}
const authController = {
    login: login
};
export default authController;
