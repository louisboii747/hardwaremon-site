"use client"

import { motion } from "framer-motion"

import MetricCard from "../dashboard/metric-card"
import TelemetryGraph from "../dashboard/telemetry-graph"
import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export default function RealtimeTelemetry() {

    const sectionRef = useRef(null)
    const cardsRef = useRef(null)
    const graphRef = useRef(null)

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
  )

  gsap.to(graphRef.current, {
    y: 120,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  })
}, [])


  return (
        <section
    ref={sectionRef}
    className="relative overflow-hidden pt-64 pb-56"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15),transparent_60%)]" />

      {/* Graph layer */}
      <div
  ref={graphRef}
  className="absolute inset-0 min-h-[900px]"
>
  <TelemetryGraph />
</div>

      {/* Floating Telemetry Cards */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [-12, 12, -12],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[15%] top-[30%]"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-white/40">
              Memory
            </p>
            <p className="mt-2 text-3xl font-bold text-white">
              18.4 GB
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [10, -10, 10],
            rotate: [1, -1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[15%] top-[35%]"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-white/40">
              GPU Temp
            </p>
            <p className="mt-2 text-3xl font-bold text-white">
              71°C
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [-8, 8, -8],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[25%] bottom-[22%]"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-white/40">
              Processes
            </p>
            <p className="mt-2 text-3xl font-bold text-white">
              214
            </p>
          </div>
        </motion.div>
      </div>


      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            Realtime Analytics
          </p>

          <h2 className="text-5xl font-bold leading-[0.9] tracking-[-0.06em] text-white md:text-7xl">
            Built for immersive
            system monitoring.
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-white/45">
            HardwareMon delivers live telemetry,
            cinematic workstation visuals,
            realtime analytics, and cross-platform
            performance monitoring for modern desktops.
          </p>
        </motion.div>

        <div
        ref={cardsRef}
        className="mt-20 grid gap-6 md:grid-cols-3"
        >
          <MetricCard
            title="CPU Usage"
                value={34}
                suffix="%"
                subtitle="Intel Core i9"
                />

                <MetricCard
                title="GPU Temperature"
                value={67}
                suffix="°C"
                subtitle="RTX 4080 SUPER"
                />

                <MetricCard
                title="Memory Usage"
                value={18.4}
                suffix=" GB"
                subtitle="DDR5 @ 6000MHz"
                />
        </div>
      </div>
    </section>
  )
}