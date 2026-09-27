export default function Footer() {
  return (
    <footer className="bg-ink text-paper px-6 py-5 text-[13px] flex justify-between flex-wrap gap-2.5">
      <div>
        &copy; <span className="text-lime">2026</span> alessio abrugiati{' '}
        <span className="text-magenta">·</span> built with{' '}
        <span className="text-lime">React</span>,{' '}
        <span className="text-magenta">Tailwind CSS</span> &amp;{' '}
        <span className="text-lime">caffeine</span>
      </div>
      <div>
        v.2026 ·{' '}
        <a href="#home" className="text-lime">
          back to top ↑
        </a>
      </div>
    </footer>
  );
}
