import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Terminal from './components/Terminal';
import ProjectCard from './components/ProjectCard';
import ContactLink from './components/ContactLink';
import SkillCard from './components/SkillCard';
import ProfileImage from './components/ProfileImage';
import ImageModal from './components/ImageModal';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const featuredProjects = [
    {
      title: "FlowFiles v1.2.0",
      description: "File Browser per la gestione dei file da web",
      tech: ["Express", "Node.js", "React", "TypeScript", "Docker"],
      github: "https://github.com/alexis-82/flowfiles.git",
      image: "images/projects/flowfiles.png"
    },
    {
      title: "Login System v1.0.0",
      description: "Sistema di Login e Registrazione",
      tech: ["Node.js", "Express", "React", "JWT", "Docker"],
      github: "https://github.com/alexis-82/login-system",
      image: "images/projects/login-system-min.png"
    },
    {
      title: "SpesaSmart v1.3.0",
      description: "Applicazione mobile Android per la gestione delle spese",
      tech: ["React Native"],
      github: "https://github.com/alexis-82/SpesaSmart",
      image: "images/projects/spesasmart.jpg"
    }
  ];

  const additionalProjects = [
    {
      title: "suiteAV v3.0.0",
      description: "Programma Downloader per Windows10/11 e Linux",
      tech: ["Python", "yt-dlp", "Shell", "Bash"],
      github: "https://github.com/alexis-82/suiteAV-win",
      github2: "https://github.com/alexis-82/suiteAV",
      image: "images/projects/suiteav-min.png"
    },
    {
      title: "sQemu64",
      description: "Programma per l'emulazione di sistemi operativi",
      tech: ["Python", "Shell", "Qemu", "KVM", "Virtualization"],
      github: "https://github.com/alexis-82/sqemu64",
      image: "https://i.postimg.cc/rpdyR328/Istantanea-2022-01-30-22-10-35.png"
    },
  ];

  const allProjects = [...featuredProjects, ...additionalProjects];
  const displayedProjects = showAllProjects ? allProjects : featuredProjects;

  const contacts = [
    { Icon: Github, href: "https://github.com/alexis-82", label: "GitHub Profile" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/alessio-abrugiati/", label: "LinkedIn Profile" },
    { Icon: Mail, href: "mailto:alessioabrugiati@gmail.com", label: "Email Contact" }
  ];

  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js",
    "Python", "Database", "Docker", "SysAdmin Linux"
  ];

  return (
    <div className={`min-h-screen bg-gray-950 text-white ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <div className="relative overflow-hidden min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-blue-800/20" />
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 py-10">
          <nav className="flex justify-end items-center mb-20">
            <div className="flex gap-6">
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
          </nav>

          <div className={`transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Full Stack Developer
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              Creare esperienze digitali con codice pulito e soluzioni innovative.
              Specializzato in React, Node.js e architettura cloud.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-96">
              <Terminal />
              <ProfileImage />
            </div>
          </div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
            <p className="text-gray-300 leading-relaxed">
            👋 Ciao sono Alessio, un Full Stack Developer appassionato di tecnologia e innovazione. La mia esperienza spazia dallo sviluppo web alla gestione di sistemi Linux, con un focus particolare sulla creazione di soluzioni efficienti e scalabili.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Ho una forte passione per l'open source e credo nel potere della condivisione della conoscenza. Quando non sto scrivendo codice, mi piace esplorare nuove tecnologie e contribuire alla community degli sviluppatori.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Le mie competenze principali includono:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Sviluppo Web Full Stack con React e Node.js</li>
              <li>Amministrazione di sistemi Linux</li>
              <li>Gestione database e ottimizzazione delle performance</li>
              <li>Containerizzazione con Docker</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              My Projects
            </h2>
            {additionalProjects.length > 0 && (
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-500 transform hover:scale-110 active:scale-95"
              >
                {showAllProjects ? 'Show Less' : 'View All Projects'}
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project, index) => (
              <div
                key={project.title}
                className={`transition-all duration-1000 ease-in-out transform origin-top ${
                  showAllProjects || index < 3
                    ? 'opacity-100 translate-y-0 scale-100 max-h-[1000px] mb-6'
                    : 'opacity-0 -translate-y-16 scale-95 max-h-0 mb-0'
                }`}
              >
                <div className={`transition-all duration-1000 ease-in-out ${
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
      </section>

      {/* Skills Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Tech Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

      {/* Footer */}
      <div className="container mx-auto px-4 py-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Alessio Abrugiati | Powered by Caffeine and Code
      </div>

      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Torna su"
      >
        ↑ Torna su
      </button>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage || ''}
        alt="Project preview"
      />
    </div>
  );
}

export default App;
