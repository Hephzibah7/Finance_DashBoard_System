import { ValidationError } from "../errors/AppError.js";
import { validationResult } from "express-validator";
const validate = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array()[0].msg);
    }
    next();
};
export default validate;
