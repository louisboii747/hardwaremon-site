"use client";

import { motion } from "framer-motion";
import BackgroundEffects from "./background-effects";
import FloatingNavbar from "./floating-navbar";
import TelemetryPreview from "./telemetry-preview";
import MagneticButton from "@/components/ui/magnetic-button";

export default function Hero() {
  return (
    <>
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <BackgroundEffects />

      <FloatingNavbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-32 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
          }}
          className="
            mb-6 rounded-full border border-white/10
            bg-white/5 px-4 py-2
            backdrop-blur-md
          "
        >
          <span className="text-sm text-white/70">Cross-platform cinematic system monitoring</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.35,
            duration: 1,
          }}
          className="
          max-w-5xl
          text-5xl
          font-[650]
          tracking-[-0.06em]
          text-transparent
          bg-clip-text
          bg-gradient-to-b
          from-white
          to-white/70
          md:text-7xl
        "
        >
          Hardware monitoring
          <br />
          rebuilt for modern desktops.
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 1,
          }}
          className="
            mt-8 max-w-xl text-lg leading-relaxed
            text-white/50 md:text-xl
          "
        >
          Real-time telemetry, immersive analytics, cinematic UI, and cross-platform performance
          monitoring for Linux and Windows.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.65,
            duration: 1,
          }}
          className="mt-10 flex items-center gap-4"
        >
          <MagneticButton>
            <a
              href="https://github.com/louisboii747/HardwareMon/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                rounded-2xl bg-white px-6 py-3
                text-sm font-medium text-black
                transition hover:scale-[1.02]
              "
            >
              Download HardwareMon
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="https://github.com/louisboii747/HardwareMon"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                rounded-2xl border border-white/10
                bg-white/5 px-6 py-3
                text-sm text-white
                backdrop-blur-md transition
                hover:bg-white/10
              "
            >
              View GitHub
            </a>
          </MagneticButton>
        </motion.div>

        {/* Telemetry Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.85,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-16 w-full"
        >
          <TelemetryPreview />
        </motion.div>
      </motion.div>
    </section>
    </>
  );
}
