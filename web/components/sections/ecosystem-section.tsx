"use client";

import { motion } from "framer-motion";
import { AppWindow, ArrowUpRight, Laptop, Monitor, Smartphone, Terminal } from "lucide-react";

const platforms = [
  {
    name: "Windows",
    tag: "Available",
    copy: "Download the installer, launch it like any other desktop app, and let HardwareMon handle the background details.",
    icon: Monitor,
    colour: "#70f5ff",
    className: "windows",
  },
  {
    name: "Linux",
    tag: "Available",
    copy: "Install it through familiar package tools and get telemetry that understands how Linux exposes hardware.",
    icon: Terminal,
    colour: "#bd77ff",
    className: "linux",
  },
  {
    name: "Companion",
    tag: "On the roadmap",
    copy: "A future way to glance at your main machine when you are away from the desk.",
    icon: Smartphone,
    colour: "#ffb44c",
    className: "companion",
  },
];

export default function EcosystemSection() {
  return (
    <section className="ecosystem-section" aria-labelledby="ecosystem-title">
      <div className="section-kicker">
        <span>11</span>
        <span>Whatever is on your desk</span>
      </div>
      <div className="ecosystem-heading">
        <div>
          <p className="eyebrow">Windows? Linux? You are covered.</p>
          <h2 id="ecosystem-title">
            One project.
            <br />
            <span>Two very different desktops.</span>
          </h2>
        </div>
        <p>
          HardwareMon respects the platform it is running on instead of pretending Windows and
          Linux are the same. The design stays familiar; the telemetry adapts underneath it.
        </p>
      </div>

      <div className="ecosystem-stage">
        <div className="ecosystem-connections" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <motion.article
              className={`platform-card platform-${platform.className}`}
              key={platform.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              whileHover={{ y: -8 }}
              style={{ "--platform-colour": platform.colour } as React.CSSProperties}
            >
              <div className="platform-card-top">
                <span>
                  <Icon size={19} />
                </span>
                <small>{platform.tag}</small>
              </div>
              <div className="platform-device" aria-hidden="true">
                {platform.className === "companion" ? (
                  <div className="phone-device">
                    <i />
                    <span />
                    <b />
                  </div>
                ) : (
                  <div className="desktop-device">
                    <div>
                      <aside />
                      <main>
                        <i />
                        <span />
                        <span />
                      </main>
                    </div>
                    <b />
                  </div>
                )}
              </div>
              <h3>{platform.name}</h3>
              <p>{platform.copy}</p>
              <span className="platform-link">
                {platform.tag === "Available" ? "Explore installation" : "Follow the roadmap"}
                <ArrowUpRight size={14} />
              </span>
            </motion.article>
          );
        })}
      </div>

      <div className="ecosystem-strip">
        <span>
          <Laptop size={16} /> Desktop-first
        </span>
        <span>
          <AppWindow size={16} /> Shared design language
        </span>
        <span>Local-first telemetry</span>
        <span>Open-source foundation</span>
      </div>
    </section>
  );
}
