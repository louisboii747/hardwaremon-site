"use client";

import { useEffect, useState } from "react";

interface Asset {
  name: string;
  url: string;
  downloads: number;
}

interface ReleaseData {
  version: string;
  publishedAt: string;
  body: string;
  assets: Asset[];
}

export default function ReleaseCard() {
  const [release, setRelease] = useState<ReleaseData | null>(null);

  useEffect(() => {
    fetch("/api/latest-release")
      .then((res) => res.json())
      .then(setRelease)
      .catch(console.error);
  }, []);

  if (!release) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        Loading latest release...
      </div>
    );
  }

  const totalDownloads = release.assets.reduce((sum, asset) => sum + asset.downloads, 0);

  const published = new Date(release.publishedAt);

  const daysAgo = Math.floor((Date.now() - published.getTime()) / (1000 * 60 * 60 * 24));

  const downloadAsset = release.assets.find((a) => a.name.endsWith(".exe")) ?? release.assets[0];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">Current Release</p>

          <h2 className="mt-2 text-5xl font-bold text-white">{release.version}</h2>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/50">
            <span>Released {daysAgo === 0 ? "today" : `${daysAgo} days ago`}</span>

            <span>{release.assets.length} assets</span>

            <span>{totalDownloads} downloads</span>
          </div>
        </div>

        <a
          href={downloadAsset?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            rounded-2xl
            bg-white
            px-6
            py-3
            font-medium
            text-black
            transition
            hover:scale-[1.02]
          "
        >
          Download Latest
        </a>
      </div>

      {release.body && (
        <div className="mt-8">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/40">Whats New</p>

          <pre className="whitespace-pre-wrap font-sans text-white/60">{release.body}</pre>
        </div>
      )}
    </div>
  );
}
