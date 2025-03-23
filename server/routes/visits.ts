import express from 'express';
import { 
  getVisitsStats, 
  getBasicVisitsStats, 
  getPageVisitsStats, 
  getTimeVisitsStats, 
  getTechVisitsStats,
  getGeoVisitsStats,
  generateTestData
} from '../controllers/visitsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotta per ottenere tutte le statistiche
router.get('/', authMiddleware, getVisitsStats);

// Rotta per ottenere le statistiche di base
router.get('/basic', authMiddleware, getBasicVisitsStats);

// Rotta per ottenere le statistiche delle pagine
router.get('/pages', authMiddleware, getPageVisitsStats);

// Rotta per ottenere le statistiche temporali
router.get('/time', authMiddleware, getTimeVisitsStats);

// Rotta per ottenere le statistiche dei browser e OS
router.get('/tech', authMiddleware, getTechVisitsStats);

// Rotta per ottenere le statistiche geografiche
router.get('/geo', authMiddleware, getGeoVisitsStats);

// Rotta per generare dati di test
router.post('/generate-test-data', authMiddleware, generateTestData);

export default router;