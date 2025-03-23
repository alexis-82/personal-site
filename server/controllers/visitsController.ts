import { Request, Response } from 'express';
import { getVisitsData } from '../middlewares/visitsTracker.js';
import geoip from 'geoip-lite';
import { visitsTracker } from '../middlewares/visitsTracker.js';

/**
 * Ottiene le statistiche complete delle visite
 */
export const getVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    res.status(200).json(visitsData);
  } catch (error) {
    console.error('Errore nel recupero delle statistiche visite:', error);
    res.status(500).json({ error: 'Errore nel recupero delle statistiche visite' });
  }
};

/**
 * Ottiene solo le statistiche di base (totale visite e visitatori unici)
 */
export const getBasicVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    res.status(200).json({
      totalVisits: visitsData.totalVisits,
      uniqueVisitors: visitsData.uniqueVisitors,
      lastUpdated: visitsData.lastUpdated
    });
  } catch (error) {
    console.error('Errore nel recupero delle statistiche di base:', error);
    res.status(500).json({ error: 'Errore nel recupero delle statistiche di base' });
  }
};

/**
 * Ottiene le statistiche delle pagine più visitate
 */
export const getPageVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    
    // Ordina le pagine per numero di visite in ordine decrescente
    const sortedPages = Object.entries(visitsData.paths)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [path, count]) => {
        acc[path] = count;
        return acc;
      }, {} as Record<string, number>);
    
    res.status(200).json({
      pages: sortedPages,
      lastUpdated: visitsData.lastUpdated
    });
  } catch (error) {
    console.error('Errore nel recupero delle statistiche delle pagine:', error);
    res.status(500).json({ error: 'Errore nel recupero delle statistiche delle pagine' });
  }
};

/**
 * Ottiene le statistiche temporali (orarie e giornaliere)
 */
export const getTimeVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    res.status(200).json({
      hourlyStats: visitsData.hourlyStats,
      dailyStats: visitsData.dailyStats,
      lastUpdated: visitsData.lastUpdated
    });
  } catch (error) {
    console.error('Errore nel recupero delle statistiche temporali:', error);
    res.status(500).json({ error: 'Errore nel recupero delle statistiche temporali' });
  }
};

/**
 * Ottiene le statistiche dei browser e sistemi operativi
 */
export const getTechVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    res.status(200).json({
      browserStats: visitsData.browserStats,
      osStats: visitsData.osStats,
      lastUpdated: visitsData.lastUpdated
    });
  } catch (error) {
    console.error('Errore nel recupero delle statistiche tecniche:', error);
    res.status(500).json({ error: 'Errore nel recupero delle statistiche tecniche' });
  }
};

/**
 * Ottiene le statistiche geografiche (nazionalità)
 */
export const getGeoVisitsStats = (req: Request, res: Response): void => {
  try {
    const visitsData = getVisitsData();
    
    // Ordina le nazioni per numero di visite in ordine decrescente
    const sortedCountries = Object.entries(visitsData.countryStats)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [country, count]) => {
        acc[country] = count;
        return acc;
      }, {} as Record<string, number>);
    
    res.status(200).json({
      countryStats: sortedCountries,
      lastUpdated: visitsData.lastUpdated
    });
  } catch (error) {
    console.error('Errore nel recupero delle statistiche geografiche:', error);
    res.status(500).json({ error: 'Errore nel recupero delle statistiche geografiche' });
  }
};

/**
 * Genera dati di test per verificare il funzionamento
 */
export const generateTestData = (req: Request, res: Response): void => {
  try {
    // Simula diverse richieste con diversi percorsi
    const simulateRequest = (path: string, country: string, userAgent: string) => {
      const mockReq = {
        path,
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
        headers: {
          'user-agent': userAgent
        }
      } as Request;
      
      const mockRes = {} as Response;
      const mockNext = () => {};
      
      // Sovrascrive temporaneamente il metodo lookup di geoip per il test
      const originalLookup = geoip.lookup;
      geoip.lookup = () => ({
        country,
        region: 'Unknown',
        city: 'Unknown',
        ll: [0, 0],
        metro: 0,
        area: 0,
        eu: '0',
        timezone: 'Europe/Rome',
        range: [0, 0]
      });
      
      // Esegue il middleware con i dati mock
      visitsTracker(mockReq, mockRes, mockNext);
      
      // Ripristina il metodo lookup originale
      geoip.lookup = originalLookup;
    };
    
    // Simula 10 visite con dati diversi
    simulateRequest('/', 'IT', 'Chrome/91.0.4472.124');
    simulateRequest('/about', 'US', 'Firefox/89.0');
    simulateRequest('/contact', 'FR', 'Safari/14.1.1');
    simulateRequest('/products', 'DE', 'Chrome/91.0.4472.124');
    simulateRequest('/blog', 'ES', 'Edge/91.0.864.59');
    simulateRequest('/', 'IT', 'Chrome/91.0 Mobile');
    simulateRequest('/about', 'GB', 'Safari Mobile/14.1.1');
    simulateRequest('/contact', 'JP', 'Chrome/91.0.4472.124');
    simulateRequest('/products', 'CN', 'Firefox/89.0');
    simulateRequest('/blog', 'BR', 'Chrome/91.0 Mobile');
    
    res.status(200).json({ 
      success: true, 
      message: 'Dati di test generati con successo. Ora puoi verificare le statistiche tramite gli altri endpoint.' 
    });
  } catch (error) {
    console.error('Errore nella generazione dei dati di test:', error);
    res.status(500).json({ error: 'Errore nella generazione dei dati di test' });
  }
}; 