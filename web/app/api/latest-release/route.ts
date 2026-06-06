export async function GET() {
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

  const response = await fetch(
    "https://api.github.com/repos/louisboii747/HardwareMon/releases/latest",
    {
      next: {
        revalidate: 3600,
      },
      headers: {
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    return Response.json(
      {
        error: "Failed to fetch latest release",
      },
      {
        status: response.status,
      }
    );
  }

  const release: GitHubRelease = await response.json();

  return Response.json({
    version: release.tag_name,
    publishedAt: release.published_at,
    body: release.body,

    assets: release.assets.map((asset: GitHubAsset) => ({
      name: asset.name,
      url: asset.browser_download_url,
      downloads: asset.download_count,
    })),
  });
}
