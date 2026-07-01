// src/components/sections/About.jsx
"use client";
import { motion } from "framer-motion";
import { Code2, Database, Rocket, Sparkles } from "lucide-react";

const stats = [
  { icon: Code2, value: "20+", label: "Projects Shipped" },
  { icon: Database, value: "10+", label: "Data Pipelines Built" },
  { icon: Rocket, value: "3+", label: "Years Experience" },
  { icon: Sparkles, value: "100%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section className="relative px-6 sm:px-10 lg:px-24 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="glass-card glass-card-hover flex flex-col items-center gap-2 p-6 text-center"
          >
            <Icon className="text-neon-green" size={22} />
            <span className="text-2xl sm:text-3xl font-bold text-white">{value}</span>
            <span className="text-xs text-slate-400">{label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
