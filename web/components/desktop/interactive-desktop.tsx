"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Boxes,
  Cpu,
  Database,
  Gauge,
  HardDrive,
  Maximize2,
  MemoryStick,
  Network,
  Palette,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type DesktopPage =
  | "Dashboard"
  | "Performance"
  | "Processes"
  | "Network"
  | "Storage"
  | "Customize"
  | "Studio";

const navigation: { label: DesktopPage; icon: typeof Gauge }[] = [
  { label: "Dashboard", icon: Gauge },
  { label: "Performance", icon: Activity },
  { label: "Processes", icon: Boxes },
  { label: "Network", icon: Network },
  { label: "Storage", icon: HardDrive },
  { label: "Customize", icon: Palette },
  { label: "Studio", icon: Database },
];

function Sparkline({
  colour,
  variant = 0,
}: {
  colour: string;
  variant?: number;
}) {
  const points = Array.from({ length: 24 }, (_, index) => {
    const x = (index / 23) * 260;
    const y =
      58 -
      Math.sin(index * 0.65 + variant) * 16 -
      Math.cos(index * 0.31 + variant) * 9 -
      (index % 8 === 0 ? 8 : 0);
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 260 80" aria-hidden="true">
      <polyline points={points} fill="none" stroke={colour} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function DashboardPage() {
  return (
    <div className="desktop-page dashboard-page">
      <div className="desktop-page-heading">
        <div>
          <span>Good evening, Louis</span>
          <h3>Nothing needs your attention right now.</h3>
        </div>
        <span className="desktop-health">
          <i className="status-pulse" /> System healthy
        </span>
      </div>
      <div className="desktop-metric-grid">
        {[
          { label: "CPU load", value: "24%", meta: "4.72 GHz", colour: "#70f5ff", icon: Cpu },
          {
            label: "Memory",
            value: "11.8",
            suffix: "GB",
            meta: "of 32 GB",
            colour: "#bd77ff",
            icon: MemoryStick,
          },
          { label: "GPU", value: "62°", meta: "38% load", colour: "#ffb44c", icon: Sparkles },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              className="desktop-metric-card"
              key={metric.label}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
            >
              <div>
                <span className="metric-icon" style={{ color: metric.colour }}>
                  <Icon size={15} />
                </span>
                <small>{metric.label}</small>
              </div>
              <strong>
                {metric.value}
                {metric.suffix && <em>{metric.suffix}</em>}
              </strong>
              <span>{metric.meta}</span>
              <Sparkline colour={metric.colour} variant={index * 1.4} />
            </motion.div>
          );
        })}
      </div>
      <div className="desktop-bottom-grid">
        <div className="desktop-activity-panel">
          <div className="panel-title">
            <span>Combined activity</span>
            <small>Last 60 seconds</small>
          </div>
          <div className="large-sparkline">
            <Sparkline colour="#70f5ff" />
            <Sparkline colour="#bd77ff" variant={2.2} />
          </div>
          <div className="activity-legend">
            <span>
              <i style={{ background: "#70f5ff" }} /> CPU
            </span>
            <span>
              <i style={{ background: "#bd77ff" }} /> Memory
            </span>
          </div>
        </div>
        <div className="desktop-system-panel">
          <div className="panel-title">
            <span>System</span>
            <small>Live</small>
          </div>
          <dl>
            <div>
              <dt>Uptime</dt>
              <dd>3d 08h</dd>
            </div>
            <div>
              <dt>Processes</dt>
              <dd>184</dd>
            </div>
            <div>
              <dt>Network</dt>
              <dd className="cyan-text">842 Mb/s</dd>
            </div>
            <div>
              <dt>Storage</dt>
              <dd>62%</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function PerformancePage() {
  const gauges = [
    { label: "CPU package", value: 32, unit: "%", colour: "#70f5ff" },
    { label: "Memory pressure", value: 47, unit: "%", colour: "#bd77ff" },
    { label: "GPU engine", value: 68, unit: "%", colour: "#ffb44c" },
  ];

  return (
    <div className="desktop-page performance-page">
      <div className="desktop-page-heading">
        <div>
          <span>Performance</span>
          <h3>Here&apos;s where the work is going.</h3>
        </div>
        <div className="range-pills">
          <button type="button">1m</button>
          <button type="button" className="active">
            5m
          </button>
          <button type="button">1h</button>
        </div>
      </div>
      <div className="gauge-grid">
        {gauges.map((gauge) => (
          <div className="performance-gauge" key={gauge.label}>
            <div
              className="gauge-ring"
              style={
                {
                  "--gauge-value": `${gauge.value * 3.6}deg`,
                  "--gauge-colour": gauge.colour,
                } as React.CSSProperties
              }
            >
              <div>
                <strong>{gauge.value}</strong>
                <small>{gauge.unit}</small>
              </div>
            </div>
            <span>{gauge.label}</span>
            <small>Nominal range</small>
          </div>
        ))}
      </div>
      <div className="performance-detail">
        <div>
          <small>Clock behaviour</small>
          <strong>4.72 GHz</strong>
          <span>Peak 4.91 GHz</span>
        </div>
        <div className="performance-bars">
          {Array.from({ length: 16 }, (_, index) => (
            <i key={index} style={{ height: `${25 + ((index * 37) % 68)}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const processes = [
  ["HardwareMon.exe", "2.8%", "218 MB", "Very low"],
  ["Code.exe", "12.4%", "1.8 GB", "Moderate"],
  ["chrome.exe", "8.9%", "1.2 GB", "Low"],
  ["Discord.exe", "1.2%", "384 MB", "Very low"],
  ["explorer.exe", "0.6%", "142 MB", "Very low"],
];

function ProcessesPage() {
  return (
    <div className="desktop-page processes-page">
      <div className="desktop-page-heading">
        <div>
          <span>What&apos;s running</span>
          <h3>184 processes. Here&apos;s what is using your machine.</h3>
        </div>
        <button className="desktop-filter" type="button">
          <SlidersHorizontal size={14} /> Filter
        </button>
      </div>
      <label className="process-search">
        <Search size={15} />
        <span>Search running processes…</span>
        <kbd>⌘ F</kbd>
      </label>
      <div className="process-table" role="table" aria-label="Example running processes">
        <div className="process-row process-header" role="row">
          <span>Application</span>
          <span>CPU</span>
          <span>Memory</span>
          <span>Power usage</span>
        </div>
        {processes.map((process, index) => (
          <motion.div
            className="process-row"
            role="row"
            key={process[0]}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span>
              <i>{process[0].slice(0, 1)}</i>
              {process[0]}
            </span>
            <span>{process[1]}</span>
            <span>{process[2]}</span>
            <span>{process[3]}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function NetworkPage() {
  return (
    <div className="desktop-page network-page">
      <div className="desktop-page-heading">
        <div>
          <span>Where the bandwidth is going</span>
          <h3>Here&apos;s what is moving right now.</h3>
        </div>
        <span className="desktop-health">
          <i className="status-pulse" /> Connected
        </span>
      </div>
      <div className="network-readouts">
        <div>
          <small>Download</small>
          <strong>842.6</strong>
          <span>Mb/s</span>
        </div>
        <div>
          <small>Upload</small>
          <strong>94.2</strong>
          <span>Mb/s</span>
        </div>
        <div>
          <small>Latency</small>
          <strong>8.2</strong>
          <span>ms</span>
        </div>
      </div>
      <div className="network-desktop-chart">
        <Sparkline colour="#70f5ff" />
        <Sparkline colour="#7cf5b2" variant={3.3} />
        <div className="chart-scan" />
      </div>
      <div className="network-interface">
        <div className="interface-icon">
          <Network size={18} />
        </div>
        <div>
          <strong>Ethernet 2.5G</strong>
          <span>Intel I225-V · 192.168.1.42</span>
        </div>
        <small>2.5 Gbps</small>
      </div>
    </div>
  );
}

function StoragePage() {
  const drives = [
    { name: "System", detail: "NVMe SSD", used: 62, value: "620 GB", colour: "#70f5ff" },
    { name: "Projects", detail: "NVMe SSD", used: 41, value: "820 GB", colour: "#bd77ff" },
    { name: "Archive", detail: "SATA SSD", used: 78, value: "1.56 TB", colour: "#ffb44c" },
  ];
  return (
    <div className="desktop-page storage-page">
      <div className="desktop-page-heading">
        <div>
          <span>Storage</span>
          <h3>Three drives. All healthy.</h3>
        </div>
        <span className="desktop-health">
          <i className="status-pulse" /> All drives healthy
        </span>
      </div>
      <div className="drive-list">
        {drives.map((drive) => (
          <div className="drive-row" key={drive.name}>
            <div className="drive-icon">
              <HardDrive size={18} />
            </div>
            <div className="drive-info">
              <strong>{drive.name}</strong>
              <span>{drive.detail}</span>
            </div>
            <div className="drive-capacity">
              <div>
                <i
                  style={{
                    width: `${drive.used}%`,
                    background: drive.colour,
                    boxShadow: `0 0 16px ${drive.colour}55`,
                  }}
                />
              </div>
              <span>{drive.used}% used</span>
            </div>
            <strong>{drive.value}</strong>
          </div>
        ))}
      </div>
      <div className="storage-stats">
        <div>
          <small>Read speed</small>
          <strong>6.8 GB/s</strong>
        </div>
        <div>
          <small>Write speed</small>
          <strong>5.2 GB/s</strong>
        </div>
        <div>
          <small>Drive temperature</small>
          <strong>42°C</strong>
        </div>
      </div>
    </div>
  );
}

function CustomizePage() {
  const [accent, setAccent] = useState("#70f5ff");
  const [compact, setCompact] = useState(false);

  return (
    <div className={`desktop-page customize-page ${compact ? "compact-preview" : ""}`}>
      <div className="desktop-page-heading">
        <div>
          <span>Customization</span>
          <h3>Set it up your way.</h3>
        </div>
        <span className="desktop-health">Preview mode</span>
      </div>
      <div className="customize-layout">
        <div className="customize-controls">
          <div>
            <small>Interface accent</small>
            <div className="colour-options">
              {["#70f5ff", "#bd77ff", "#ffb44c", "#7cf5b2"].map((colour) => (
                <button
                  key={colour}
                  type="button"
                  aria-label={`Use ${colour} accent`}
                  className={accent === colour ? "active" : ""}
                  style={{ background: colour }}
                  onClick={() => setAccent(colour)}
                />
              ))}
            </div>
          </div>
          <label className="toggle-row">
            <span>
              <strong>Compact density</strong>
              <small>Fit more telemetry on screen</small>
            </span>
            <input
              type="checkbox"
              checked={compact}
              onChange={(event) => setCompact(event.target.checked)}
            />
            <i />
          </label>
          <label className="toggle-row">
            <span>
              <strong>Ambient glow</strong>
              <small>Reactive panel illumination</small>
            </span>
            <input type="checkbox" defaultChecked />
            <i />
          </label>
        </div>
        <div className="layout-preview" style={{ "--preview-accent": accent } as React.CSSProperties}>
          <div className="layout-preview-sidebar" />
          <div className="layout-preview-main">
            <span />
            <div>
              <i />
              <i />
            </div>
            <b />
          </div>
        </div>
      </div>
    </div>
  );
}

function StudioPage() {
  return (
    <div className="desktop-page studio-page">
      <div className="desktop-page-heading">
        <div>
          <span>Telemetry studio</span>
          <h3>Go back to when it felt slow.</h3>
        </div>
        <div className="range-pills">
          <button type="button">1H</button>
          <button type="button" className="active">
            24H
          </button>
          <button type="button">7D</button>
          <button type="button">30D</button>
        </div>
      </div>
      <div className="studio-summary">
        <div>
          <small>Average CPU</small>
          <strong>31.8%</strong>
          <span>−4.2% vs previous</span>
        </div>
        <div>
          <small>Peak temperature</small>
          <strong>74°C</strong>
          <span>16:42 today</span>
        </div>
        <div>
          <small>Samples</small>
          <strong>8,640</strong>
          <span>10 second interval</span>
        </div>
      </div>
      <div className="studio-chart">
        <Sparkline colour="#70f5ff" />
        <Sparkline colour="#bd77ff" variant={2.5} />
        <Sparkline colour="#ffb44c" variant={4.1} />
        <div className="studio-cursor">
          <i />
          <span>16:42 · 68%</span>
        </div>
      </div>
    </div>
  );
}

function ActivePage({ page }: { page: DesktopPage }) {
  switch (page) {
    case "Performance":
      return <PerformancePage />;
    case "Processes":
      return <ProcessesPage />;
    case "Network":
      return <NetworkPage />;
    case "Storage":
      return <StoragePage />;
    case "Customize":
      return <CustomizePage />;
    case "Studio":
      return <StudioPage />;
    default:
      return <DashboardPage />;
  }
}

export default function InteractiveDesktop() {
  const [activePage, setActivePage] = useState<DesktopPage>("Dashboard");
  const [expanded, setExpanded] = useState(false);
  const [clock, setClock] = useState("");
  const currentIndex = useMemo(
    () => navigation.findIndex((item) => item.label === activePage),
    [activePage],
  );

  useEffect(() => {
    const update = () =>
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  return (
    <section id="demo" className="desktop-section" aria-labelledby="desktop-title">
      <div className="section-kicker">
        <span>03</span>
        <span>The part you can actually click</span>
      </div>
      <div className="desktop-section-heading">
        <div>
          <p className="eyebrow">Go on—click around</p>
          <h2 id="desktop-title">
            This is not a screenshot.
            <br />
            <span>It is a working little demo.</span>
          </h2>
        </div>
        <p>
          Open the process list. Change the layout. Inspect a drive. Switch to historical data.
          It is example telemetry, but the controls and the way the app thinks are real.
        </p>
      </div>

      <div className={`desktop-stage ${expanded ? "is-expanded" : ""}`}>
        <div className="desktop-window">
          <div className="desktop-titlebar">
            <div className="window-controls" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="desktop-titlebar-name">
              <span className="brand-mark">H</span>
              HardwareMon
            </div>
            <div className="desktop-window-actions">
              <span>{clock}</span>
              <button
                type="button"
                aria-label={expanded ? "Exit fullscreen demo" : "Expand desktop demo"}
                onClick={() => setExpanded((current) => !current)}
              >
                {expanded ? <X size={15} /> : <Maximize2 size={15} />}
              </button>
            </div>
          </div>
          <div className="desktop-shell">
            <aside className="desktop-sidebar" aria-label="HardwareMon demo pages">
              <div className="desktop-sidebar-brand">
                <span className="brand-mark">H</span>
              </div>
              <div className="desktop-nav">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      className={activePage === item.label ? "active" : ""}
                      onClick={() => setActivePage(item.label)}
                      key={item.label}
                      aria-label={`Open ${item.label}`}
                      aria-pressed={activePage === item.label}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                      {index === currentIndex && <motion.i layoutId="desktop-active-nav" />}
                    </button>
                  );
                })}
              </div>
              <div className="desktop-sidebar-status">
                <span className="status-pulse" />
                <small>42</small>
              </div>
            </aside>
            <div className="desktop-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage}
                  initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ActivePage page={activePage} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <p className="desktop-hint">
        <span className="status-pulse" />
        Live demo · Select a page from the dock
      </p>
    </section>
  );
}
