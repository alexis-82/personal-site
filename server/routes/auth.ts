import express from 'express';
import { login } from '../controllers/authController.js';
import { verifyToken } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotta per il login
router.post('/login', login);

// Rotta per verificare il token
router.get('/verify', authMiddleware, verifyToken);

export default router;
