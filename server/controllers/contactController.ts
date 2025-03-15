import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

// Interfaccia per il corpo della richiesta
interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Controller per l'invio delle email di contatto
 * @param req - La richiesta Express
 * @param res - La risposta Express
 */
export const sendContactEmail = async (req: Request, res: Response) => {
  console.log('Ricevuta richiesta di contatto:', req.body);
  
  const { name, email, subject, message } = req.body as ContactRequest;

  // Validazione dei dati
  if (!name || !email || !subject || !message) {
    console.log('Dati mancanti nella richiesta');
    return res.status(400).json({
      success: false,
      message: 'Tutti i campi sono obbligatori'
    });
  }

  try {
    // Verifico che le variabili d'ambiente siano impostate
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Configurazione email mancante');
      return res.status(500).json({
        success: false,
        message: 'Configurazione del server email non completa'
      });
    }

    // Configurazione del trasporter di Nodemailer
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Opzioni dell'email
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `Nuovo messaggio dal sito: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #6d28d9; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Nuovo messaggio dal form di contatto</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Oggetto:</strong> ${subject}</p>
          <p><strong>Messaggio:</strong></p>
          <p style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; white-space: pre-line;">${message}</p>
        </div>
      `,
      replyTo: email
    };

    // Invia l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email inviata con successo:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Email inviata con successo'
    });
  } catch (error) {
    console.error('Errore nell\'invio dell\'email:', error);
    return res.status(500).json({
      success: false,
      message: 'Si è verificato un errore durante l\'invio dell\'email'
    });
  }
}; 