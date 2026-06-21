"use client";

import { motion } from "framer-motion";
import { Cloud, Laptop, Network, Router, Server, Wifi } from "lucide-react";
import { useState } from "react";

const nodes = [
  { id: "machine", label: "This workstation", detail: "192.168.1.42", x: 50, y: 52, icon: Laptop },
  { id: "router", label: "Gateway", detail: "1.2 ms", x: 25, y: 28, icon: Router },
  { id: "nas", label: "Studio NAS", detail: "2.5 GbE", x: 18, y: 72, icon: Server },
  { id: "cloud", label: "Internet", detail: "8.2 ms", x: 80, y: 25, icon: Cloud },
  { id: "wireless", label: "Wi-Fi devices", detail: "6 active", x: 82, y: 73, icon: Wifi },
];

const links = [
  ["machine", "router"],
  ["machine", "nas"],
  ["machine", "cloud"],
  ["machine", "wireless"],
  ["router", "cloud"],
];

export default function NetworkIntelligence() {
  const [activeNode, setActiveNode] = useState("machine");
  const current = nodes.find((node) => node.id === activeNode) ?? nodes[0];

  return (
    <section id="network" className="network-intelligence" aria-labelledby="network-title">
      <div className="network-copy">
        <div className="section-kicker">
          <span>07</span>
          <span>When the internet feels off</span>
        </div>
        <p className="eyebrow">Stop guessing at the router</p>
        <h2 id="network-title">
          See where the connection goes
          <br />
          <span>and where it slows down.</span>
        </h2>
        <p>
          Which adapter is active? Is latency climbing? Is the machine downloading or uploading?
          The map makes those answers obvious before you start unplugging things.
        </p>
        <div className="network-big-numbers">
          <div>
            <small>Download</small>
            <strong>842.6</strong>
            <span>Mb/s</span>
          </div>
          <div>
            <small>Upload</small>
            <strong>94.2</strong>
            <span>Mb/s</span>
          </div>
          <div>
            <small>Latency</small>
            <strong>8.2</strong>
            <span>ms</span>
          </div>
        </div>
      </div>

      <div className="topology-panel">
        <div className="topology-grid" aria-hidden="true" />
        <div className="topology-heading">
          <span>
            <Network size={16} /> Live topology
          </span>
          <small>
            <i className="status-pulse" /> Simulating traffic
          </small>
        </div>
        <svg className="topology-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {links.map(([fromId, toId], index) => {
            const from = nodes.find((node) => node.id === fromId)!;
            const to = nodes.find((node) => node.id === toId)!;
            return (
              <g key={`${fromId}-${toId}`}>
                <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
                <motion.circle
                  r="0.8"
                  fill={index % 2 ? "#7cf5b2" : "#70f5ff"}
                  initial={{ cx: `${from.x}%`, cy: `${from.y}%` }}
                  animate={{
                    cx: [`${from.x}%`, `${to.x}%`],
                    cy: [`${from.y}%`, `${to.y}%`],
                  }}
                  transition={{
                    duration: 2.2 + index * 0.26,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.35,
                  }}
                />
              </g>
            );
          })}
        </svg>
        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <motion.button
              type="button"
              className={`topology-node ${activeNode === node.id ? "active" : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveNode(node.id)}
              onFocus={() => setActiveNode(node.id)}
              onClick={() => setActiveNode(node.id)}
              key={node.id}
              whileHover={{ scale: 1.08 }}
              aria-label={`${node.label}: ${node.detail}`}
            >
              <span>
                <Icon size={node.id === "machine" ? 22 : 17} />
              </span>
              <small>{node.label}</small>
            </motion.button>
          );
        })}
        <motion.div
          className="topology-tooltip"
          key={activeNode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <small>Selected node</small>
          <strong>{current.label}</strong>
          <span>{current.detail}</span>
          <div>
            <i className="status-pulse" />
            Healthy connection
          </div>
        </motion.div>
        <div className="packet-streams" aria-hidden="true">
          {Array.from({ length: 22 }, (_, index) => (
            <i key={index} style={{ height: `${14 + ((index * 19) % 84)}%` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
