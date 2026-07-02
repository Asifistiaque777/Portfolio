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
    // getProjects এখন সরাসরি ফায়ারবেস থেকে কাস্টম 'order' অনুযায়ী সর্ট করা ডেটা নিয়ে আসবে
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
        // স্কেলেটন লোডারের কলাম সংখ্যাও ২ কলামে ম্যাচ করা হয়েছে বড় কার্ডের সাথে
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="glass-card h-[450px] animate-pulse bg-white/[0.02] rounded-2xl"
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
        // কার্ড বড় করার সুবিধার্থে ৩ কলাম থেকে কমিয়ে প্রফেশনাল ২ কলাম লেআউট করা হয়েছে
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}