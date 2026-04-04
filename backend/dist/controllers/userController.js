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
        await userRepositary.deleteUser(userId);
        res.status(200).json({
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
        await userRepositary.updateRole(userId, role);
        res.status(200).json({
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
        const userId = req.params.id;
        const status = req.params.status;
        await userRepositary.updateStatus(userId, status);
        res.status(200).json({
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
