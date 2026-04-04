import { BadRequestError } from "../errors/AppError.js";
import userRepositary from "../repositaries/userRepositary.js";
async function createUser(req, res, next) {
    try {
        const { name, email, password, role } = req.body;
        const obj = {
            name, email, password, role
        };
        const userData = await userRepositary.createUser(obj);
        res.status(201).json({
            success: true,
            message: "User created successfully!"
        });
    }
    catch (error) {
        next(error);
    }
}
async function deleteUser(req, res, next) {
    try {
        const userId = req.params.id;
        const data = await userRepositary.deleteUser(userId);
        res.status(201).json({
            success: true,
            message: "User deleted successfully!"
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateRole(req, res, next) {
    try {
        const userId = req.params.id;
        const role = req.params.role;
        console.log(userId);
        const user = userRepositary.updateRole(userId, role);
        if (!user)
            throw new BadRequestError("Role could not be updated! Try again later");
        res.status(201).json({
            user: user,
            success: true,
            message: "Role updated successfully!"
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateStatus(req, res, next) {
    try {
        const { userId, status } = req.params;
        const user = userRepositary.updateStatus(userId, status);
        if (!user)
            throw new BadRequestError("Status could not be updated! Try again later");
        res.status(201).json({
            user: user,
            success: true,
            message: "Status updated successfully!"
        });
    }
    catch (error) {
        next(error);
    }
}
const userController = {
    createUser: createUser,
    deleteUser: deleteUser,
    updateRole: updateRole,
    updateStatus: updateStatus
};
export default userController;
