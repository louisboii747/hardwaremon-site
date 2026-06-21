"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  CircleCheck,
  Copy,
  Download,
  MonitorCog,
  Package,
  Terminal,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type PackageKind = "windows" | "apt" | "dnf";

type ReleaseAsset = {
  name: string;
  url: string;
  downloads: number;
};

type ReleaseData = {
  version: string;
  publishedAt: string;
  assets: ReleaseAsset[];
};

const fallbackRelease = "https://github.com/louisboii747/HardwareMon/releases/latest";

const packageDetails: Record<
  PackageKind,
  {
    name: string;
    descriptor: string;
    icon: typeof MonitorCog;
    steps: string[];
    command: string;
    assetExtensions: string[];
  }
> = {
  windows: {
    name: "Windows",
    descriptor: "64-bit installer",
    icon: MonitorCog,
    steps: ["Download signed installer", "Run the guided setup", "Launch HardwareMon"],
    command: "HardwareMon-Setup.exe",
    assetExtensions: [".exe"],
  },
  apt: {
    name: "APT",
    descriptor: "Debian · Ubuntu",
    icon: Terminal,
    steps: ["Connect the HardwareMon repository", "Refresh package metadata", "Install HardwareMon"],
    command: "sudo apt update && sudo apt install hardwaremon",
    assetExtensions: [".deb"],
  },
  dnf: {
    name: "DNF",
    descriptor: "Fedora · RHEL",
    icon: Package,
    steps: ["Connect the HardwareMon repository", "Refresh package metadata", "Install HardwareMon"],
    command: "sudo dnf install hardwaremon",
    assetExtensions: [".rpm"],
  },
};

export default function DownloadExperience() {
  const [selected, setSelected] = useState<PackageKind>("windows");
  const [release, setRelease] = useState<ReleaseData | null>(null);
  const [copied, setCopied] = useState(false);
  const [detected, setDetected] = useState("Detecting platform…");

  useEffect(() => {
    const detectionFrame = window.requestAnimationFrame(() => {
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes("linux")) {
        setSelected("apt");
        setDetected("Linux detected");
      } else if (userAgent.includes("windows")) {
        setSelected("windows");
        setDetected("Windows detected");
      } else {
        setDetected("Choose your platform");
      }
    });

    fetch("/api/latest-release")
      .then((response) => {
        if (!response.ok) throw new Error("Release unavailable");
        return response.json();
      })
      .then((data: ReleaseData) => setRelease(data))
      .catch(() => setRelease(null));

    return () => window.cancelAnimationFrame(detectionFrame);
  }, []);

  const detail = packageDetails[selected];
  const downloadAsset = useMemo(() => {
    if (!release) return null;
    return release.assets.find((asset) =>
      detail.assetExtensions.some((extension) => asset.name.toLowerCase().endsWith(extension)),
    );
  }, [detail.assetExtensions, release]);
  const downloadUrl = downloadAsset?.url ?? fallbackRelease;

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(detail.command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const publishedLabel = release?.publishedAt
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(release.publishedAt))
    : "Latest release";

  return (
    <section id="download" className="download-experience" aria-labelledby="download-title">
      <div className="download-glow" aria-hidden="true" />
      <div className="section-kicker">
        <span>13</span>
        <span>Ready when you are</span>
      </div>
      <div className="download-heading">
        <p className="eyebrow">{detected}</p>
        <h2 id="download-title">
          Want to try it?
          <br />
          <span>Pick your platform.</span>
        </h2>
        <p>
          We have already picked the most likely option for this device. You can switch packages
          if we guessed wrong, then install the latest public release.
        </p>
      </div>

      <div className="download-console">
        <div className="package-selector" role="tablist" aria-label="Installation method">
          {(Object.keys(packageDetails) as PackageKind[]).map((kind) => {
            const item = packageDetails[kind];
            const Icon = item.icon;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={selected === kind}
                className={selected === kind ? "active" : ""}
                onClick={() => setSelected(kind)}
                key={kind}
              >
                <span>
                  <Icon size={18} />
                </span>
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.descriptor}</small>
                </div>
                {selected === kind && <CircleCheck size={16} />}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="install-panel"
            key={selected}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28 }}
          >
            <div className="install-panel-heading">
              <div>
                <span>{detail.name}</span>
                <h3>Install HardwareMon</h3>
              </div>
              <div className="release-chip">
                <i className="status-pulse" />
                {release?.version ?? "Latest"}
              </div>
            </div>

            <div className="install-steps">
              {detail.steps.map((step, index) => (
                <div key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                  {index < detail.steps.length - 1 && <ChevronRight size={15} />}
                </div>
              ))}
            </div>

            {selected === "windows" ? (
              <div className="installer-visual">
                <div className="installer-window">
                  <div className="installer-top">
                    <span className="brand-mark">H</span>
                    <span>
                      HardwareMon Setup
                      <small>Getting HardwareMon ready</small>
                    </span>
                  </div>
                  <div className="installer-progress">
                    <span />
                  </div>
                  <div className="installer-labels">
                    <span>Installing system components…</span>
                    <strong>86%</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="terminal-install">
                <div>
                  <span />
                  <span />
                  <span />
                  <small>hardwaremon-install</small>
                </div>
                <code>
                  <span>$</span> {detail.command}
                </code>
                <button type="button" onClick={copyCommand}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <p>
                  <i className="status-pulse" /> Repository connected · package ready
                </p>
              </div>
            )}

            <div className="download-action-row">
              <a className="button button-primary download-button" href={downloadUrl}>
                <Download size={17} />
                {downloadAsset ? `Download ${downloadAsset.name}` : `View ${detail.name} release`}
              </a>
              <div>
                <span>{release?.version ?? "Latest stable"}</span>
                <small>
                  {publishedLabel}
                  {downloadAsset ? ` · ${downloadAsset.downloads.toLocaleString()} downloads` : ""}
                </small>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="download-assurances">
        <span>
          <Check size={14} /> Free and open source
        </span>
        <span>
          <Check size={14} /> No account required
        </span>
        <span>
          <Check size={14} /> Windows and Linux
        </span>
      </div>
    </section>
  );
}
