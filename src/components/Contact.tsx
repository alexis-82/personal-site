const LINKS = [
  { label: 'email', k: 'alessioabrugiati@gmail.com', href: 'mailto:alessioabrugiati@gmail.com' },
  { label: 'github', k: '@alexis-82', href: 'https://github.com/alexis-82' },
  { label: 'linkedin', k: '/in/alessio-abrugiati', href: 'https://www.linkedin.com/in/alessio-abrugiati/' },
  { label: 'sito legacy', k: 'alexis82.it', href: 'https://www.alexis82.it' },
];

export default function Contact() {
  return (
    <section id="contact" className="section-pad bg-cyan text-ink">
      <div className="wrap">
        <div className="prompt">$ ./contact.sh</div>
        <h2 className="h2">parliamo.</h2>

        <div
          className="border-[3px] border-ink bg-ink text-paper p-[22px] shadow-sticker text-[15px] max-w-[720px]"
          role="group"
          aria-label="Terminale contatti"
        >
          <div className="text-lime">
            login as: alessio
            <span className="caret bg-lime ml-1" aria-hidden="true" />
          </div>
          <div className="text-magenta">password: **********************</div>
          <div className="mt-2.5 text-paper">
            Ultimo accesso da un browser curioso. Scegli un canale qui sotto e
            scrivimi due righe — rispondo in giornata quando posso.
          </div>
        </div>

        <div className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2 max-w-[720px]">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener"
              className="bg-paper border-[3px] border-ink shadow-sticker-sm px-4 py-3.5 flex justify-between items-center font-bold transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker"
            >
              <span>{l.label}</span>
              <span className="text-violet font-normal text-[13px]">{l.k}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
