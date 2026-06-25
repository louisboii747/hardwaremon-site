"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Box, Cpu, Gauge, MemoryStick, Radio, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const streams = [
  { label: "CPU", value: "28%", colour: "cyan" },
  { label: "GPU", value: "61°", colour: "amber" },
  { label: "RAM", value: "11.8 GB", colour: "violet" },
  { label: "NET", value: "842 Mb/s", colour: "green" },
];

function createSignalPath(offset = 0) {
  return Array.from({ length: 34 }, (_, index) => {
    const x = Number(((index / 33) * 900).toFixed(2));
    const wave =
      Math.sin(index * 0.68 + offset) * 38 +
      Math.cos(index * 0.22 + offset) * 22 +
      (index % 7 === 0 ? 28 : 0);

    const y = Number((165 - wave).toFixed(2));

    return `${x},${y}`;
  }).join(" ");
}

export default function CinematicHero() {
  const primarySignalPath = createSignalPath(0);
  const secondarySignalPath = createSignalPath(2.4);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 24 });
  const panelTransform = useMotionTemplate`perspective(1400px) rotateX(${smoothY}deg) rotateY(${smoothX}deg)`;
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const update = () =>
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="top"
      className="hero"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 4);
        mouseY.set(-((event.clientY - rect.top) / rect.height - 0.5) * 3);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-aurora hero-aurora-one" aria-hidden="true" />
      <div className="hero-aurora hero-aurora-two" aria-hidden="true" />
      <div className="telemetry-particles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            key={index}
            style={
              {
                "--x": `${8 + ((index * 29) % 88)}%`,
                "--y": `${10 + ((index * 43) % 80)}%`,
                "--delay": `${(index % 8) * -0.7}s`,
                "--duration": `${7 + (index % 6)}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="hero-copy">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <span className="status-pulse" />
          Built in the open. Made for real desktops.
          <span>Windows · Linux</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Ever wonder what your
          <br />
          <span>computer is doing?</span>
        </motion.h1>

        <motion.p initial={false}>
          HardwareMon puts the useful answers in one place: what is busy, what is hot, what is
          slowing down, and what happened while you were not looking.
        </motion.p>

        <motion.div className="hero-actions" initial={false}>
          <a className="button button-primary" href="#download">
            Get HardwareMon
            <ArrowDown size={16} />
          </a>
          <a className="button button-ghost" href="#demo">
            Click around the demo
            <span aria-hidden="true">↗</span>
          </a>
        </motion.div>

        <motion.div className="hero-proof" initial={false}>
          <span>
            <ShieldCheck size={14} />
            Free forever
          </span>
          <span>
            <Box size={14} />
            Windows + Linux
          </span>
          <span>
            <Radio size={14} />
            No account
          </span>
        </motion.div>
      </div>

      <motion.div
        className="hero-console-wrap"
        initial={{ opacity: 0, x: 80, scale: 0.92 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.25, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
        style={{ transform: panelTransform }}
      >
        <div className="console-halo" aria-hidden="true" />
        <div className="hero-console">
          <div className="console-topbar">
            <div className="console-brand">
              <span className="brand-mark">H</span>
              <span>
                HardwareMon
                <small>COMMAND CENTRE</small>
              </span>
            </div>
            <div className="console-clock">
              <span>LOCAL</span>
              {clock}
            </div>
          </div>

          <div className="console-body">
            <aside className="console-rail" aria-label="Preview navigation">
              <button className="active" type="button" aria-label="Overview">
                <Gauge size={17} />
              </button>
              <button type="button" aria-label="CPU">
                <Cpu size={17} />
              </button>
              <button type="button" aria-label="Memory">
                <MemoryStick size={17} />
              </button>
              <span />
              <small>HM</small>
            </aside>

            <div className="console-main">
              <div className="console-heading">
                <div>
                  <small>PRIMARY WORKSTATION</small>
                  <h2>System overview</h2>
                </div>
                <div className="live-chip">
                  <span className="status-pulse" />
                  Live
                </div>
              </div>

              <div className="hero-metrics">
                {streams.map((stream) => (
                  <div className={`hero-metric metric-${stream.colour}`} key={stream.label}>
                    <span>{stream.label}</span>
                    <strong>{stream.value}</strong>
                    <small>Nominal</small>
                  </div>
                ))}
              </div>

              <div className="hero-chart">
                <div className="chart-label">
                  <span>Performance activity</span>
                  <small>Last 60 seconds</small>
                </div>
                <svg viewBox="0 0 900 260" role="img" aria-label="Animated live performance graph">
                  <defs>
                    <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#70f5ff" stopOpacity=".24" />
                      <stop offset="100%" stopColor="#70f5ff" stopOpacity="0" />
                    </linearGradient>
                    <filter id="heroGlow">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g className="chart-grid-lines">
                    {[42, 92, 142, 192, 242].map((y) => (
                      <line key={y} x1="0" x2="900" y1={y} y2={y} />
                    ))}
                  </g>
                  <polygon points={`0,260 ${primarySignalPath} 900,260`} fill="url(#heroArea)" />

                  <polyline
                    className="signal-line"
                    points={primarySignalPath}
                    filter="url(#heroGlow)"
                  />

                  <polyline className="signal-line signal-secondary" points={secondarySignalPath} />
                </svg>
              </div>

              <div className="console-footer">
                <span>
                  <i className="status-pulse" /> Sensors online
                </span>
                <span>42 sources</span>
                <span>8 ms refresh</span>
              </div>
            </div>
          </div>
        </div>
        <div className="floating-readout readout-left">
          <span>CPU PACKAGE</span>
          <strong>48°</strong>
          <small>+2.4° / 1m</small>
        </div>
        <div className="floating-readout readout-right">
          <span>UPLINK</span>
          <strong>8.2 ms</strong>
          <small>Stable route</small>
        </div>
      </motion.div>

      <a className="hero-scroll-cue" href="#platform">
        <span>There is a lot more down here</span>
        <ArrowDown size={15} />
      </a>
    </section>
  );
}
