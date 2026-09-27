const SPECS = [
  { k: 'location', v: 'Italia' },
  { k: 'lingue', v: 'IT, EN' },
  { k: 'editor', v: 'VSCode + Vim' },
  { k: 'os', v: 'Linux (Arch btw)' },
  { k: 'shell', v: 'zsh, bash' },
  { k: 'musica', v: 'synth, jazz, math-rock' },
];

export default function About() {
  return (
    <section id="about" className="section-pad bg-magenta text-ink">
      <div className="wrap">
        <div className="prompt">$ cat readme.md</div>
        <h2 className="h2">ciao, sono alessio.</h2>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-3.5 max-w-[64ch]">
            <p>
              Sviluppo web full stack — soprattutto React sul front, Node.js e
              Python sul back — e faccio anche il sysadmin Linux quando serve.
              Mi piacciono le cose scritte bene, che partono al primo colpo, e
              che si possono capire leggendo il codice.
            </p>
            <p>
              Contribuisco all'open source e credo che condividere strumenti
              sia il modo più efficiente di imparare. Quando non sto compilando
              qualcosa, ricreo scenari in Home Lab con macchine virtuali.
            </p>
            <p>
              Sto cercando progetti che abbiano un obiettivo chiaro e utenti
              veri. Se hai qualcosa da costruire, scrivimi due righe.
            </p>
          </div>

          <aside className="border-[3px] border-ink bg-paper p-5 shadow-sticker-sm text-sm">
            <h3 className="text-sm mb-2 font-bold">// specs.txt</h3>
            <ul className="mt-2.5 list-none">
              {SPECS.map((s, i) => (
                <li
                  key={s.k}
                  className={`py-[3px] ${i < SPECS.length - 1 ? 'border-b border-dashed border-ink/25' : ''}`}
                >
                  <span className="text-violet mr-2">{s.k}</span>
                  {s.v}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
