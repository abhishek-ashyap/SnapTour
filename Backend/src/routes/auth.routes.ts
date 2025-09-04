import { Router } from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/auth.controller'; // Add new imports
import { validateRegistration, validateLogin } from '../middleware/validator.middleware';

const router = Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

// Add new routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;