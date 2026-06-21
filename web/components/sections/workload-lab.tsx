"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Braces, CloudDownload, Gamepad2, Moon, Play, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

const workloads = [
  {
    id: "idle",
    label: "Doing nothing",
    short: "Idle",
    icon: Moon,
    colour: "#70f5ff",
    copy: "The fans are quiet, background tasks are ticking over, and there is plenty of headroom.",
    cpu: 8,
    gpu: 3,
    memory: 31,
    network: 2,
    temperature: 39,
  },
  {
    id: "gaming",
    label: "Playing a game",
    short: "Gaming",
    icon: Gamepad2,
    colour: "#ffb44c",
    copy: "The GPU is doing the heavy lifting. CPU load is healthy, so the graphics card is the current limit.",
    cpu: 62,
    gpu: 97,
    memory: 58,
    network: 24,
    temperature: 74,
  },
  {
    id: "compile",
    label: "Building a project",
    short: "Compile",
    icon: Braces,
    colour: "#bd77ff",
    copy: "Every CPU core is busy and memory use is climbing. The GPU has almost nothing to do here.",
    cpu: 96,
    gpu: 6,
    memory: 72,
    network: 4,
    temperature: 81,
  },
  {
    id: "download",
    label: "Downloading something huge",
    short: "Download",
    icon: CloudDownload,
    colour: "#7cf5b2",
    copy: "Network and storage are moving together. CPU, GPU, and temperature remain comfortably low.",
    cpu: 18,
    gpu: 3,
    memory: 39,
    network: 94,
    temperature: 44,
  },
];

export default function WorkloadLab() {
  const [selected, setSelected] = useState("gaming");
  const workload = workloads.find((item) => item.id === selected) ?? workloads[1];

  const heat = useMemo(
    () =>
      Array.from({ length: 96 }, (_, index) => {
        const row = Math.floor(index / 12);
        const column = index % 12;
        const wave = Math.sin(column * 0.8 + row * 0.55 + workload.cpu * 0.02) * 18;
        return Math.max(4, Math.min(100, workload.cpu * 0.55 + workload.gpu * 0.3 + wave + ((index * 13) % 18)));
      }),
    [workload],
  );

  const radarPoints = [
    [50, 50 - workload.cpu * 0.4],
    [50 + workload.gpu * 0.38, 50 - workload.gpu * 0.12],
    [50 + workload.memory * 0.25, 50 + workload.memory * 0.32],
    [50 - workload.network * 0.25, 50 + workload.network * 0.32],
    [50 - workload.temperature * 0.38, 50 - workload.temperature * 0.12],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <section id="workload-lab" className="workload-lab" aria-labelledby="workload-title">
      <div className="workload-heading">
        <div>
          <div className="section-kicker">
            <span>08</span>
            <span>Workload lab</span>
          </div>
          <p className="eyebrow">Try a few different days</p>
          <h2 id="workload-title">
            Your computer looks different
            <br />
            <span>depending on what you ask of it.</span>
          </h2>
        </div>
        <p>
          Pick a workload and watch the whole system fingerprint change. This is the useful bit:
          not simply seeing that a number is high, but understanding whether it makes sense.
        </p>
      </div>

      <div className="workload-tabs" role="tablist" aria-label="Example workloads">
        {workloads.map((item) => {
          const Icon = item.icon;
          return (
            <button
              type="button"
              role="tab"
              aria-selected={selected === item.id}
              className={selected === item.id ? "active" : ""}
              onClick={() => setSelected(item.id)}
              key={item.id}
              style={{ "--workload-colour": item.colour } as React.CSSProperties}
            >
              <span>
                <Icon size={17} />
              </span>
              <div>
                <strong>{item.label}</strong>
                <small>{item.short} profile</small>
              </div>
              {selected === item.id && <Play size={13} />}
            </button>
          );
        })}
      </div>

      <div className="workload-stage" style={{ "--workload-colour": workload.colour } as React.CSSProperties}>
        <div className="heatmap-panel">
          <div className="workload-panel-title">
            <span>System heatmap</span>
            <small>96 live regions</small>
          </div>
          <div className="system-heatmap" aria-label={`${workload.short} workload heatmap`}>
            {heat.map((value, index) => (
              <motion.i
                key={`${workload.id}-${index}`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.12 + value / 125,
                  scale: value > 78 ? 1 : 0.92,
                }}
                transition={{ delay: index * 0.002 }}
                style={{ "--cell-heat": `${value}%` } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="heatmap-legend">
            <span>Quiet</span>
            <i />
            <span>Busy</span>
          </div>
        </div>

        <div className="fingerprint-panel">
          <div className="workload-panel-title">
            <span>System fingerprint</span>
            <small>{workload.short}</small>
          </div>
          <div className="radar-wrap">
            <svg viewBox="0 0 100 100" role="img" aria-label={`${workload.short} system fingerprint`}>
              {[18, 30, 42].map((inset) => (
                <polygon
                  key={inset}
                  points={`50,${inset} ${100 - inset * 0.65},${42 - inset * 0.1} ${82 - inset * 0.4},${88 - inset * 0.25} ${18 + inset * 0.4},${88 - inset * 0.25} ${inset * 0.65},${42 - inset * 0.1}`}
                />
              ))}
              <motion.polygon
                key={workload.id}
                points={radarPoints}
                className="radar-value"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ transformOrigin: "50% 50%" }}
              />
            </svg>
            <span className="radar-label radar-cpu">CPU</span>
            <span className="radar-label radar-gpu">GPU</span>
            <span className="radar-label radar-memory">Memory</span>
            <span className="radar-label radar-network">Network</span>
            <span className="radar-label radar-temp">Temp</span>
          </div>
        </div>

        <div className="workload-readout">
          <AnimatePresence mode="wait">
            <motion.div key={workload.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <span>
                <Sparkles size={15} /> What this tells you
              </span>
              <h3>{workload.label}</h3>
              <p>{workload.copy}</p>
            </motion.div>
          </AnimatePresence>
          <dl>
            {[
              ["CPU", workload.cpu, "%"],
              ["GPU", workload.gpu, "%"],
              ["Memory", workload.memory, "%"],
              ["Network", workload.network, "%"],
              ["Temperature", workload.temperature, "°C"],
            ].map(([label, value, unit]) => (
              <div key={String(label)}>
                <dt>{label}</dt>
                <dd>
                  {value}
                  <small>{unit}</small>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
