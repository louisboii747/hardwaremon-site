"use client"

import { motion } from "framer-motion"

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.75,
        y: 100,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative w-full max-w-5xl mx-auto"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">
              HardwareMon Dashboard
            </h3>

            <p className="text-xs text-white/40">
              Live System Telemetry
            </p>
          </div>

          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 p-6">
        <AnimatedMetricCard
            title="CPU"
            value="54%"
            delay={0.2}
        />

        <motion.div layoutId="ram-card">
            <AnimatedMetricCard
            title="RAM"
            value="12.8GB"
            delay={0.4}
            />
        </motion.div>

        <motion.div layoutId="gpu-card">
            <AnimatedMetricCard
            title="GPU"
            value="63°C"
            delay={0.6}
            />
        </motion.div>
        </div>

        {/* Graph */}
        <motion.div
        className="px-6 pb-6"
        initial={{
            opacity: 0,
            scaleY: 0,
        }}
        animate={{
            opacity: 1,
            scaleY: 1,
        }}
        transition={{
            delay: 1,
            duration: 0.8,
        }}
        style={{
            transformOrigin: "top",
        }}
        >
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 h-64">
            <div className="h-full rounded-xl border border-white/10 bg-black/20 flex items-center justify-center">
            <span className="text-white/30">
                Dashboard Graph
            </span>
            </div>
        </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function AnimatedMetricCard({
  title,
  value,
  delay,
}: {
  title: string
  value: string
  delay: number
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 120,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
      }}
    >
      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
        <p className="text-white/40 text-xs uppercase tracking-wider">
          {title}
        </p>

        <h3 className="text-3xl font-semibold text-white mt-2">
          {value}
        </h3>
      </div>
    </motion.div>
  )
}