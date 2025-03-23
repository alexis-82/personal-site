import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Carica le variabili d'ambiente
dotenv.config();

// Chiave segreta per JWT (dovrebbe essere in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';

// In un'applicazione reale, queste credenziali dovrebbero essere archiviate in modo sicuro
// ad esempio in un database con password hashate
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';

/**
 * Controller per l'autenticazione
 */
export const login = (req: Request, res: Response): void => {
  try {
    const { username, password } = req.body;

    // Verifica le credenziali
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      res.status(401).json({ error: "Credenziali non valide" });
      return;
    }

    // Genera un token JWT
    const token = jwt.sign(
      { username }, 
      JWT_SECRET, 
      { expiresIn: '7d' } // Il token scade dopo 7 giorni
    );

    // Invia il token
    res.status(200).json({
      message: "Autenticazione riuscita",
      token
    });
  } catch (error) {
    console.error("Errore nel login:", error);
    res.status(500).json({ error: "Errore durante l'autenticazione" });
  }
};

/**
 * Controller per verificare se un token è valido
 */
export const verifyToken = (req: Request, res: Response): void => {
  try {
    // Il middleware di autenticazione ha già verificato il token,
    // quindi se arriviamo qui il token è valido
    res.status(200).json({ 
      message: "Token valido",
      user: (req as any).user
    });
  } catch (error) {
    console.error("Errore nella verifica del token:", error);
    res.status(500).json({ error: "Errore durante la verifica del token" });
  }
};
