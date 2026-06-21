"use client";

import { motion } from "framer-motion";
import { CirclePause, Play, RotateCcw, Search, Thermometer, TimerReset } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const replayFrames = [
  {
    at: 0,
    time: "21:14:02",
    title: "Everything was quiet.",
    detail: "The desktop was idle. Temperatures were low and there was plenty of memory available.",
    cpu: 12,
    gpu: 4,
    memory: 34,
    temperature: 42,
  },
  {
    at: 22,
    time: "21:14:11",
    title: "A game started loading.",
    detail: "CPU activity rose first while assets were unpacked. The GPU was still waiting for work.",
    cpu: 68,
    gpu: 18,
    memory: 48,
    temperature: 51,
  },
  {
    at: 45,
    time: "21:14:19",
    title: "The GPU hit its limit.",
    detail: "GPU load reached 99%. CPU headroom remained, so the slowdown was not coming from the processor.",
    cpu: 64,
    gpu: 99,
    memory: 57,
    temperature: 69,
  },
  {
    at: 66,
    time: "21:14:28",
    title: "Temperature followed a few seconds later.",
    detail: "The heat was a result of the sustained GPU load—not the cause of the original frame drop.",
    cpu: 59,
    gpu: 96,
    memory: 58,
    temperature: 76,
  },
  {
    at: 84,
    time: "21:14:42",
    title: "The workload settled.",
    detail: "The scene finished loading, frame pacing recovered, and the cooling curve began to catch up.",
    cpu: 41,
    gpu: 72,
    memory: 56,
    temperature: 71,
  },
  {
    at: 100,
    time: "21:14:58",
    title: "Mystery solved.",
    detail: "The brief stutter was a GPU saturation event. Network and storage stayed healthy throughout.",
    cpu: 29,
    gpu: 54,
    memory: 52,
    temperature: 64,
  },
];

function interpolate(progress: number, key: "cpu" | "gpu" | "memory" | "temperature") {
  const nextIndex = replayFrames.findIndex((frame) => frame.at >= progress);
  if (nextIndex <= 0) return replayFrames[0][key];
  if (nextIndex === -1) return replayFrames[replayFrames.length - 1][key];

  const previous = replayFrames[nextIndex - 1];
  const next = replayFrames[nextIndex];
  const ratio = (progress - previous.at) / (next.at - previous.at);
  return Math.round(previous[key] + (next[key] - previous[key]) * ratio);
}

export default function IncidentReplay() {
  const [progress, setProgress] = useState(45);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          setPlaying(false);
          return 100;
        }
        return current + 1;
      });
    }, 95);
    return () => window.clearInterval(timer);
  }, [playing]);

  const active = useMemo(
    () => [...replayFrames].reverse().find((frame) => frame.at <= progress) ?? replayFrames[0],
    [progress],
  );
  const metrics = {
    cpu: interpolate(progress, "cpu"),
    gpu: interpolate(progress, "gpu"),
    memory: interpolate(progress, "memory"),
    temperature: interpolate(progress, "temperature"),
  };

  return (
    <section id="incident-replay" className="incident-replay" aria-labelledby="replay-title">
      <div className="section-kicker">
        <span>05</span>
        <span>Incident replay</span>
      </div>
      <div className="replay-heading">
        <div>
          <p className="eyebrow">Go back to the moment</p>
          <h2 id="replay-title">
            “It stuttered.”
            <br />
            <span>Okay. Let&apos;s see why.</span>
          </h2>
        </div>
        <p>
          Drag through this example session. HardwareMon keeps the signals together, so you can
          tell what happened first, what merely followed, and what had nothing to do with it.
        </p>
      </div>

      <div className="replay-console">
        <div className="replay-toolbar">
          <div>
            <TimerReset size={16} />
            <span>
              Session replay
              <small>Example gaming workload</small>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (progress >= 100) setProgress(0);
              setPlaying((current) => !current);
            }}
          >
            {playing ? <CirclePause size={15} /> : <Play size={15} />}
            {playing ? "Pause" : progress >= 100 ? "Play again" : "Play"}
          </button>
        </div>

        <div className="replay-body">
          <div className="replay-chart">
            <div className="replay-chart-grid" aria-hidden="true" />
            {[
              { key: "cpu", label: "CPU", colour: "#70f5ff", values: [12, 68, 64, 59, 41, 29] },
              { key: "gpu", label: "GPU", colour: "#ffb44c", values: [4, 18, 99, 96, 72, 54] },
              { key: "memory", label: "Memory", colour: "#bd77ff", values: [34, 48, 57, 58, 56, 52] },
            ].map((line) => {
              const points = line.values
                .map((value, index) => `${(index / (line.values.length - 1)) * 1000},${300 - value * 2.6}`)
                .join(" ");
              return (
                <svg viewBox="0 0 1000 320" preserveAspectRatio="none" key={line.key} aria-hidden="true">
                  <polyline points={points} fill="none" stroke={line.colour} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              );
            })}
            <motion.div className="replay-cursor" animate={{ left: `${progress}%` }}>
              <i />
              <span>{active.time}</span>
            </motion.div>
            <div className="replay-event-markers">
              {replayFrames.slice(1, -1).map((frame) => (
                <button
                  type="button"
                  key={frame.at}
                  style={{ left: `${frame.at}%` }}
                  onClick={() => {
                    setPlaying(false);
                    setProgress(frame.at);
                  }}
                  aria-label={`Jump to ${frame.time}: ${frame.title}`}
                />
              ))}
            </div>
          </div>

          <div className="replay-metrics">
            {[
              ["CPU", metrics.cpu, "%", "#70f5ff"],
              ["GPU", metrics.gpu, "%", "#ffb44c"],
              ["Memory", metrics.memory, "%", "#bd77ff"],
              ["Temperature", metrics.temperature, "°C", "#7cf5b2"],
            ].map(([label, value, unit, colour]) => (
              <div key={String(label)}>
                <small>{label}</small>
                <strong style={{ color: String(colour) }}>
                  {value}
                  <span>{unit}</span>
                </strong>
                <i>
                  <motion.b animate={{ width: `${value}%` }} style={{ background: String(colour) }} />
                </i>
              </div>
            ))}
          </div>

          <motion.div className="replay-explanation" key={active.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <span>
              <Search size={15} /> What HardwareMon would show you
            </span>
            <h3>{active.title}</h3>
            <p>{active.detail}</p>
            <div>
              <span>
                <Thermometer size={13} /> Thermal response tracked
              </span>
              <span>Network ruled out</span>
              <span>Storage ruled out</span>
            </div>
          </motion.div>
        </div>

        <div className="replay-scrubber">
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setProgress(0);
            }}
            aria-label="Reset replay"
          >
            <RotateCcw size={14} />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(event) => {
              setPlaying(false);
              setProgress(Number(event.target.value));
            }}
            aria-label="Incident replay position"
            style={{ "--replay-progress": `${progress}%` } as React.CSSProperties}
          />
          <span>{active.time}</span>
        </div>
      </div>
    </section>
  );
}
