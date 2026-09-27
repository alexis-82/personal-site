import { useTypewriter } from '../hooks/useTypewriter';

const ROLES = [
  'full_stack_developer',
  'devops',
  'linux_sysadmin',
  'open_source_dev',
];

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-ink text-lime border-b-[3px] border-ink pt-20 pb-20 px-6"
    >
      <div className="wrap relative z-[2]">
        <div className="text-cyan text-sm mb-6">
          ABRUGIATI/OS v.2026
          <span className="text-magenta mx-2">·</span>
          build 0xC0FFEE
          <span className="text-magenta mx-2">·</span>
          italy
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_.65fr] gap-9 lg:gap-14 items-center">
          <div>
            <h1
              className="font-pixel text-paper leading-[0.9] tracking-[0.01em] mb-3 break-words"
              style={{ fontSize: 'clamp(64px, 12vw, 160px)' }}
            >
              alessio_
              <br />
              abrugiati
            </h1>
            <div
              className="text-magenta font-bold min-h-[1.4em]"
              style={{ fontSize: 'clamp(18px, 2.5vw, 26px)' }}
              aria-label="Ruolo"
            >
              <span>{role}</span>
              <span className="caret bg-magenta ml-0.5" aria-hidden="true" />
            </div>
          </div>

          <Avatar />
        </div>

        <div className="mt-10 text-sm text-paper max-w-[640px]" aria-hidden="true">
          <div className="whitespace-nowrap overflow-hidden">
            [<span className="text-lime">  ok  </span>] mounting /home/alessio                     ...done
          </div>
          <div className="whitespace-nowrap overflow-hidden">
            [<span className="text-lime">  ok  </span>] loading react + node + python modules       ...done
          </div>
          <div className="whitespace-nowrap overflow-hidden">
            [<span className="text-tangerine">  ~~  </span>] importing coffee.sh from /usr/local/bin      ...still
          </div>
          <div className="whitespace-nowrap overflow-hidden">
            boot: <span className="boot-bar" aria-hidden="true" /> 100%
          </div>
        </div>

        <div className="mt-9 pt-6 border-t border-dashed border-paper/35 grid gap-y-3 gap-x-6 text-[13px] text-paper" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <div><span className="text-cyan">uptime</span>: since 2010</div>
          <div><span className="text-cyan">role</span>: full stack + sysadmin linux</div>
          <div><span className="text-cyan">status</span>: open to collab</div>
          <div><span className="text-cyan">fuel</span>: caffeina + curiosità</div>
        </div>
      </div>
    </section>
  );
}

function Avatar() {
  return (
    <div className="relative w-[min(320px,78vw)] aspect-square justify-self-center lg:justify-self-end">
      {/* magenta disc offset */}
      <div
        className="absolute inset-0 rounded-full bg-magenta"
        style={{ transform: 'translate(10px, 10px)', zIndex: 1 }}
        aria-hidden="true"
      />
      {/* cyan halftone rays */}
      <div
        className="absolute inset-0 rounded-full opacity-[0.35]"
        style={{
          transform: 'translate(-8px, -8px)',
          zIndex: 0,
          background:
            'repeating-conic-gradient(from 0deg, #00D4FF 0deg 6deg, transparent 6deg 12deg)',
        }}
        aria-hidden="true"
      />
      <img
        src="/profile.webp"
        alt="Foto di Alessio Abrugiati"
        width={640}
        height={640}
        loading="eager"
        decoding="async"
        className="relative w-full h-full object-cover rounded-full border-[3px] border-ink bg-paper block"
        style={{ zIndex: 2, filter: 'saturate(1.05) contrast(1.02)' }}
      />
      <span
        className="absolute z-[3] bottom-2 -right-2 bg-lime text-ink border-[3px] border-ink shadow-sticker-sm px-2.5 py-1 text-xs font-bold"
        style={{ transform: 'rotate(4deg)' }}
      >
        ./whoami
      </span>
    </div>
  );
}
