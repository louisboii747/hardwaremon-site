import Hero from "@/components/hero/hero";
import RealtimeTelemetry from "@/components/sections/realtime-telemetry";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <Hero />
      <RealtimeTelemetry />
    </main>
  );
}