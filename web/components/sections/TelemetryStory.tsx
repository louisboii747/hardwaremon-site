"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import TelemetryGraph from "../dashboard/telemetry-graph"

gsap.registerPlugin(ScrollTrigger)

const stages = [
  {
    title: "HardwareMon sees everything.",
    value: "23%",
    label: "CPU Usage",
  },
  {
    title: "Track performance in realtime.",
    value: "64%",
    label: "CPU Usage",
  },
  {
    title: "Watch memory usage in real-time.",
    value: "78%",
    label: "RAM Usage",
  },
  {
    title: "See the complete picture.",
    value: "71°C",
    label: "GPU Temperature",
  },
]

export default function TelemetryStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: true,

      onUpdate: (self) => {
        const progress = self.progress

        if (progress < 0.25) {
          setStage(0)
        } else if (progress < 0.5) {
          setStage(1)
        } else if (progress < 0.75) {
          setStage(2)
        } else {
          setStage(3)
        }
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15),transparent_60%)]" />

      {/* Background Graph */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 scale-[2.2] opacity-20 blur-[2px]">
          <TelemetryGraph />
        </div>
      </div>

      {/* Dashboard Silhouette */}
      <motion.div
        animate={{
          opacity: stage >= 2 ? 0.15 : 0,
          scale: stage >= 2 ? 1 : 0.92,
        }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none"
      >
        <div className="h-[500px] w-[900px] rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-sm" />
      </motion.div>

      {/* Floating Cards */}
      <div className="absolute inset-0 z-[5] pointer-events-none">

        {/* RAM */}
        <motion.div
          animate={{
            opacity: stage >= 2 ? 1 : 0,
            scale: stage >= 2 ? 1 : 0.8,
            y: stage >= 2 ? [-10, 10, -10] : 0,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[18%] top-[35%]"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-white/40">
              Memory
            </p>
            <p className="text-2xl font-bold text-white">
              18GB
            </p>
          </div>
        </motion.div>

        {/* GPU */}
        <motion.div
          animate={{
            opacity: stage >= 3 ? 1 : 0,
            scale: stage >= 3 ? 1 : 0.8,
            y: stage >= 3 ? [10, -10, 10] : 0,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[18%] top-[38%]"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-white/40">
              GPU Temp
            </p>
            <p className="text-2xl font-bold text-white">
              71°C
            </p>
          </div>
        </motion.div>
      </div>

      {/* Progress Rail */}
      <div className="absolute left-12 top-1/2 z-20 -translate-y-1/2">
        <div className="flex flex-col gap-6">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <div
                className={`h-2 w-2 rounded-full transition-all duration-500 ${
                  stage === index
                    ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                    : "bg-white/20"
                }`}
              />

              <span
                className={`text-sm transition-all duration-500 ${
                  stage === index
                    ? "text-white"
                    : "text-white/30"
                }`}
              >
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
          Live Telemetry
        </p>

        <AnimatePresence mode="wait">
          <motion.h2
            key={stage}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="mb-8 text-5xl font-semibold text-white md:text-7xl"
          >
            {stages[stage].title}
          </motion.h2>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.35 }}
            className="inline-flex flex-col rounded-3xl border border-white/10 bg-white/5 px-10 py-8 backdrop-blur-xl"
          >
            <span className="text-sm text-zinc-500">
              {stages[stage].label}
            </span>

            <span className="mt-2 text-6xl font-bold text-white">
              {stages[stage].value}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}