import { useState } from 'react';
import { X } from 'lucide-react';

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: CookieSettings) => void;
}

export interface CookieSettings {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieSettingsModal = ({ isOpen, onClose, onSave }: CookieSettingsModalProps) => {
  // I cookie necessari non possono essere disattivati
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true, // sempre attivo e non modificabile
    functional: true,
    analytics: false,
    marketing: false
  });

  if (!isOpen) return null;

  const handleToggle = (type: keyof CookieSettings) => {
    // I cookie necessari non possono essere disattivati
    if (type === 'necessary') return;
    
    setSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    setSettings(allEnabled);
    onSave(allEnabled);
    onClose();
  };

  // Previene la propagazione del click all'interno del modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[10000] flex items-end justify-center sm:items-center"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-3xl animate-slide-up"
        onClick={handleModalClick}
        style={{
          maxHeight: 'calc(100vh - 2rem)'
        }}
      >
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Impostazioni Cookie</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Chiudi"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 text-gray-300 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
          <p>
            Personalizza le tue preferenze sui cookie. I cookie necessari sono sempre attivi in quanto essenziali per il funzionamento del sito.
          </p>
          
          {/* Cookie necessari */}
          <div className="bg-gray-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-white font-medium">Cookie necessari</h4>
                <span className="text-gray-400 text-xs">Sempre attivi</span>
              </div>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={settings.necessary} 
                  disabled
                  className="sr-only"
                />
                <div className="block w-14 h-8 rounded-full bg-blue-600"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform translate-x-6"></div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Questi cookie sono essenziali per il funzionamento del sito e non possono essere disattivati.
            </p>
          </div>
          
          {/* Cookie funzionali */}
          <div className="bg-gray-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">Cookie funzionali</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.functional} 
                  onChange={() => handleToggle('functional')}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.functional ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </label>
            </div>
            <p className="text-sm text-gray-400">
              Questi cookie consentono al sito di fornire funzionalità avanzate e personalizzazione.
            </p>
          </div>
          
          {/* Cookie analitici */}
          <div className="bg-gray-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">Cookie analitici</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.analytics} 
                  onChange={() => handleToggle('analytics')}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.analytics ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </label>
            </div>
            <p className="text-sm text-gray-400">
              Questi cookie ci aiutano a capire come i visitatori interagiscono con il sito, raccogliendo e riportando informazioni in forma anonima.
            </p>
          </div>
          
          {/* Cookie di marketing */}
          <div className="bg-gray-800/60 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">Cookie di marketing</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.marketing} 
                  onChange={() => handleToggle('marketing')}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.marketing ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </label>
            </div>
            <p className="text-sm text-gray-400">
              Questi cookie vengono utilizzati per tracciare i visitatori su diversi siti web allo scopo di mostrare pubblicità pertinente.
            </p>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-gray-900 p-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between gap-3">
          <button 
            onClick={handleAcceptAll}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition-colors duration-200 order-2 sm:order-1"
          >
            Accetta tutti
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors duration-200 order-1 sm:order-2"
          >
            Salva preferenze
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieSettingsModal; 