import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/custom-cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HardwareMon",
  description: "Modern cross-platform hardware monitoring and analytics for Windows and Linux.",

  keywords: [
    "hardware monitor",
    "system monitor",
    "cpu monitor",
    "gpu monitor",
    "temperature monitor",
    "windows",
    "linux",
    "telemetry",
    "performance monitoring",
  ],

  openGraph: {
    title: "HardwareMon",
    description: "Modern cross-platform hardware monitoring and analytics for Windows and Linux.",
    siteName: "HardwareMon",
    type: "website",
    url: "https://hardwaremon-site.pages.dev",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HardwareMon",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Windows, Linux",
  description: "Modern cross-platform hardware monitoring and analytics for Windows and Linux.",
  url: "https://hardwaremon-site.pages.dev",
  downloadUrl: "https://github.com/louisboii747/HardwareMon/releases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />

        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
