import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/AppError.js";
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedError("Token is missing");
        }
        const token = authHeader.split(" ")[1];
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.userId;
        next();
    }
    catch (error) {
        next(error);
    }
};
export default verifyToken;
