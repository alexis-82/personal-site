import express from 'express';
import { sendContactEmail } from '../controllers/contactController.js';

const router = express.Router();

// Route per inviare un'email di contatto
router.post('/send', sendContactEmail);

export default router; 