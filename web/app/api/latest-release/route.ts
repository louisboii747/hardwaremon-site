import { NextResponse } from "next/server";

export const runtime = "edge";

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  download_count: number;
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  body: string;
  assets: GitHubAsset[];
}

export async function GET() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/louisboii747/HardwareMon/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch latest release" },
        { status: response.status }
      );
    }

    const release: GitHubRelease = await response.json();

    return NextResponse.json({
      version: release.tag_name,
      publishedAt: release.published_at,
      body: release.body,
      assets: release.assets.map((asset) => ({
        name: asset.name,
        url: asset.browser_download_url,
        downloads: asset.download_count,
      })),
    });
  } catch (error) {
    console.error("GitHub release fetch failed:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
