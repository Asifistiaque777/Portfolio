// src/components/sections/ProjectCard.jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, FolderGit2, Eye, X, Loader2 } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const { title, description, tags = [], image, liveLink, githubLink } = project;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  // ড্রয়ার ওপেন করার ফাংশন
  const handleOpenDrawer = () => {
    if (liveLink) {
      setIsDrawerOpen(true);
      setIframeLoading(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
        onClick={handleOpenDrawer}
        className={`glass-card bg-[#171412] border border-white/5 rounded-2xl group flex flex-col overflow-hidden w-full transition-all duration-300 hover:shadow-2xl ${
          liveLink ? "cursor-pointer" : ""
        }`}
      >
        {/* প্রজেক্ট ভিজ্যুয়াল এরিয়া */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-900 border-b border-white/5">
          {image ? (
            <Image
              src={image}
              alt={`${title} preview screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              priority={index < 2}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
              <FolderGit2 className="text-slate-600" size={48} />
            </div>
          )}

          <div className="absolute top-3 right-3 z-10 rounded bg-black/60 backdrop-blur-sm px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-white uppercase opacity-80">
            TOP
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#171412] via-transparent to-transparent opacity-90" />
        </div>

        {/* কন্টেন্ট ইনফরমেশন সেকশন */}
        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            <div className="mt-2 flex">
              <span className="rounded bg-neon-orange/10 px-2 py-0.5 font-sans text-[11px] font-medium text-neon-orange tracking-wide">
                Marketplace
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-400 font-normal leading-relaxed">
            {description}
          </p>

          {tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/5 bg-white/[0.02] px-2.5 py-1 font-mono text-[11px] text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* বাটন প্যানেল */}
          <div className="mt-auto pt-6 flex items-center gap-3 w-full">
            {liveLink && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // কার্ডের ক্লিক ইভেন্টকে থামানোর জন্য
                  handleOpenDrawer();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#f97316] text-white hover:bg-orange-600 transition-all duration-200 active:scale-95 shadow-md shadow-orange-600/10"
              >
                <Eye size={16} /> Preview
              </button>
            )}

            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // ড্রয়ার ওপেন হওয়া আটকাবে
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#22c55e] text-white hover:bg-green-600 transition-all duration-200 active:scale-95 shadow-md shadow-green-600/10"
              >
                <ExternalLink size={16} /> Visit
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // ড্রয়ার ওপেন হওয়া আটকাবে
                aria-label="View Source Code"
                className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-slate-400 transition-all duration-200 hover:border-slate-700 hover:text-white hover:bg-slate-900"
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* 🚀 প্রিভিউ লাইভ ড্রয়ার (Slide-over Panel) */}
      <AnimatePresence>
        {isDrawerOpen && liveLink && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* ব্যাকড্রপ ওভারলে */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* মেইন ড্রয়ার প্যানেল */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 150 }}
              className="relative z-10 h-full w-full max-w-[85vw] border-l border-white/10 bg-slate-950 flex flex-col shadow-2xl"
            >
              
              {/* ড্রয়ার হেডার বার */}
              <div className="flex items-center justify-between border-b border-white/5 bg-slate-900/50 px-6 py-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">{title} — Live Preview</h3>
                  <span className="hidden sm:inline-flex rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
                    Interactive
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white transition-colors border border-white/10 rounded-lg px-2.5 py-1.5 bg-white/[0.02]"
                  >
                    Open in new tab <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* ড্রয়ারের ভেতর আইফ্রেম বডি */}
              <div className="relative flex-1 bg-white overflow-hidden">
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 gap-3 z-30">
                    <Loader2 size={28} className="animate-spin text-neon-green" />
                    <p className="font-mono text-xs">Connecting to secure instance...</p>
                  </div>
                )}
                <iframe
                  src={liveLink}
                  title={`${title} live dashboard view`}
                  className="h-full w-full border-none"
                  onLoad={() => setIframeLoading(false)}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}