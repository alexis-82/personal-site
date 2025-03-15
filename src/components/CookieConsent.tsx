import { useState, useEffect } from 'react';
import CookiePolicyModal from './CookiePolicyModal';
import CookieSettingsModal, { CookieSettings } from './CookieSettingsModal';

interface CookieConsentProps {
  onAccept: () => void;
}

const CookieConsent = ({ onAccept }: CookieConsentProps) => {
  const [visible, setVisible] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    // Controlla se il consenso ai cookie è già stato dato
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Mostra il popup solo dopo un breve ritardo per migliorare l'esperienza utente
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Salva il consenso nei localStorage
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
    onAccept();
  };

  const openPolicyModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setPolicyModalOpen(true);
  };

  const closePolicyModal = () => {
    setPolicyModalOpen(false);
  };

  const openSettingsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setSettingsModalOpen(false);
  };

  const handleSaveSettings = (settings: CookieSettings) => {
    // Salva le impostazioni dei cookie nel localStorage
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
    localStorage.setItem('cookieConsent', 'custom');
    setVisible(false);
    onAccept();
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white p-4 z-[9999] shadow-xl border-t border-indigo-700/50 backdrop-blur-sm transition-all duration-300 ease-in-out animate-fade-in">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center">
          <div className="text-sm mb-4 sm:mb-0 sm:mr-8 text-center justify-center">
          📑 Utilizziamo i cookie per offrirti un'esperienza ottimale e una comunicazione pertinente.
            <button 
              onClick={openPolicyModal}
              className="text-indigo-300 hover:text-white hover:underline mx-1 font-medium focus:outline-none transition-colors duration-200"
            >
              Leggi di più
            </button> 
            o 
            <button
              onClick={openSettingsModal}
              className="text-indigo-300 hover:text-white hover:underline mx-1 font-medium focus:outline-none transition-colors duration-200"
            >
              accetta i singoli cookie
            </button>
          </div>
          <button
            onClick={handleAccept}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 whitespace-nowrap shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Ho capito!
          </button>
        </div>
      </div>

      <CookiePolicyModal 
        isOpen={policyModalOpen} 
        onClose={closePolicyModal} 
      />

      <CookieSettingsModal
        isOpen={settingsModalOpen}
        onClose={closeSettingsModal}
        onSave={handleSaveSettings}
      />
    </>
  );
};

export default CookieConsent; 