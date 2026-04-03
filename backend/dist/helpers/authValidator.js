import { check } from 'express-validator';
export const loginValidator = [
    check('email', 'Please Enter a valid E-mail Address').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'Password is Required.').not().isEmpty(),
];
