import User from "../models/userModel.js";
import { BadRequestError, InternalServerError } from "../errors/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
async function loginUser(user) {
    const { email, password } = user;
    const existingUser = await User.findOne({ email });
    if (!existingUser)
        throw new BadRequestError("User not Found");
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid)
        throw new BadRequestError("Invalid Credentials");
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ userId: existingUser._id }, key, {
        expiresIn: "1h",
    });
    if (!token)
        throw new InternalServerError();
    console.log("token" + token);
    const userCredentials = {
        name: existingUser.name,
        email: existingUser.email,
        token: token,
    };
    return userCredentials;
}
const authRepositary = {
    loginUser: loginUser
};
export default authRepositary;
