import User from "../models/userModel.js";
import { BadRequestError } from "../errors/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function loginUser(user, next) {
    try {
        const { email, password } = user;
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            throw new BadRequestError("User not Found");
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid)
            throw new BadRequestError("Invalid Credentials");
        const token = jwt.sign({ userId: existingUser._id }, process.env.SECRET_TYPE, {
            expiresIn: "1h",
        });
        console.log(token);
        const userCredentials = {
            name: existingUser.name,
            email: existingUser.email,
            token: token,
        };
        return userCredentials;
    }
    catch (error) {
        next(error);
    }
}
const authRepositary = {
    loginUser: loginUser
};
export default authRepositary;
