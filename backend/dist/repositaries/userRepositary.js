import User from "../models/userModel.js";
import { BadRequestError } from "../errors/AppError.js";
import bcrypt from "bcrypt";
import Role from "../models/roleModel.js";
async function createUser(data) {
    const { name, email, password, role } = data;
    const isExist = await User.findOne({ email });
    if (isExist)
        throw new BadRequestError("User already Exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    const savedUser = await newUser.save();
}
async function deleteUser(userId) {
    await User.findByIdAndDelete(userId);
}
async function updateRole(userId, role) {
    const roleData = await Role.findById(userId);
    const user = await User.findByIdAndUpdate(userId, { role: roleData?.id }, { new: true });
    return user;
}
async function updateStatus(userId, status) {
    const user = await User.findByIdAndUpdate(userId, { status: status }, { new: true });
    return user;
}
const userRepositary = {
    createUser: createUser,
    deleteUser: deleteUser,
    updateRole: updateRole,
    updateStatus: updateStatus
};
export default userRepositary;
