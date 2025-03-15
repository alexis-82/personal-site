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

const router = express.Router();

// Rotta per ottenere tutte le statistiche
router.get('/', getVisitsStats);

// Rotta per ottenere le statistiche di base
router.get('/basic', getBasicVisitsStats);

// Rotta per ottenere le statistiche delle pagine
router.get('/pages', getPageVisitsStats);

// Rotta per ottenere le statistiche temporali
router.get('/time', getTimeVisitsStats);

// Rotta per ottenere le statistiche dei browser e OS
router.get('/tech', getTechVisitsStats);

// Rotta per ottenere le statistiche geografiche
router.get('/geo', getGeoVisitsStats);

// Rotta per generare dati di test
router.post('/generate-test-data', generateTestData);

export default router; 