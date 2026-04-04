import { check } from 'express-validator';
import { BadRequestError } from '../errors/AppError.js';
export const createUserValidator = [
    check('email', 'Please Enter a valid E-mail Address')
        .isEmail()
        .normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'Password is Required.')
        .not()
        .isEmpty(),
    check('name', 'Name is Required.')
        .not()
        .isEmpty(),
    check('role')
        .notEmpty()
        .withMessage('Role is Required.')
        .custom((value) => {
        if (value === 'analyst' || value === 'viewer')
            return true;
        throw new BadRequestError('Invalid role. Only analyst, viewer allowed');
    }),
];
import { param } from 'express-validator';
import { ANALYST, VIEWER } from '../utils/constants.js';
export const updateRoleValidator = [
    param('role')
        .notEmpty()
        .withMessage('Role is required')
        .isIn([ANALYST, VIEWER])
        .withMessage('Invalid role')
];
export const updateStatusValidator = [
    param('status')
        .notEmpty()
        .withMessage('Status is required')
        .isIn(["inactive", "active"])
        .withMessage('Invalid status')
];
