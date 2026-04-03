import User from "../models/userModel.js";
import { ForbiddenError } from "../errors/AppError.js";
import { ADMIN } from "../utils/constants.js";
const authorize = (requiredPermission) => {
    return async (req, res, next) => {
        const user = await User.findById(req.user);
        if (user.role.name == ADMIN) {
            return next();
        }
        // Check inactive user
        if (user.status === 'inactive') {
            throw new ForbiddenError("User is inactive");
        }
        // Check permission
        if (!user.role.permissions.includes(requiredPermission)) {
            throw new ForbiddenError("Access Denied");
        }
        next();
    };
};
export default authorize;
