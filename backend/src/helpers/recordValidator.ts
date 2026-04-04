import { ENTERTAINMENT, EXPENSE, FOOD,INCOME } from "../utils/constants.js";
import { BadRequestError } from "../errors/AppError.js";
import { check } from 'express-validator';
import { HEALTH } from "../utils/constants.js";
import { param } from 'express-validator';

export const createUserValidator = [
  check('amount', 'Please Enter a valid amount value')
    .not()
    .isEmpty(),

  check('type')
    .notEmpty()
    .withMessage('Type of the record is Required.')
    .custom((value) => {
      if (value === INCOME || value === EXPENSE) return true;

      throw new BadRequestError('Invalid type');
    }),

     check('category')
    .notEmpty()
    .withMessage('Type of the category is Required.')
    .custom((value) => {
      if (value === FOOD || value === ENTERTAINMENT || value === HEALTH) return true;

      throw new BadRequestError('Invalid type');
    }),

     check('description', 'Please Enter a description')
    .not()
    .isEmpty(),


];

export const deleteRecordValidator = [
  param('id')
    .exists()
    .withMessage('Record Id param is required')
    .bail()
    .notEmpty()
    .withMessage('Record Id cannot be empty')
    .bail()
    .isMongoId()
    .withMessage('Invalid Record Id'),
];