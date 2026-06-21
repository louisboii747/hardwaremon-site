"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowDownToLine,
  CirclePlay,
  Command,
  GitBranch,
  History,
  MonitorCog,
  Moon,
  Network,
  Search,
  SunMedium,
  X,
} from "lucide-react";
import Lenis from "lenis";
import { useEffect, useState } from "react";

const commands = [
  { label: "Open the desktop demo", href: "#demo", icon: MonitorCog },
  { label: "Run the demo system scan", href: "#system-scan", icon: CirclePlay },
  { label: "Replay a performance incident", href: "#incident-replay", icon: Activity },
  { label: "Explore historical analytics", href: "#telemetry-studio", icon: History },
  { label: "Try the workload lab", href: "#workload-lab", icon: Command },
  { label: "See where the bandwidth is going", href: "#network", icon: Network },
  { label: "Download HardwareMon", href: "#download", icon: ArrowDownToLine },
  {
    label: "View HardwareMon on GitHub",
    href: "https://github.com/louisboii747/HardwareMon",
    icon: GitBranch,
    external: true,
  },
];

export default function SiteExperience() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [lunarMode, setLunarMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.86,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((current) => !current);
      }
      if (event.key === "Escape") setPaletteOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 80);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.environment = lunarMode ? "lunar" : "noir";
  }, [lunarMode]);

  const chooseCommand = () => setPaletteOpen(false);

  return (
    <>
      <header className={`floating-nav ${scrolled ? "is-scrolled" : ""}`}>
        <a className="nav-brand" href="#top" aria-label="HardwareMon home">
          <span className="brand-mark" aria-hidden="true">
            H
          </span>
          <span>HardwareMon</span>
          <small>Open source</small>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#demo">Product</a>
          <a href="#telemetry-studio">Analytics</a>
          <a href="#open-source">Open source</a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => setLunarMode((current) => !current)}
            aria-label={lunarMode ? "Switch to noir environment" : "Switch to lunar environment"}
          >
            {lunarMode ? <Moon size={16} /> : <SunMedium size={16} />}
          </button>
          <button className="command-button" type="button" onClick={() => setPaletteOpen(true)}>
            <Search size={15} />
            <span>Jump to</span>
            <kbd>Ctrl K</kbd>
          </button>
          <a className="nav-download" href="#download">
            Download
          </a>
        </div>
      </header>

      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            className="command-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setPaletteOpen(false);
            }}
          >
            <motion.div
              className="command-palette"
              role="dialog"
              aria-modal="true"
              aria-label="HardwareMon command palette"
              initial={{ opacity: 0, y: -18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
            >
              <div className="command-input">
                <Command size={18} />
                <span>Where would you like to go?</span>
                <button type="button" onClick={() => setPaletteOpen(false)} aria-label="Close">
                  <X size={17} />
                </button>
              </div>
              <div className="command-list">
                <p>Navigate</p>
                {commands.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      onClick={chooseCommand}
                    >
                      <Icon size={17} />
                      <span>{item.label}</span>
                      <small>↵</small>
                    </a>
                  );
                })}
              </div>
              <div className="command-status">
                <Activity size={14} />
                <span>All systems ready</span>
                <span className="status-pulse" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
