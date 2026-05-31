import MagneticButton from "../ui/magnetic-button";

export default function FloatingNavbar() {
  return (
    <header className="fixed left-1/2 top-6 z-50 w-[90%] max-w-6xl -translate-x-1/2">
      <div
        className="
          flex items-center justify-between
          rounded-2xl border border-white/10
          bg-white/5 px-6 py-4
          backdrop-blur-xl
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-cyan-400" />

          <span className="text-sm font-medium tracking-wide text-white/90">
            HardwareMon
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="https://github.com/louisboii747/HardwareMon/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Download
          </a>

          <a
            href="https://github.com/louisboii747/HardwareMon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 transition hover:text-white"
          >
            GitHub
          </a>
        </nav>

        {/* CTA */}
        <MagneticButton>
          <a
            href="https://github.com/louisboii747/HardwareMon"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block
              rounded-2xl border border-white/10
              bg-white/5 px-6 py-3
              text-sm text-white
              backdrop-blur-md transition
              hover:bg-white/10
            "
          >
            View GitHub
          </a>
        </MagneticButton>
      </div>
    </header>
  );
}