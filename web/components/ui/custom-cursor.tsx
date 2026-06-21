"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useSpring(mouseX, { damping: 45, stiffness: 1100 });
  const cursorY = useSpring(mouseY, { damping: 45, stiffness: 1100 });
  const ringX = useSpring(mouseX, { damping: 24, stiffness: 260 });
  const ringY = useSpring(mouseY, { damping: 24, stiffness: 260 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, summary, [data-cursor='interactive']")));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="cursor-dot"
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.65 : 1 }}
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        aria-hidden="true"
        className="cursor-ring"
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.65 : pressed ? 0.8 : 1,
          borderColor: hovering ? "rgba(126, 249, 255, .65)" : "rgba(255, 255, 255, .24)",
        }}
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
