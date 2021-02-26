import { validationResult, param } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

const ResultValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const validadeIdParam = [
  param('id').isInt().withMessage('ID must to be Integer')
];

export const validateCustomIntParam = (parameterName: string) => {
  return [
    param(parameterName).isInt().withMessage(`${parameterName.toUpperCase()} must to be Integer`)
  ]
}

export default ResultValidation;