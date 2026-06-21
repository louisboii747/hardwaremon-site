import type { Metadata } from "next";
import CinematicHero from "@/components/hero/cinematic-hero";
import SiteExperience from "@/components/site/site-experience";
import InteractiveDesktop from "@/components/desktop/interactive-desktop";
import SystemScanner from "@/components/sections/system-scanner";
import PerformanceStory from "@/components/sections/performance-story";
import IncidentReplay from "@/components/sections/incident-replay";
import TelemetryStudio from "@/components/sections/telemetry-studio";
import NetworkIntelligence from "@/components/sections/network-intelligence";
import WorkloadLab from "@/components/sections/workload-lab";
import StorageCustomization from "@/components/sections/storage-customization";
import EcosystemSection from "@/components/sections/ecosystem-section";
import OpenSourceSection from "@/components/sections/open-source-section";
import DownloadExperience from "@/components/sections/download-experience";

const siteUrl = "https://hardwaremon-site.pages.dev";
const capabilities = [
  "CPU telemetry",
  "GPU analytics",
  "Memory pressure",
  "What is using your system",
  "Network monitoring",
  "Storage health",
  "Historical analytics",
  "Windows + Linux",
];

export function generateMetadata(): Metadata {
  const title = "HardwareMon — See what your computer is actually doing";
  const description =
    "A friendly, open-source system monitor for Windows and Linux with live CPU, GPU, RAM, network, storage, process, and historical performance analytics.";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: "HardwareMon",
    authors: [{ name: "HardwareMon contributors" }],
    creator: "HardwareMon",
    publisher: "HardwareMon",
    category: "technology",
    keywords: [
      "hardware monitor",
      "system monitor",
      "Linux system monitor",
      "Windows system monitor",
      "open source system monitor",
      "hardware monitoring software",
      "PC performance monitoring",
      "CPU monitoring",
      "GPU monitoring",
      "RAM monitoring",
      "network monitoring",
      "historical performance analytics",
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: siteUrl,
      siteName: "HardwareMon",
      title,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "HardwareMon open-source system monitoring platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HardwareMon",
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "System monitoring software",
  operatingSystem: ["Windows", "Linux"],
  description:
    "Open-source hardware and system monitoring software with live telemetry, process insights, network monitoring, storage visibility, and historical performance analytics.",
  url: siteUrl,
  downloadUrl: "https://github.com/louisboii747/HardwareMon/releases/latest",
  softwareHelp: "https://github.com/louisboii747/HardwareMon",
  license: "https://opensource.org/license/mit",
  isAccessibleForFree: true,
  featureList: [
    "CPU monitoring",
    "GPU monitoring",
    "RAM monitoring",
    "Network monitoring",
    "Storage monitoring",
    "Process management",
    "Historical performance analytics",
    "Windows and Linux support",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "HardwareMon",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "System monitoring platform",
      item: `${siteUrl}/#platform`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Download",
      item: `${siteUrl}/#download`,
    },
  ],
};

const faqs = [
  {
    question: "What is HardwareMon?",
    answer:
      "It is an open-source desktop app for seeing what your computer is doing. CPU, GPU, memory, network, storage, processes, and historical data all live in the same place.",
  },
  {
    question: "Does HardwareMon work on Linux and Windows?",
    answer:
      "Yes. There is a Windows installer and Linux package support. The interface stays familiar, while the telemetry underneath adapts to each operating system.",
  },
  {
    question: "Is HardwareMon free and open source?",
    answer:
      "Yes. It is free, released under the MIT License, and developed in public. You can read the code, follow releases, report bugs, or contribute on GitHub.",
  },
  {
    question: "What hardware can HardwareMon monitor?",
    answer:
      "It covers CPU, GPU, memory, network, storage, and running processes. The exact sensors depend on your operating system and hardware, so unavailable readings are shown honestly rather than replaced with made-up values.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <SiteExperience />

      <main className="site-shell">
        <CinematicHero />

        <section id="platform" className="chapter chapter-intro" aria-labelledby="platform-title">
          <div className="section-kicker">
            <span>01</span>
            <span>Start with the useful bit</span>
          </div>
          <div className="chapter-heading">
            <h2 id="platform-title">
              Most system monitors hand you numbers.
              <span> We help you make sense of them.</span>
            </h2>
            <p>
              See what is busy, what is getting hot, what is using your memory, and what changed
              before something felt slow. It is all in one place, with enough detail to be useful
              and none of the usual utility-app clutter.
            </p>
          </div>
          <div className="capability-marquee" aria-label="HardwareMon capabilities">
            <div>
              {[...capabilities, ...capabilities].map((item, index) => (
                <span key={`${item}-${index}`} aria-hidden={index >= capabilities.length}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <SystemScanner />
        <InteractiveDesktop />
        <PerformanceStory />
        <IncidentReplay />
        <TelemetryStudio />
        <NetworkIntelligence />
        <WorkloadLab />
        <StorageCustomization />
        <EcosystemSection />
        <OpenSourceSection />
        <DownloadExperience />

        <section className="faq-section" aria-labelledby="faq-title">
          <div className="section-kicker">
            <span>14</span>
            <span>A few things you might be wondering</span>
          </div>
          <div className="faq-layout">
            <div>
              <p className="eyebrow">The practical stuff</p>
              <h2 id="faq-title">Before you give it a go.</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-cta-title">
          <div className="final-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="eyebrow">Your computer already has the answers</p>
          <h2 id="final-cta-title">
            You should not have to guess
            <br />
            <span>what it is doing.</span>
          </h2>
          <div className="hero-actions">
            <a className="button button-primary" href="#download">
              Try HardwareMon
              <span aria-hidden="true">↘</span>
            </a>
            <a
              className="button button-ghost"
              href="https://github.com/louisboii747/HardwareMon"
              target="_blank"
              rel="noreferrer"
            >
              See how it is built
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top" className="footer-brand" aria-label="Back to top">
          <span className="brand-mark" aria-hidden="true">
            H
          </span>
          <span>HardwareMon</span>
        </a>
        <p>Open-source system monitoring for Windows and Linux.</p>
        <div>
          <a href="https://github.com/louisboii747/HardwareMon" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://github.com/louisboii747/HardwareMon/releases/latest"
            target="_blank"
            rel="noreferrer"
          >
            Releases
          </a>
          <a href="#faq-title">FAQ</a>
        </div>
      </footer>
    </>
  );
}
