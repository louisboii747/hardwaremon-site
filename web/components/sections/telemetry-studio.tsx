"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Crosshair, Minus, Plus, ScanLine } from "lucide-react";
import { useMemo, useRef, useState } from "react";

type RangeKey = "1H" | "24H" | "7D" | "30D";

const ranges: Record<RangeKey, { samples: number; average: string; peak: string; label: string }> = {
  "1H": { samples: 42, average: "28.4%", peak: "67%", label: "Last hour" },
  "24H": { samples: 54, average: "31.8%", peak: "81%", label: "Today" },
  "7D": { samples: 66, average: "29.6%", peak: "88%", label: "This week" },
  "30D": { samples: 78, average: "27.2%", peak: "91%", label: "This month" },
};

function makeSeries(length: number, seed: number, scale: number) {
  return Array.from({ length }, (_, index) => {
    const base = 48 + Math.sin(index * 0.43 + seed) * 17 + Math.cos(index * 0.17 + seed) * 10;
    const spike = index % 13 === 0 ? 14 : index % 19 === 0 ? -10 : 0;
    return Math.max(8, Math.min(92, (base + spike) * scale));
  });
}

function toPath(values: number[], width = 1000, height = 360) {
  return values
    .map((value, index) => {
      const x = (index / Math.max(1, values.length - 1)) * width;
      const y = height - (value / 100) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function TelemetryStudio() {
  const [range, setRange] = useState<RangeKey>("24H");
  const [zoom, setZoom] = useState(1);
  const [cursor, setCursor] = useState({ x: 620, index: 33 });
  const chartRef = useRef<HTMLDivElement>(null);
  const current = ranges[range];

  const data = useMemo(() => {
    const count = Math.max(24, Math.round(current.samples * zoom));
    return {
      cpu: makeSeries(count, current.samples * 0.03, 1),
      memory: makeSeries(count, current.samples * 0.06 + 1.4, 0.78),
      gpu: makeSeries(count, current.samples * 0.09 + 3.2, 0.62),
    };
  }, [current.samples, zoom]);

  const pointValue = data.cpu[Math.min(cursor.index, data.cpu.length - 1)] ?? 0;

  return (
    <section id="telemetry-studio" className="telemetry-studio" aria-labelledby="studio-title">
      <div className="section-kicker">
        <span>06</span>
        <span>History, with context</span>
      </div>
      <div className="studio-heading">
        <div>
          <p className="eyebrow">Something felt slow yesterday?</p>
          <h2 id="studio-title">
            You do not have to wait
            <br />
            <span>for it to happen again.</span>
          </h2>
        </div>
        <p>
          Go back an hour, a day, a week, or a month. Compare CPU, GPU, and memory, then move the
          cursor over the exact moment that looked wrong.
        </p>
      </div>

      <div className="studio-workbench">
        <div className="workbench-topbar">
          <div>
            <span className="brand-mark">H</span>
            <span>
              Telemetry Studio
              <small>Historical session</small>
            </span>
          </div>
          <div className="studio-range">
            {(Object.keys(ranges) as RangeKey[]).map((item) => (
              <button
                type="button"
                key={item}
                className={range === item ? "active" : ""}
                onClick={() => setRange(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="zoom-controls">
            <button
              type="button"
              onClick={() => setZoom((value) => Math.max(0.7, value - 0.2))}
              aria-label="Zoom out"
            >
              <Minus size={15} />
            </button>
            <span>{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoom((value) => Math.min(1.7, value + 0.2))}
              aria-label="Zoom in"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>

        <div className="workbench-body">
          <aside className="studio-metrics">
            <p>Signals</p>
            {[
              { label: "CPU total", value: current.average, colour: "#70f5ff", active: true },
              { label: "Memory", value: "11.8 GB", colour: "#bd77ff", active: true },
              { label: "GPU engine", value: "38%", colour: "#ffb44c", active: true },
              { label: "Network", value: "842 Mb/s", colour: "#7cf5b2", active: false },
            ].map((metric) => (
              <button type="button" key={metric.label} className={metric.active ? "active" : ""}>
                <i style={{ background: metric.colour }} />
                <span>
                  {metric.label}
                  <small>{metric.value}</small>
                </span>
                <b />
              </button>
            ))}
            <div className="studio-insight">
              <ScanLine size={18} />
              <span>
                <strong>Pattern found</strong>
                CPU peaks align with GPU load.
              </span>
            </div>
          </aside>

          <div className="studio-chart-area">
            <div className="studio-chart-summary">
              <AnimatePresence mode="wait">
                <motion.div
                  key={range}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <small>{current.label}</small>
                  <strong>{current.average}</strong>
                  <span>Average CPU load</span>
                </motion.div>
              </AnimatePresence>
              <dl>
                <div>
                  <dt>Peak</dt>
                  <dd>{current.peak}</dd>
                </div>
                <div>
                  <dt>Samples</dt>
                  <dd>{current.samples * 120}</dd>
                </div>
                <div>
                  <dt>Continuity</dt>
                  <dd>99.9%</dd>
                </div>
              </dl>
            </div>

            <div
              className="interactive-history-chart"
              ref={chartRef}
              onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
                setCursor({
                  x: ratio * 1000,
                  index: Math.round(ratio * (data.cpu.length - 1)),
                });
              }}
            >
              <svg viewBox="0 0 1000 360" role="img" aria-label={`${range} historical telemetry chart`}>
                <defs>
                  <linearGradient id="studioCpuArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#70f5ff" stopOpacity=".18" />
                    <stop offset="100%" stopColor="#70f5ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <g className="history-grid">
                  {[0, 72, 144, 216, 288, 360].map((y) => (
                    <line key={`y-${y}`} x1="0" x2="1000" y1={y} y2={y} />
                  ))}
                  {[0, 200, 400, 600, 800, 1000].map((x) => (
                    <line key={`x-${x}`} x1={x} x2={x} y1="0" y2="360" />
                  ))}
                </g>
                <path d={`${toPath(data.cpu)} L 1000 360 L 0 360 Z`} fill="url(#studioCpuArea)" />
                <motion.path
                  key={`${range}-${zoom}-cpu`}
                  d={toPath(data.cpu)}
                  className="history-line cpu"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.path
                  key={`${range}-${zoom}-memory`}
                  d={toPath(data.memory)}
                  className="history-line memory"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.08 }}
                />
                <motion.path
                  key={`${range}-${zoom}-gpu`}
                  d={toPath(data.gpu)}
                  className="history-line gpu"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.16 }}
                />
                <line className="history-cursor-line" x1={cursor.x} x2={cursor.x} y1="0" y2="360" />
                <circle
                  className="history-cursor-dot"
                  cx={cursor.x}
                  cy={360 - (pointValue / 100) * 360}
                  r="5"
                />
              </svg>
              <motion.div
                className="history-tooltip"
                animate={{ left: `${Math.max(8, Math.min(82, cursor.x / 10))}%` }}
              >
                <span>
                  <Crosshair size={12} /> Sample {cursor.index + 1}
                </span>
                <strong>{pointValue.toFixed(1)}% CPU</strong>
                <small>Memory {data.memory[cursor.index]?.toFixed(1)}%</small>
              </motion.div>
            </div>
            <div className="history-axis">
              <span>{range === "1H" ? "60m ago" : range === "24H" ? "00:00" : `${range} ago`}</span>
              <span>{range === "24H" ? "06:00" : "25%"}</span>
              <span>{range === "24H" ? "12:00" : "50%"}</span>
              <span>{range === "24H" ? "18:00" : "75%"}</span>
              <span>Now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
