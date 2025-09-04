import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateRegistration = [
  // Validate email: must be a valid email format
  body('email', 'Please include a valid email').isEmail(),

  // Validate password: must be at least 6 characters long
  body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),

  // This function handles the response if validation fails
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  // Validate email: must be a valid email format
  body('email', 'Please include a valid email').isEmail(),

  // Validate password: must not be empty
  body('password', 'Password is required').exists(),

  // This function handles the response if validation fails
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];