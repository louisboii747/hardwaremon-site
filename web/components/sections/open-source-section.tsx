"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, GitBranch, HeartHandshake, PackageOpen, Sparkles } from "lucide-react";

const timeline = [
  {
    title: "Desktop foundation",
    detail: "A focused monitor for live system telemetry.",
    icon: Code2,
    state: "Shipped",
  },
  {
    title: "Analytics expansion",
    detail: "Processes, storage, networking, and richer performance views.",
    icon: GitBranch,
    state: "Shipped",
  },
  {
    title: "Platform maturity",
    detail: "Installers, repositories, update systems, and desktop integration.",
    icon: PackageOpen,
    state: "Growing",
  },
  {
    title: "The next horizon",
    detail: "Deeper customization, longer history, and companion apps.",
    icon: Sparkles,
    state: "Roadmap",
  },
];

export default function OpenSourceSection() {
  return (
    <section id="open-source" className="open-source-section" aria-labelledby="open-source-title">
      <div className="open-source-grid" aria-hidden="true" />
      <div className="open-source-heading">
        <div className="section-kicker">
          <span>12</span>
          <span>You can inspect the whole thing</span>
        </div>
        <p className="eyebrow">No black box</p>
        <h2 id="open-source-title">
          Wondering how it works?
          <br />
          <span>Go and have a look.</span>
        </h2>
        <p>
          The code, releases, bugs, and roadmap are public. You can report something odd, suggest
          the next feature, or pull the project apart and build your own version.
        </p>
        <div className="open-source-actions">
          <a
            className="button button-primary"
            href="https://github.com/louisboii747/HardwareMon"
            target="_blank"
            rel="noreferrer"
          >
            <GitBranch size={17} />
            Explore on GitHub
          </a>
          <a
            className="button button-ghost"
            href="https://github.com/louisboii747/HardwareMon/issues"
            target="_blank"
            rel="noreferrer"
          >
            Join the conversation
          </a>
        </div>
      </div>

      <div className="open-source-console">
        <div className="source-console-top">
          <span>
            <GitBranch size={16} /> louisboii747 / HardwareMon
          </span>
          <small>Public · MIT License</small>
        </div>
        <div className="contribution-line">
          {Array.from({ length: 84 }, (_, index) => (
            <motion.i
              key={index}
              initial={{ opacity: 0.12 }}
              whileInView={{ opacity: 0.24 + ((index * 17) % 76) / 100 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.006 }}
            />
          ))}
        </div>
        <div className="source-console-stats">
          <div>
            <strong>MIT</strong>
            <span>Open-source license</span>
          </div>
          <div>
            <strong>2</strong>
            <span>Desktop platforms</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>Ways to contribute</span>
          </div>
        </div>
        <div className="source-commit">
          <span className="avatar">H</span>
          <div>
            <strong>Built in public, improved in the open</strong>
            <span>Releases, issues, discussions, and source are visible to everyone.</span>
          </div>
          <GitBranch size={18} />
        </div>
      </div>

      <div className="development-timeline">
        {timeline.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="timeline-marker">
                <span>
                  <Icon size={16} />
                </span>
                {index < timeline.length - 1 && <i />}
              </div>
              <div>
                <small>{item.state}</small>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <a
        className="contribution-cta"
        href="https://github.com/louisboii747/HardwareMon"
        target="_blank"
        rel="noreferrer"
      >
        <HeartHandshake size={22} />
        <span>
          <strong>Your idea could become part of HardwareMon.</strong>
          Fork it, shape it, test it, or simply tell us what your system needs.
        </span>
        <ArrowUpRight size={19} />
      </a>
    </section>
  );
}
