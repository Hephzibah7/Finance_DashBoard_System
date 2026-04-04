import authRepositary from "../repositaries/authRepositary.js";
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        var data = {
            email,
            password
        };
        const userCredentials = await authRepositary.loginUser(data);
        res.status(201).json({
            user: userCredentials,
            success: true,
            message: "Login successful"
        });
    }
    catch (error) {
        return next(error);
    }
}
const authController = {
    login: login
};
export default authController;
