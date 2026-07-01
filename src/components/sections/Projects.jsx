// src/components/sections/Projects.jsx
"use client";
import { useEffect, useState } from "react";
import { FolderGit2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import { getProjects } from "@/lib/firestoreActions";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProjects().then((data) => {
      if (mounted) {
        setProjects(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="projects" className="section-padding relative">
      <SectionHeading
        eyebrow="Portfolio"
        title="Featured Projects"
        subtitle="A selection of production-grade web applications and data systems I've architected and shipped."
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass-card h-[360px] animate-pulse bg-white/[0.02]"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 glass-card p-12 text-center">
          <FolderGit2 className="text-neon-green/50" size={36} />
          <p className="text-slate-400">
            No projects published yet. Check back soon — new work is added regularly via
            the admin dashboard.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
