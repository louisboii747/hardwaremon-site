"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Cpu, MemoryStick, Network, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const chapters = [
  {
    id: "cpu",
    number: "01",
    label: "CPU",
    title: "Why did the fans just spin up?",
    copy: "Start with CPU load, clocks, and temperature. If they rose together, you can see exactly when—and what else was happening.",
    value: "4.72",
    unit: "GHz",
    meta: "12th Gen Intel Core i7",
    colour: "#70f5ff",
    icon: Cpu,
  },
  {
    id: "memory",
    number: "02",
    label: "MEMORY",
    title: "Where did all my memory go?",
    copy: "See how much is in use, whether it is still climbing, and which part of the system deserves a closer look.",
    value: "11.8",
    unit: "GB",
    meta: "37% of 32 GB",
    colour: "#bd77ff",
    icon: MemoryStick,
  },
  {
    id: "gpu",
    number: "03",
    label: "GPU",
    title: "Is the GPU actually the bottleneck?",
    copy: "Compare engine load, temperature, and clocks instead of blaming the graphics card because one number looked high.",
    value: "62",
    unit: "°C",
    meta: "38% engine load",
    colour: "#ffb44c",
    icon: Sparkles,
  },
  {
    id: "network",
    number: "04",
    label: "NETWORK",
    title: "Is it the connection—or the app?",
    copy: "Put throughput, latency, and the active interface next to the rest of the workload before restarting the router again.",
    value: "842",
    unit: "Mb/s",
    meta: "8.2 ms latency",
    colour: "#7cf5b2",
    icon: Network,
  },
];

function StoryVisual({ index }: { index: number }) {
  const chapter = chapters[index];
  const Icon = chapter.icon;
  const bars = Array.from({ length: 34 }, (_, barIndex) => {
    const amplitude = 26 + ((barIndex * (index + 5) * 13) % 72);
    return amplitude;
  });

  return (
    <motion.div
      className="story-visual"
      style={{ "--story-colour": chapter.colour } as React.CSSProperties}
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
    >
      <div className="story-orbit" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="story-visual-header">
        <span>
          <Icon size={17} />
          {chapter.label} PERFORMANCE
        </span>
        <small>
          <i className="status-pulse" /> Live sample
        </small>
      </div>
      <div className="story-value">
        <AnimatePresence mode="wait">
          <motion.strong
            key={chapter.value}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {chapter.value}
            <small>{chapter.unit}</small>
          </motion.strong>
        </AnimatePresence>
        <span>{chapter.meta}</span>
      </div>
      <div className="story-bars" aria-hidden="true">
        {bars.map((height, barIndex) => (
          <motion.i
            key={`${index}-${barIndex}`}
            initial={{ height: "10%" }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.55, delay: barIndex * 0.008 }}
          />
        ))}
      </div>
      <div className="story-stats">
        <div>
          <small>Average</small>
          <strong>{index === 0 ? "3.84 GHz" : index === 1 ? "9.7 GB" : index === 2 ? "58°C" : "612 Mb/s"}</strong>
        </div>
        <div>
          <small>Peak</small>
          <strong>{index === 0 ? "4.91 GHz" : index === 1 ? "14.2 GB" : index === 2 ? "74°C" : "1.2 Gb/s"}</strong>
        </div>
        <div>
          <small>Status</small>
          <strong>Nominal</strong>
        </div>
      </div>
    </motion.div>
  );
}

export default function PerformanceStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=3200",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const next = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length));
          setActive(next);
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="performance-story" aria-labelledby="performance-title">
      <div className="story-background-number" aria-hidden="true">
        {chapters[active].number}
      </div>
      <div className="story-copy">
        <div className="section-kicker">
          <span>04</span>
          <span>Four questions people actually ask</span>
        </div>
        <p className="eyebrow">High is not always bad</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={chapters[active].id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ duration: 0.42 }}
          >
            <h2 id="performance-title">{chapters[active].title}</h2>
            <p>{chapters[active].copy}</p>
          </motion.div>
        </AnimatePresence>
        <div className="story-progress">
          {chapters.map((chapter, index) => (
            <button
              type="button"
              className={active === index ? "active" : ""}
              key={chapter.id}
              onClick={() => setActive(index)}
            >
              <span>{chapter.number}</span>
              <i>
                <b />
              </i>
              <small>{chapter.label}</small>
            </button>
          ))}
        </div>
      </div>
      <StoryVisual index={active} />
    </section>
  );
}
