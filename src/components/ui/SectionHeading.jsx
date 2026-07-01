// src/components/ui/SectionHeading.jsx
"use client";
import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-14 flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow && (
        <span className="label-tag flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-glow-green-sm" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base sm:text-lg text-slate-400">{subtitle}</p>
      )}
    </motion.div>
  );
}
