// src/components/sections/Hero.jsx
"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  // অ্যানিমেশন ভেরিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 }
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 text-center sm:px-10 lg:pt-20"
    >
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্টস */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-neon-green/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-neon-orange/5 blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center max-w-5xl z-10"
      >
        {/* ১. স্ট্যাটাস ব্যাজ */}
        <motion.div
          variants={itemVariants}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-neon-green/30 bg-neon-green/[0.03] px-4 py-2 font-mono text-xs tracking-wide text-neon-green backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
          </span>
          Available for new opportunities
        </motion.div>

        {/* ২. প্রিমিয়াম প্রফেশনাল ইমেজ ফ্রেম */}
        <motion.div 
          variants={imageVariants} 
          className="relative mb-8 flex justify-center group"
        >
          {/* ছবির পেছনের গ্লোয়িং বর্ডার রিং */}
          <div className="absolute inset-0 -m-1.5 rounded-full bg-gradient-to-r from-neon-green to-teal-500 opacity-40 blur-sm transition duration-500 group-hover:opacity-70 group-hover:blur-md" />
          
          <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-white/10 bg-slate-900 p-1.5 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03] sm:h-56 sm:w-56">
            <img
              src="https://osdelivery.shop/developer.jpg"
              alt="Asif Istiaque"
              className="h-full w-full rounded-full object-cover filter contrast-[1.05] brightness-[1.02]"
            />
          </div>
        </motion.div>

        {/* ৩. মেইন হেডিং */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          HI, I&apos;M{" "}
          <span className="gradient-text bg-gradient-to-r from-neon-green via-emerald-400 to-teal-400 drop-shadow-[0_0_35px_rgba(34,197,94,0.3)]">
            ASIF ISTIAQUE
          </span>
        </motion.h1>

        {/* ৪. প্রফেশনাল সাব-টাইটেল / ডেসক্রিপশন */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-base text-slate-400 font-normal leading-relaxed sm:text-xl px-2"
        >
          Architecting{" "}
          <span className="text-white border-b border-neon-green/40 pb-0.5 font-medium">High-Performance Web Apps</span>{" "}
          &amp;{" "}
          <span className="text-white border-b border-neon-orange/40 pb-0.5 font-medium">Robust Data Pipelines</span>{" "}
          engineered to scale businesses.
        </motion.p>

        {/* ৫. ইন্টারেক্টিভ অ্যাকশন বাটনসমূহ */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a href="#projects" className="btn-primary w-full sm:w-auto justify-center group shadow-lg shadow-neon-green/20 hover:shadow-neon-green/40 transition-all duration-300">
            View My Work 
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="/resume.pdf" className="btn-outline w-full sm:w-auto justify-center group backdrop-blur-sm" download="Asif-Istiaque-Resume.pdf">
            Download Resume 
            <Download size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        {/* ৬. মডার্ন সোশ্যাল আইকন গ্রিড */}
        <motion.div
          variants={itemVariants}
          className="mt-14 flex items-center gap-6"
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
              className="group relative rounded-full border border-white/5 bg-white/[0.01] p-3.5 text-slate-400 transition-all duration-300 hover:border-neon-green/30 hover:text-neon-green hover:bg-neon-green/[0.02]"
            >
              {/* হোভার গ্লো ইফেক্ট */}
              <div className="absolute inset-0 rounded-full bg-neon-green/0 opacity-0 blur-md transition-all duration-300 group-hover:bg-neon-green/20 group-hover:opacity-100" />
              <Icon size={20} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating dynamic tech badges */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[6%] top-[35%] hidden xl:block font-mono text-xs tracking-wider text-neon-green/70 glass-card px-4 py-2.5 border border-neon-green/20 shadow-[0_0_15px_rgba(34,197,94,0.05)]"
      >
        {"<NextJS />"}
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-[6%] top-[30%] hidden xl:block font-mono text-xs tracking-wider text-neon-orange/70 glass-card px-4 py-2.5 border border-neon-orange/20 shadow-[0_0_15px_rgba(249,115,22,0.05)]"
      >
        {"Python · ETL"}
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute right-[10%] bottom-[28%] hidden xl:block font-mono text-xs tracking-wider text-neon-green/70 glass-card px-4 py-2.5 border border-neon-green/20"
      >
        {"Firebase"}
      </motion.div>

      {/* স্ক্রোল ইন্ডিকেটর */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-slate-500 cursor-pointer select-none transition-colors duration-300 hover:text-neon-green"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.4em]">Scroll Down</span>
        <div className="h-9 w-5 rounded-full border border-slate-700 p-1 flex justify-center">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1.5 rounded-full bg-neon-green"
          />
        </div>
      </motion.div>
    </section>
  );
}