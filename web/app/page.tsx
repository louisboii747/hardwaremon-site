import Hero from "@/components/hero/hero";
import RealtimeTelemetry from "@/components/sections/realtime-telemetry";
import TelemetryStory from "@/components/sections/TelemetryStory";
import ReleaseCard from "@/components/release/release-card";
import TelemetryPreview from "@/components/hero/telemetry-preview";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Hero />
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <TelemetryPreview />
        </div>
      </section>
      <RealtimeTelemetry />
      <TelemetryStory />

      <section className="mx-auto max-w-7xl px-6 py-32">
        <ReleaseCard />
      </section>
    </main>
  );
}
