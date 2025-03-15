import { useEffect, useState, FormEvent } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import Terminal from './components/Terminal';
import ProjectCard from './components/ProjectCard';
import ContactLink from './components/ContactLink';
import SkillCard from './components/SkillCard';
import ProfileImage from './components/ProfileImage';
import ImageModal from './components/ImageModal';
import CookieConsent from './components/CookieConsent';
import { Helmet } from 'react-helmet-async';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState(false);
  
  // Stato per il form di contatto
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoaded(true);
    // Controlla se il consenso ai cookie è già stato dato
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      setCookieConsentAccepted(true);
    }
  }, []);

  // Funzione per gestire l'accettazione dei cookie
  const handleCookieConsent = () => {
    setCookieConsentAccepted(true);
  };

  // Funzione per aprire e chiudere il menu mobile
  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previene la propagazione dell'evento
    setMobileMenuOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      
      // Chiudi il menu mobile quando l'utente inizia a scorrere
      if (mobileMenuOpen && window.scrollY > 10) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Chiudi il menu mobile quando si clicca fuori
  useEffect(() => {
    if (!mobileMenuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      // Se il menu non è aperto, non fare nulla
      if (!mobileMenuOpen) return;
      
      const target = event.target as HTMLElement;
      const isMenuButton = target.closest('button') && target.closest('button')?.getAttribute('aria-label')?.includes('menu');
      const isInsideMenu = target.closest('.mobile-menu-container');
      
      if (!isMenuButton && !isInsideMenu) {
        setMobileMenuOpen(false);
      }
    };
    
    // Piccolo ritardo per evitare conflitti con l'evento click che apre il menu
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 10);
    
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Funzione per lo scorrimento fluido con offset per l'header
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Per le sezioni a schermo intero, scrolliamo direttamente alla posizione dell'elemento
      // senza calcoli complessi, poiché ogni sezione ora occupa esattamente un viewport
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      
      // Chiudi il menu mobile dopo aver cliccato su un link
      setMobileMenuOpen(false);
    }
  };

  const featuredProjects = [
    {
      title: "FlowFiles",
      description: "File Browser multilingua per la gestione dei file da web",
      tech: ["Express", "Node.js", "React", "TypeScript", "Docker"],
      github: "https://github.com/alexis-82/flowfiles.git",
      image: "images/projects/flowfiles.webp"
    },
    {
      title: "DBPrecision",
      description: "Software per la precisione e la modifica dei decibel per file audio mp3",
      tech: ["Python", "FFmpeg", "Qt6"],
      github: "https://github.com/alexis-82/dbprecision",
      image: "images/projects/dbprecision.webp"
    },
    {
      title: "SpesaSmart",
      description: "Applicazione mobile Android per la gestione delle spese",
      tech: ["React Native"],
      github: "https://github.com/alexis-82/SpesaSmart",
      image: "images/projects/spesasmart.webp"
    }
  ];

  const additionalProjects = [
    {
      title: "suiteAV",
      description: "Programma Downloader per Windows10/11 e Linux",
      tech: ["Python", "yt-dlp", "Shell", "Bash"],
      github: "https://github.com/alexis-82/suiteAV-win",
      github2: "https://github.com/alexis-82/suiteAV",
      image: "images/projects/suiteav-min.webp"
    },
    {
      title: "sQemu64",
      description: "Programma per l'emulazione di sistemi operativi",
      tech: ["Python", "Shell", "Qemu", "KVM", "Virtualization"],
      github: "https://github.com/alexis-82/sqemu64",
      image: "images/projects/sqemu.webp"
    },
    {
      title: "Login System",
      description: "Sistema di Login e Registrazione con autenticazione JWT",
      tech: ["Node.js", "Express", "React", "JWT", "Docker"],
      github: "https://github.com/alexis-82/login-system",
      image: "images/projects/login-system-min.webp"
    },
  ];

  const allProjects = [...featuredProjects, ...additionalProjects];
  // const displayedProjects = showAllProjects ? allProjects : featuredProjects;

  const contacts = [
    { Icon: Github, href: "https://github.com/alexis-82", label: "GitHub Profile" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/alessio-abrugiati/", label: "LinkedIn Profile" },
  ];

  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js",
    "Python", "Database", "Docker", "SysAdmin Linux"
  ];

  // Handler per l'aggiornamento dei campi del form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler per l'invio del form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    try {
      // Utilizziamo il percorso relativo perché abbiamo configurato il proxy in Vite
      const response = await fetch('https://www.alexis82.it/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      // Se la risposta non è 2xx, lanciamo un errore
      if (!response.ok) {
        let errorMsg = 'Si è verificato un errore durante l\'invio del messaggio';
        
        try {
          // Proviamo a leggere il messaggio di errore dal server
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (jsonError) {
          // Se non possiamo analizzare il JSON, usiamo lo status text
          errorMsg = `Errore ${response.status}: ${response.statusText}`;
        }
        
        setFormStatus('error');
        setErrorMessage(errorMsg);
        return;
      }
      
      // Se arriviamo qui, la risposta è OK
      await response.json(); // Leggiamo il corpo della risposta ma non lo utilizziamo
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Errore durante l\'invio del form:', error);
      setFormStatus('error');
      setErrorMessage('Impossibile contattare il server. Riprova più tardi.');
    }
    
    // Reset dello stato dopo 5 secondi
    setTimeout(() => {
      setFormStatus('idle');
      setErrorMessage('');
    }, 5000);
  };

  return (
    <div className={`min-h-screen bg-gray-950 text-white ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Helmet>
        <title>Alexis82 - Full Stack Developer</title>
        <meta name="description" content="Alessio's Portfolio" />
      </Helmet>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/20 backdrop-blur-sm border-b border-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="lg:w-1/4 flex items-center">
              {/* Se vuoi aggiungere un logo, puoi farlo qui */}
            </div>
            
            <div className="hidden lg:flex gap-6 justify-center">
              <a 
                href="#home" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('home'); 
                }}
                className={`text-white hover:text-purple-400 font-medium transform transition-all duration-500 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`} 
                style={{ transitionDelay: '50ms' }}
              >
                Home
              </a>
              <a 
                href="#about" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('about'); 
                }}
                className={`text-white hover:text-purple-400 font-medium transform transition-all duration-500 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`} 
                style={{ transitionDelay: '100ms' }}
              >
                About Me
              </a>
              <a 
                href="#projects" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('projects'); 
                }}
                className={`text-white hover:text-purple-400 font-medium transform transition-all duration-500 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`} 
                style={{ transitionDelay: '150ms' }}
              >
                My Projects
              </a>
              <a 
                href="#contact" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('contact'); 
                }}
                className={`text-white hover:text-purple-400 font-medium transform transition-all duration-500 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`} 
                style={{ transitionDelay: '200ms' }}
              >
                Contact Me
              </a>
            </div>
            
            <div className="hidden lg:flex gap-6 justify-end lg:w-1/4">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-500 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <ContactLink {...contact} />
                </div>
              ))}
            </div>
            
            <div className="lg:hidden flex justify-end">
              <button 
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Chiudi menu" : "Apri menu"}
                className="p-2 text-white hover:text-purple-400 transition-colors focus:outline-none relative z-50"
              >
                {mobileMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </nav>
          
          {/* Menu mobile - si apre quando mobileMenuOpen è true */}
          <div className={`lg:hidden ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-500 ease-in-out relative z-40`}>
            <div className={`mobile-menu-container py-4 flex flex-col gap-4 border-t border-gray-800/50 mt-2 transform transition-all duration-500 ${
              mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
            }`}>
              <a 
                href="#home" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('home');
                  setMobileMenuOpen(false);
                }}
                className="text-white hover:text-purple-400 font-medium px-2 py-2 transition-colors hover:bg-gray-800/20 rounded-lg"
              >
                Home
              </a>
              <a 
                href="#about" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('about');
                  setMobileMenuOpen(false);
                }}
                className="text-white hover:text-purple-400 font-medium px-2 py-2 transition-colors hover:bg-gray-800/20 rounded-lg"
              >
                About Me
              </a>
              <a 
                href="#projects" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('projects');
                  setMobileMenuOpen(false);
                }}
                className="text-white hover:text-purple-400 font-medium px-2 py-2 transition-colors hover:bg-gray-800/20 rounded-lg"
              >
                My Projects
              </a>
              <a 
                href="#contact" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('contact');
                  setMobileMenuOpen(false);
                }}
                className="text-white hover:text-purple-400 font-medium px-2 py-2 transition-colors hover:bg-gray-800/20 rounded-lg"
              >
                Contact Me
              </a>
              
              {/* Social links nel menu mobile */}
              <div className="flex gap-5 pt-3 px-2 border-t border-gray-800/50 mt-1 justify-center">
                {contacts.map((contact, index) => (
                  <ContactLink key={index} {...contact} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="home" className="relative overflow-hidden min-h-screen flex items-center justify-center pt-16 pb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/30 to-blue-800/30" />
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/30 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-transparent to-[#030611]/95" />
        </div>
        
        <div className="container mx-auto px-4 py-10">
          <div className={`transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center md:text-left">
              Full Stack Developer
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl text-center md:text-left">
              Creare esperienze digitali con codice pulito e soluzioni innovative.
              Specializzato in React, Node.js e architettura cloud.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 lg:gap-24 xl:gap-96 mx-auto md:mx-0 px-0">
              <Terminal />
              <div className="md:mr-4 lg:mr-8 xl:mr-0">
                <ProfileImage />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div id="about" className="min-h-screen py-16 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center">
              About Me
            </h2>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <p className="text-gray-300 leading-relaxed text-justify text-lg">
              👋 Ciao sono Alessio, un Full Stack Developer appassionato di tecnologia e innovazione. La mia esperienza spazia dallo sviluppo web alla gestione di sistemi Linux, con un focus particolare sulla creazione di soluzioni efficienti e scalabili.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify text-lg">
                Ho una forte passione per l'open source e credo nel potere della condivisione della conoscenza. Quando non sto scrivendo codice, mi piace esplorare nuove tecnologie e contribuire alla community degli sviluppatori.
              </p>
              <p className="text-gray-300 leading-relaxed text-justify text-lg">
              🧑‍💻 Le mie competenze principali includono:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 text-lg">
                <li>Sviluppo Web Full Stack con React e Node.js</li>
                <li>Amministrazione di sistemi Linux</li>
                <li>Gestione database e ottimizzazione delle performance</li>
                <li>Containerizzazione con Docker</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-16 flex flex-col mb-5 md:mb-0">
        <div className="container mx-auto px-4 flex-1">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-center">
              My Projects
            </h2>
            {additionalProjects.length > 0 && (
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-500 transform hover:scale-110 active:scale-95"
              >
                {showAllProjects ? 'Show Less' : 'View All Projects'}
              </button>
            )}
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
              {allProjects.map((project, index) => (
                <div
                  key={project.title}
                  className={`transition-all duration-1000 ease-in-out transform origin-top ${
                    showAllProjects || index < 3
                      ? 'opacity-100 translate-y-0 scale-100 max-h-[1000px] mb-6'
                      : 'opacity-0 -translate-y-16 scale-95 max-h-0 mb-0'
                  }`}
                >
                  <div className={`h-full transition-all duration-1000 ease-in-out ${
                    showAllProjects || index < 3 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-8'
                  }`}>
                    <ProjectCard
                      {...project}
                      onImageClick={(image) => setSelectedImage(image)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 overflow-y-auto">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill}
                skill={skill}
                index={index}
                isLoaded={isLoaded}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact" className="min-h-[75vh] flex items-center justify-center pt-6 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-5 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Contact Me
            </h2>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              {formStatus === 'success' ? (
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
                  <p className="text-white font-medium">Messaggio inviato con successo! Ti risponderò al più presto.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Nome
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="Il tuo nome"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="La tua email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                      Oggetto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="Oggetto del messaggio"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Messaggio
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white resize-none"
                      placeholder="Il tuo messaggio..."
                      required
                    ></textarea>
                  </div>

                  {formStatus === 'error' && (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-2 mb-2">
                      <p className="text-red-200 text-sm">{errorMessage || 'Si è verificato un errore. Riprova più tardi.'}</p>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className={`px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 ${formStatus === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {formStatus === 'sending' ? 'Invio in corso...' : 'Invia Messaggio'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-3 text-center text-gray-400 text-sm mb-5">
        &copy; {new Date().getFullYear()} Alessio Abrugiati | Powered by ☕Caffeine and 👨🏻‍💻Code
      </div>

      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Torna su"
      >
        &uarr; Torna su
      </button>

      {/* Modal per visualizzare le immagini */}
      {selectedImage && (
        <ImageModal 
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage || ''}
          alt="Project preview"
        />
      )}

      {/* Popup consenso cookie */}
      {!cookieConsentAccepted && <CookieConsent onAccept={handleCookieConsent} />}
    </div>
  );
}

export default App;
