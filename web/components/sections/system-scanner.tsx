"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Cpu,
  HardDrive,
  MemoryStick,
  MonitorCog,
  Network,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const scanSteps = [
  { label: "Processor", value: "Intel Core i7-12700KF", icon: Cpu, colour: "#70f5ff" },
  { label: "Graphics", value: "NVIDIA RTX 4080 SUPER", icon: Sparkles, colour: "#ffb44c" },
  { label: "Memory", value: "32 GB DDR5 · 6000 MHz", icon: MemoryStick, colour: "#bd77ff" },
  { label: "Storage", value: "3 drives · 5 TB total", icon: HardDrive, colour: "#70f5ff" },
  { label: "Network", value: "2.5 GbE · 8.2 ms", icon: Network, colour: "#7cf5b2" },
];

export default function SystemScanner() {
  const [status, setStatus] = useState<"idle" | "scanning" | "complete">("idle");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (status !== "scanning") return;

    const timer = window.setInterval(() => {
      setStep((current) => {
        if (current >= scanSteps.length - 1) {
          window.clearInterval(timer);
          setStatus("complete");
          return current;
        }
        return current + 1;
      });
    }, 620);

    return () => window.clearInterval(timer);
  }, [status]);

  const startScan = () => {
    setStep(0);
    setStatus("scanning");
  };

  const progress = status === "idle" ? 0 : status === "complete" ? 100 : ((step + 1) / scanSteps.length) * 100;

  return (
    <section id="system-scan" className="system-scanner-section" aria-labelledby="scanner-title">
      <div className="scanner-copy">
        <div className="section-kicker">
          <span>02</span>
          <span>A quick introduction</span>
        </div>
        <p className="eyebrow">Meet your machine</p>
        <h2 id="scanner-title">
          Want the short version?
          <br />
          <span>Press scan.</span>
        </h2>
        <p>
          This little browser demo uses example hardware, but the real app does the same kind of
          detective work on your desktop: it finds the useful signals, names them clearly, and
          gives you somewhere sensible to start.
        </p>
        <button
          type="button"
          className="button button-primary scanner-start"
          onClick={status === "complete" ? startScan : status === "idle" ? startScan : undefined}
          disabled={status === "scanning"}
        >
          {status === "idle" ? <Play size={16} /> : status === "complete" ? <RotateCcw size={16} /> : <Sparkles size={16} />}
          {status === "idle" ? "Scan the demo machine" : status === "complete" ? "Run it again" : "Looking around…"}
        </button>
        <small className="scanner-note">
          No browser permissions. No data leaves this page. The scan is a visual demo.
        </small>
      </div>

      <div className={`scanner-console scanner-${status}`}>
        <div className="scanner-console-top">
          <span>
            <MonitorCog size={16} /> HardwareMon discovery
          </span>
          <small>{status === "complete" ? "PASSPORT READY" : status === "scanning" ? "SCANNING" : "WAITING"}</small>
        </div>

        <div className="scanner-stage">
          <div className="scanner-radar" aria-hidden="true">
            <i />
            <i />
            <i />
            <motion.b
              animate={status === "scanning" ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 2.2, repeat: status === "scanning" ? Infinity : 0, ease: "linear" }}
            />
            <div>
              <span className="brand-mark">H</span>
              <strong>{Math.round(progress)}%</strong>
              <small>{status === "complete" ? "Mapped" : status === "scanning" ? "Discovering" : "Ready"}</small>
            </div>
          </div>

          <div className="scanner-feed" aria-live="polite">
            {scanSteps.map((item, index) => {
              const Icon = item.icon;
              const discovered = status === "complete" || (status === "scanning" && index <= step);
              const current = status === "scanning" && index === step;
              return (
                <motion.div
                  className={`scanner-feed-row ${discovered ? "is-found" : ""} ${current ? "is-current" : ""}`}
                  key={item.label}
                  animate={{ opacity: discovered ? 1 : 0.3, x: current ? 6 : 0 }}
                >
                  <span style={{ color: item.colour }}>
                    <Icon size={15} />
                  </span>
                  <div>
                    <small>{item.label}</small>
                    <strong>{discovered ? item.value : "Waiting to inspect…"}</strong>
                  </div>
                  {discovered && <Check size={14} />}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="scanner-progress">
          <motion.span animate={{ width: `${progress}%` }} transition={{ duration: 0.35 }} />
        </div>

        <AnimatePresence>
          {status === "complete" && (
            <motion.div
              className="system-passport"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <small>Overall state</small>
                <strong>Everything looks healthy.</strong>
              </div>
              <div>
                <span>12</span>
                <small>CPU threads in use</small>
              </div>
              <div>
                <span>42°C</span>
                <small>Warmest drive</small>
              </div>
              <div>
                <span>184</span>
                <small>Running processes</small>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
