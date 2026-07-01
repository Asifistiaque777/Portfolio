// src/components/sections/Hero.jsx
"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 text-center sm:px-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/5 px-4 py-1.5 font-mono text-xs text-neon-green"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
        </span>
        Available for new opportunities
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="max-w-5xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
      >
        HI, I&apos;M{" "}
        <span className="gradient-text drop-shadow-[0_0_35px_rgba(34,197,94,0.35)]">
          ASIF ISTIAQUE
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl"
      >
        Building{" "}
        <span className="text-neon-green font-semibold">High-Performance Web Apps</span>{" "}
        &amp;{" "}
        <span className="text-neon-orange font-semibold">Data Pipelines</span>{" "}
        that Drive Businesses.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a href="#projects" className="btn-primary">
          View My Work <ArrowRight size={16} />
        </a>
        <a href="/resume.pdf" className="btn-outline" download="Asif-Istiaque-Resume.pdf">
          Download Resume <Download size={16} />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="mt-12 flex items-center gap-5"
      >
        {[
          { icon: Github, href: "https://github.com/", label: "GitHub" },
          { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
          { icon: Mail, href: "#contact", label: "Email" },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 bg-white/[0.02] p-3 text-slate-400 transition-all duration-300 hover:border-neon-green/50 hover:text-neon-green hover:shadow-glow-green-sm"
          >
            <Icon size={18} />
          </a>
        ))}
      </motion.div>

      {/* Floating tech badges */}
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-1/3 hidden lg:block font-mono text-xs text-neon-green/60 glass-card px-3 py-2"
      >
        {"<NextJS />"}
      </motion.div>
      <motion.div
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-[8%] top-1/4 hidden lg:block font-mono text-xs text-neon-orange/60 glass-card px-3 py-2"
      >
        {"Python · ETL"}
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-[12%] bottom-1/4 hidden lg:block font-mono text-xs text-neon-green/60 glass-card px-3 py-2"
      >
        {"Firebase"}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-9 w-5 rounded-full border border-slate-600 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-neon-green"
          />
        </div>
      </motion.div>
    </section>
  );
}
