import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Carica le variabili d'ambiente
dotenv.config();

// Chiave segreta per JWT (dovrebbe essere in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';

/**
 * Interfaccia che estende Request per includere l'utente decodificato dal token
 */
export interface AuthRequest extends Request {
  user?: any;
}

/**
 * Middleware che verifica il token JWT
 */
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Ottieni il token dall'header Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

  if (!token) {
    res.status(401).json({ error: 'Accesso negato. Token non fornito.' });
    return;
  }

  try {
    // Verifica il token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Errore di autenticazione:', error);
    res.status(401).json({ error: 'Token non valido o scaduto.' });
  }
};
