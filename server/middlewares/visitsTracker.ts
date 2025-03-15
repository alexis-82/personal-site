import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import geoip from 'geoip-lite';

// Per ottenere __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE_PATH = path.join(__dirname, '../data/visits.json');

interface VisitsData {
  totalVisits: number;
  uniqueVisitors: number;
  paths: Record<string, number>;
  sessions: Record<string, {
    count: number;
    lastVisit: string;
    paths: string[];
    country?: string;
  }>;
  hourlyStats: Record<string, number>;
  dailyStats: Record<string, number>;
  browserStats: Record<string, number>;
  osStats: Record<string, number>;
  countryStats: Record<string, number>;
  lastUpdated: string;
}

/**
 * Legge i dati dal file JSON
 */
const readVisitsData = (): VisitsData => {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      const initialData: VisitsData = {
        totalVisits: 0,
        uniqueVisitors: 0,
        paths: {},
        sessions: {},
        hourlyStats: {},
        dailyStats: {},
        browserStats: {},
        osStats: {},
        countryStats: {},
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Errore nella lettura dei dati delle visite:', error);
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      paths: {},
      sessions: {},
      hourlyStats: {},
      dailyStats: {},
      browserStats: {},
      osStats: {},
      countryStats: {},
      lastUpdated: new Date().toISOString()
    };
  }
};

/**
 * Salva i dati nel file JSON
 */
const saveVisitsData = (data: VisitsData): void => {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Errore nel salvataggio dei dati delle visite:', error);
  }
};

/**
 * Middleware per il tracciamento delle visite
 */
export const visitsTracker = (req: Request, res: Response, next: NextFunction): void => {
  // Ignora richieste per file statici
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    next();
    return;
  }

  try {
    const visitsData = readVisitsData();
    const now = new Date();
    const hour = now.getHours().toString();
    const day = now.toISOString().split('T')[0];
    
    // Incrementa il contatore totale delle visite
    visitsData.totalVisits += 1;
    
    // Aggiorna le statistiche per percorso
    const path = req.path;
    visitsData.paths[path] = (visitsData.paths[path] || 0) + 1;
    
    // Aggiorna le statistiche per ora
    visitsData.hourlyStats[hour] = (visitsData.hourlyStats[hour] || 0) + 1;
    
    // Aggiorna le statistiche per giorno
    visitsData.dailyStats[day] = (visitsData.dailyStats[day] || 0) + 1;
    
    // Ottieni informazioni sul browser e sistema operativo
    const userAgent = req.headers['user-agent'] || 'Unknown';
    
    // Analisi semplificata di browser e OS
    let browser = 'Unknown';
    if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) browser = 'Internet Explorer';
    
    let os = 'Unknown';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'MacOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';
    
    // Aggiorna le statistiche per browser
    visitsData.browserStats[browser] = (visitsData.browserStats[browser] || 0) + 1;
    
    // Aggiorna le statistiche per sistema operativo
    visitsData.osStats[os] = (visitsData.osStats[os] || 0) + 1;
    
    // Gestione delle sessioni e nazionalità
    const ip = req.ip || '127.0.0.1';
    const sessionId = ip || 'unknown';
    
    // Ottieni la nazionalità dall'IP
    let country = 'Unknown';
    try {
      const geo = geoip.lookup(ip);
      if (geo && geo.country) {
        country = geo.country;
      }
    } catch (error) {
      console.error('Errore nel lookup della geolocalizzazione:', error);
    }
    
    // Aggiorna le statistiche per nazionalità
    visitsData.countryStats[country] = (visitsData.countryStats[country] || 0) + 1;
    
    if (!visitsData.sessions[sessionId]) {
      // Nuova sessione, incrementa contatore visitatori unici
      visitsData.uniqueVisitors += 1;
      visitsData.sessions[sessionId] = {
        count: 1,
        lastVisit: now.toISOString(),
        paths: [path],
        country: country
      };
    } else {
      // Sessione esistente
      visitsData.sessions[sessionId].count += 1;
      visitsData.sessions[sessionId].lastVisit = now.toISOString();
      
      // Aggiungi il percorso se non è già presente
      if (!visitsData.sessions[sessionId].paths.includes(path)) {
        visitsData.sessions[sessionId].paths.push(path);
      }
      
      // Aggiorna il paese se non era stato registrato prima
      if (!visitsData.sessions[sessionId].country) {
        visitsData.sessions[sessionId].country = country;
      }
    }
    
    // Aggiorna il timestamp
    visitsData.lastUpdated = now.toISOString();
    
    // Salva i dati aggiornati
    saveVisitsData(visitsData);
    
    next();
  } catch (error) {
    console.error('Errore nel middleware di tracciamento visite:', error);
    next(); // Continua l'esecuzione anche in caso di errore
  }
};

/**
 * Ottiene i dati delle visite
 */
export const getVisitsData = (): VisitsData => {
  return readVisitsData();
}; 