const ROWS: { k: string; v: string }[] = [
  { k: 'frontend      ', v: 'React, TypeScript, Vite, TailwindCSS' },
  { k: 'backend       ', v: 'Node.js, Express, Python, REST APIs' },
  { k: 'database      ', v: 'PostgreSQL, MySQL, SQLite, MongoDB' },
  { k: 'infra         ', v: 'Docker, docker-compose, nginx, systemd' },
  { k: 'linux         ', v: 'bash, zsh, cron, iptables, ssh-hardening' },
  { k: 'tools         ', v: 'git, vim, vscode, make, ffmpeg' },
];

export default function Skills() {
  return (
    <section id="skills" className="section-pad bg-lime text-ink">
      <div className="wrap">
        <div className="prompt">$ cat /proc/skills</div>
        <h2 className="h2">lo stack.</h2>

        <pre
          className="font-mono text-sm leading-[1.75] bg-ink text-lime p-5 border-[3px] border-ink shadow-sticker overflow-x-auto whitespace-pre"
          aria-label="Elenco competenze"
        >
          <span className="text-magenta">
            {'// stack.conf — cosa uso davvero, e con quale livello'}
          </span>
          {'\n\n'}
          {ROWS.map((r) => (
            <span key={r.k}>
              {r.k}
              <span className="text-cyan">= </span>
              <span className="text-paper">{r.v}</span>
              {'\n'}
            </span>
          ))}
          {'\n'}
          <span className="text-magenta">{'// currently learning'}</span>
          {'\n'}
          {'cloud         '}
          <span className="text-cyan">= </span>
          <span className="text-paper">
            Certificazioni AWS, Kubernetes, CI/CD, Terraform
          </span>
        </pre>

        <div className="mt-4 text-[13px] max-w-[60ch]">
          Nessuna barra percentuale al 87% con animazione. Le competenze si
          giudicano dai progetti sopra — quelle sono il benchmark reale.
        </div>
      </div>
    </section>
  );
}
