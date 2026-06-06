"use client";

import { motion } from "framer-motion";
import MetricCard from "../dashboard/metric-card";
import TelemetryGraph from "../dashboard/telemetry-graph";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function RealtimeTelemetry() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const graphRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".metric-card",
      {
        y: 160,
        opacity: 0,
        scale: 0.96,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      }
    );

    gsap.to(graphRef.current, {
      y: 120,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-40 pb-40">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15),transparent_60%)]" />

      {/* Graph layer */}
      <div ref={graphRef} className="absolute inset-0 min-h-[900px] z-0 opacity-40">
        <TelemetryGraph />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">Realtime Analytics</p>

          <h2 className="text-5xl font-bold leading-[0.9] tracking-[-0.06em] text-white md:text-7xl">
            Built for immersive
            <br />
            system monitoring.
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-white/45">
            HardwareMon delivers live telemetry, cinematic workstation visuals, realtime analytics,
            and cross-platform performance monitoring for modern desktops.
          </p>
        </motion.div>

        <div ref={cardsRef} className="mt-20 grid gap-6 md:grid-cols-3">
          <MetricCard title="CPU Usage" value={34} suffix="%" subtitle="Intel Core i9" />

          <MetricCard title="GPU Temperature" value={67} suffix="°C" subtitle="RTX 4080 SUPER" />

          <MetricCard title="Memory Usage" value={18.4} suffix=" GB" subtitle="DDR5 @ 6000MHz" />
        </div>
      </div>
    </section>
  );
}
