"use client"

import { motion } from "framer-motion"
import { useRef } from "react"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
}

export default function MagneticButton({
  children,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()

    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return

    el.style.transform = "translate(0px, 0px)"
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={`transition-transform duration-200 ${className}`}
    >
      {children}
    </motion.div>
  )
}