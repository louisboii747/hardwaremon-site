"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export default function CustomCursor() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [hovering, setHovering] = useState(false)

  const cursorX = useSpring(mouseX, {
    damping: 50,
    stiffness: 1200,
  })

  const cursorY = useSpring(mouseY, {
    damping: 50,
    stiffness: 1200,
  })

  const ringX = useSpring(mouseX, {
    damping: 25,
    stiffness: 300,
  })

  const ringY = useSpring(mouseY, {
    damping: 25,
    stiffness: 300,
  })

  useEffect(() => {
  const move = (e: MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  window.addEventListener("mousemove", move)

  const interactiveElements = document.querySelectorAll(
    "button, a"
  )

  const enter = () => setHovering(true)
  const leave = () => setHovering(false)

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", enter)
    el.addEventListener("mouseleave", leave)
  })

  return () => {
    window.removeEventListener("mousemove", move)

    interactiveElements.forEach((el) => {
      el.removeEventListener("mouseenter", enter)
      el.removeEventListener("mouseleave", leave)
    })
  }
}, [mouseX, mouseY])

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <motion.div
  animate={{
    scale: hovering ? 1.75 : 1,
  }}
  transition={{
    type: "spring",
    damping: 25,
    stiffness: 300,
  }}
  className={`pointer-events-none fixed top-0 left-0 z-[9998] h-10 w-10 rounded-full border ${
    hovering
      ? "border-white/50"
      : "border-white/20"
  }`}
  style={{
    x: ringX,
    y: ringY,
    translateX: "-50%",
    translateY: "-50%",
  }}
/>
    </>
  )
}