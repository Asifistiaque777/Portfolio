// src/components/ui/CyberBackground.jsx
"use client";

export default function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />

      {/* Glow orbs */}
      <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-neon-green/20 blur-[140px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 h-[450px] w-[450px] rounded-full bg-neon-orange/10 blur-[140px] animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-neon-green/10 blur-[140px] animate-pulse-glow" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
    </div>
  );
}
