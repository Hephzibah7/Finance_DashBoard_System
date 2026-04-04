import { BadRequestError } from "../errors/AppError.js";
import { validationResult } from "express-validator";
const validate = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array()[0].msg);
    }
    next();
};
export default validate;
