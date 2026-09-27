interface Project {
  id: string;
  kind: string;
  title: string;
  desc: string;
  tech: string[];
  links: { label: string; href: string }[];
  lbl: string;
}

const PROJECTS: Project[] = [
  {
    id: '0x01',
    kind: 'web · self-host',
    title: 'FlowFiles',
    desc: 'File browser multilingua per gestire i propri file direttamente dal web, container-ready.',
    tech: ['Express', 'Node.js', 'React', 'TypeScript', 'Docker'],
    links: [{ label: 'source →', href: 'https://github.com/alexis-82/flowfiles' }],
    lbl: 'bg-magenta text-paper',
  },
  {
    id: '0x02',
    kind: 'desktop · audio',
    title: 'DBPrecision',
    desc: 'Editor di volume per file MP3 con precisione in decibel. Interfaccia Qt6, motore FFmpeg.',
    tech: ['Python', 'FFmpeg', 'Qt6'],
    links: [{ label: 'source →', href: 'https://github.com/alexis-82/dbprecision' }],
    lbl: 'bg-cyan text-ink',
  },
  {
    id: '0x03',
    kind: 'mobile · android',
    title: 'SpesaSmart',
    desc: 'App Android per tenere sotto controllo la spesa quotidiana senza fogli Excel abbandonati.',
    tech: ['React Native'],
    links: [{ label: 'source →', href: 'https://github.com/alexis-82/SpesaSmart' }],
    lbl: 'bg-lime text-ink',
  },
  {
    id: '0x04',
    kind: 'desktop · cli',
    title: 'suiteAV',
    desc: 'Downloader audio/video multi-piattaforma per Windows 10/11 e Linux, con GUI e script.',
    tech: ['Python', 'yt-dlp', 'Shell'],
    links: [
      { label: 'win →', href: 'https://github.com/alexis-82/suiteAV-win' },
      { label: 'linux →', href: 'https://github.com/alexis-82/suiteAV' },
    ],
    lbl: 'bg-tangerine text-paper',
  },
  {
    id: '0x05',
    kind: 'desktop · virt',
    title: 'sQemu64',
    desc: 'Front-end grafico per QEMU/KVM. Emulare sistemi senza toccare la command line ogni volta.',
    tech: ['Python', 'Shell', 'QEMU', 'KVM'],
    links: [{ label: 'source →', href: 'https://github.com/alexis-82/sqemu64' }],
    lbl: 'bg-violet text-paper',
  },
  {
    id: '0x06',
    kind: 'web · auth',
    title: 'Login System',
    desc: 'Sistema login/registrazione con JWT e refresh tokens, pronto da montare come base progetto.',
    tech: ['Node.js', 'Express', 'React', 'JWT', 'Docker'],
    links: [{ label: 'source →', href: 'https://github.com/alexis-82/login-system' }],
    lbl: 'bg-ink text-lime',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-pad bg-paper">
      <div className="wrap">
        <div className="prompt">$ ls -la projects/</div>
        <h2 className="h2">cose che ho costruito.</h2>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ p }: { p: Project }) {
  return (
    <article className="group border-[3px] border-ink shadow-sticker bg-paper flex flex-col min-h-[260px] relative transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker-lg">
      <div className={`flex justify-between items-center px-3.5 py-2.5 border-b-[3px] border-ink text-[13px] font-bold ${p.lbl}`}>
        <span>[{p.id}]</span>
        <span>{p.kind}</span>
      </div>
      <h3 className="text-[22px] font-bold px-3.5 pt-4 pb-1.5 tracking-tight">
        {p.title}
      </h3>
      <p className="px-3.5 pb-3.5 text-sm text-ink/70">{p.desc}</p>
      <div className="flex flex-wrap gap-1.5 px-3.5 pb-3.5 mt-auto text-xs">
        {p.tech.map((t) => (
          <span key={t} className="border-2 border-ink px-2 py-[2px] bg-paper">
            {t}
          </span>
        ))}
      </div>
      <div className="border-t-[3px] border-ink px-3.5 py-2.5 flex gap-3.5 text-[13px] font-bold">
        {p.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener"
            className="border-b-2 border-transparent hover:border-current"
          >
            {l.label}
          </a>
        ))}
      </div>
    </article>
  );
}
