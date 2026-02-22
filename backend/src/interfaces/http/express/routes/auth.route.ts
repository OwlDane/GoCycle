import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/verify', authController.verifySession);

export default router;
