import { X } from 'lucide-react';
import { useEffect } from 'react';

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePolicyModal = ({ isOpen, onClose }: CookiePolicyModalProps) => {
  // Blocca lo scroll del body quando il modal è aperto
  useEffect(() => {
    if (isOpen) {
      // Salva la posizione di scroll corrente
      const scrollY = window.scrollY;
      
      // Aggiungi una classe al body per fissare la posizione
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden';
    } else {
      // Ripristina lo scroll quando il modal viene chiuso
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      // Ripristina la posizione di scroll
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup function per assicurarsi che lo scroll venga ripristinato
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  // Previene la propagazione del click all'interno del modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[10000] flex items-end justify-center sm:items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-t-lg sm:rounded-lg shadow-xl max-w-3xl w-full animate-slide-up"
        onClick={handleModalClick}
        style={{
          maxHeight: 'calc(100vh - 2rem)'
        }}
      >
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center rounded-t-lg z-10">
          <h2 className="text-xl font-bold text-white">Cookie Policy</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Chiudi"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 text-gray-300 space-y-4 text-sm overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
          <h3 className="text-lg font-semibold text-white mb-2">Informativa sui Cookie</h3>
          
          <p>
            Ultima modifica: {new Date().toLocaleDateString('it-IT')}
          </p>
          
          <h4 className="text-white font-medium mt-4">1. Cosa sono i cookie</h4>
          <p>
            I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente (computer, tablet, smartphone, notebook), dove vengono memorizzati, per poi essere ritrasmessi agli stessi siti alla visita successiva. Sono usati per eseguire autenticazioni informatiche, monitoraggio di sessioni e memorizzazione di informazioni sulle attività degli utenti.
          </p>
          
          <h4 className="text-white font-medium mt-4">2. Tipologie di cookie utilizzati</h4>
          
          <h5 className="text-white mt-2">2.1 Cookie tecnici</h5>
          <p>
            Sono quelli utilizzati al solo fine di effettuare la trasmissione di una comunicazione su una rete di comunicazione elettronica, o nella misura strettamente necessaria al fornitore di un servizio esplicitamente richiesto dall'utente, al fine di erogare tale servizio. Essi non vengono utilizzati per scopi ulteriori e sono normalmente installati direttamente dal titolare del sito web. Possono essere suddivisi in:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>cookie di navigazione o di sessione, che garantiscono la normale navigazione e fruizione del sito web;</li>
            <li>cookie di funzionalità, che permettono all'utente la navigazione in funzione di una serie di criteri selezionati al fine di migliorare il servizio reso allo stesso.</li>
          </ul>
          
          <h5 className="text-white mt-2">2.2 Cookie analitici</h5>
          <p>
            Sono assimilati ai cookie tecnici laddove utilizzati direttamente dal gestore del sito per raccogliere informazioni, in forma aggregata, sul numero degli utenti e su come questi visitano il sito stesso.
          </p>
          
          <h5 className="text-white mt-2">2.3 Cookie di profilazione</h5>
          <p>
            Sono volti a creare profili relativi all'utente e vengono utilizzati al fine di inviare messaggi pubblicitari in linea con le preferenze manifestate dallo stesso nell'ambito della navigazione in rete.
          </p>
          
          <h4 className="text-white font-medium mt-4">3. Come gestire i cookie</h4>
          <p>
            L'utente può decidere se accettare o meno i cookie utilizzando le impostazioni del proprio browser. La disabilitazione dei cookie tecnici può compromettere l'utilizzo delle funzionalità del sito.
          </p>
          <p>
            La maggior parte dei browser permette di:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Visualizzare i cookie presenti e cancellarli singolarmente</li>
            <li>Bloccare i cookie di terze parti</li>
            <li>Bloccare i cookie di particolari siti</li>
            <li>Bloccare l'installazione di tutti i cookie</li>
            <li>Cancellare tutti i cookie alla chiusura del browser</li>
          </ul>
          
          <h4 className="text-white font-medium mt-4">4. Cookie utilizzati da questo sito</h4>
          <p>
            Questo sito utilizza solo cookie tecnici essenziali per il corretto funzionamento del sito e per migliorare l'esperienza di navigazione dell'utente. Non utilizziamo cookie di profilazione.
          </p>
          
          <h4 className="text-white font-medium mt-4">5. Durata dei cookie</h4>
          <p>
            I cookie hanno una durata dettata dalla data di scadenza impostata al momento della loro creazione. Alcuni cookie sono cancellati automaticamente quando si chiude il browser, altri rimangono memorizzati nei dispositivi fino alla loro scadenza o cancellazione manuale.
          </p>
          
          <h4 className="text-white font-medium mt-4">6. Aggiornamenti alla Cookie Policy</h4>
          <p>
            Questa Cookie Policy potrebbe essere aggiornata periodicamente per riflettere, ad esempio, modifiche ai cookie che utilizziamo o per altre ragioni operative, legali o normative. Si consiglia di visitare regolarmente la presente pagina per essere informati su eventuali aggiornamenti.
          </p>
        </div>
        
        <div className="sticky bottom-0 bg-gray-900 p-4 border-t border-gray-800 flex justify-end z-10">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Ho capito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyModal; 