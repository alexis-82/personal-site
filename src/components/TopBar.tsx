export default function TopBar() {
  return (
    <header
      className="sticky top-0 z-50 bg-ink text-paper border-b-[3px] border-ink flex justify-between items-center px-5 py-2 text-[13px]"
      role="banner"
    >
      <div className="flex items-center gap-3.5">
        <span className="flex gap-2" aria-hidden="true">
          <i className="w-3 h-3 inline-block bg-magenta" />
          <i className="w-3 h-3 inline-block bg-tangerine" />
          <i className="w-3 h-3 inline-block bg-lime" />
        </span>
        <span>
          ~/abrugiati <span className="text-lime">$</span>
        </span>
      </div>
      <nav className="flex gap-4 flex-wrap" aria-label="Sezioni">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="hover:text-lime"
        >
          ./about
        </a>
        <a href="#projects" className="hover:text-lime">./projects</a>
        <a href="#skills" className="hover:text-lime">./skills</a>
        <a href="#contact" className="hover:text-lime">./contact</a>
      </nav>
    </header>
  );
}
