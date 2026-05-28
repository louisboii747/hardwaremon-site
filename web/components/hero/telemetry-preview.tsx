"use client";

import { motion } from "framer-motion";

export default function TelemetryPreview() {
  return (
    <motion.div
      initial={{ rotateX: 0, rotateY: 0 }}
      whileHover={{
        rotateX: -2,
        rotateY: 2,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      className="relative mt-16 w-full max-w-6xl perspective-[2000px]"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-[32px] bg-cyan-500/10 blur-3xl" />

      {/* Main panel */}
      <div
        className="
          relative overflow-hidden
          rounded-[32px]
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-2xl
          shadow-2xl
          transition-all duration-500
          hover:-translate-y-1
          hover:border-white/20
          animate-float
        "
      >
        {/* Glass reflection */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />

        {/* Scanlines */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
          <div className="scanlines absolute inset-0" />
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <div className="h-3 w-3 rounded-full bg-green-400/80" />
          </div>

          <span className="text-sm text-white/40">HardwareMon Live Telemetry</span>
        </div>

        {/* Dashboard content */}
        <div className="grid gap-6 p-6 md:grid-cols-3">
          {/* CPU */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">CPU Usage</span>

              <span className="text-sm text-cyan-300">48%</span>
            </div>

            <div className="mt-6 flex h-24 items-end gap-1">
              {[40, 60, 35, 80, 55, 72, 65, 90, 50, 76, 45, 68].map((value, index) => (
                <div
                  key={index}
                  className="
                    flex-1 rounded-full
                    bg-cyan-400/70
                    transition-all duration-700
                    hover:bg-cyan-300
                    animate-pulse
                  "
                  style={{
                    height: `${value}%`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Memory */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">Memory</span>

              <span className="text-sm text-blue-300">31.2 GB</span>
            </div>

            <div className="mt-6">
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-blue-400 transition-all duration-700" />
              </div>

              <div className="mt-4 flex justify-between text-sm text-white/40">
                <span>Used</span>

                <span>72%</span>
              </div>
            </div>
          </div>

          {/* GPU */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/50">GPU Temp</span>

              <span className="text-sm text-purple-300">67°C</span>
            </div>

            <div className="mt-6 flex items-center justify-center">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-8 border-purple-400/20">
                <div className="absolute inset-0 rounded-full border-t-8 border-purple-400 animate-spin" />

                <span className="text-2xl font-semibold text-white">67°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
