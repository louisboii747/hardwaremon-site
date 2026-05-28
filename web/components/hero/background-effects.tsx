export default function BackgroundEffects() {
  return (
    <>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),transparent_40%)]" />

      {/* Center ambient glow */}
      <div className="absolute left-1/2 top-[30%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      {/* Ambient glow orb */}
      <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Secondary glow */}
      <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500-500/10 blur-3xl" />

      {/* Grid overlay */}
      <div
        className="
          absolute inset-0 opacity-[0.08]
          [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('/noise.png')]" />
    </>
  );
}
