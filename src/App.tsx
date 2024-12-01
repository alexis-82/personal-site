import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Terminal from './components/Terminal';
import ProjectCard from './components/ProjectCard';
import ContactLink from './components/ContactLink';
import SkillCard from './components/SkillCard';
import ProfileImage from './components/ProfileImage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const projects = [
    {
      title: "Login System",
      description: "Sistema di Login e Registrazione",
      tech: ["Node.js", "Express", "React", "JWT", "Docker"],
      github: "https://github.com/alexis-82/login-system",
      // live: "https://demo.com"
    },
    {
      title: "Gestione Utenti",
      description: "Gestione degli utenti su database MySQL",
      tech: ["Express", "Node.js", "React", "MySQL", "Docker"],
      github: "https://github.com/alexis-82/Progetti-FullStack-ITS/tree/main/gestione_utenti",
      // live: "https://demo.com"
    },
    {
      title: "suiteAV",
      description: "Programma Downloader per Windows10/11 e Linux",
      tech: ["Python", "yt-dlp", "Node.js"],
      github: "https://github.com/alexis-82/suiteAV-win",
      github2: "https://github.com/alexis-82/suiteAV",
      // live: "https://demo.com"
    }
  ];

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
    <div className="min-h-screen bg-gray-950 text-white w-full bg-cover bg-center">
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
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>

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
        2024 Alessio Abrugiati | Powered by Caffeine and Code
      </div>
    </div>
  );
}

export default App;