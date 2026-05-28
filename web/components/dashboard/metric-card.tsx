"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface MetricCardProps {
  title: string
  value: number
  suffix: string
  subtitle: string
}

export default function MetricCard({
  title,
  value,
  suffix,
  subtitle,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const interval = setInterval(() => {
      const variation = (Math.random() - 0.5) * 6

      setDisplayValue((prev) => {
        const next = prev + variation

        return Math.max(0, next)
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      className="
        metric-card
        group relative overflow-hidden
        rounded-3xl border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        p-6
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0 opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
          bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]
        "
      />

      <div className="relative z-10">
        <p className="text-sm text-white/40">
          {title}
        </p>

        <motion.h3
          layout
          className="
            mt-3 text-5xl font-semibold
            tracking-tight text-white
          "
        >
          {displayValue.toFixed(0)}
          {suffix}
        </motion.h3>

        <p className="mt-3 text-sm text-white/30">
          {subtitle}
        </p>
      </div>
    </motion.div>
  )
}