import { Router } from 'express';
import { authMiddleware, adminOnly } from '../../../../middlewares/auth.middleware';

const router = Router();

// Example protected admin routes
// Uncomment and use when you need to protect specific endpoints

/*
import { ProductController } from '../controllers/product.controller';
const productController = new ProductController();

// Protected routes - require authentication
router.post('/products', authMiddleware, adminOnly, productController.create);
router.put('/products/:id', authMiddleware, adminOnly, productController.update);
router.delete('/products/:id', authMiddleware, adminOnly, productController.delete);
*/

export default router;
