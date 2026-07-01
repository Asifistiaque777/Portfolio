// src/components/sections/ProjectCard.jsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const { title, description, tags = [], image, liveLink, githubLink } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="glass-card glass-card-hover group flex flex-col overflow-hidden"
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-850">
        {image ? (
          <Image
            src={image}
            alt={`${title} preview screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-bg-surface">
            <FolderGit2 className="text-slate-600" size={40} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-80" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="line-clamp-3 text-sm text-slate-400">{description}</p>

        {tags.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neon-green/20 bg-neon-green/5 px-3 py-1 font-mono text-[11px] text-neon-green"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-3 pt-4">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neon-green transition-colors hover:text-emerald-300"
            >
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-neon-orange"
            >
              <Github size={15} /> Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
