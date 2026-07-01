// src/components/sections/Certificates.jsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  ExternalLink,
  GraduationCap,
  Calendar,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { getCertificates } from "@/lib/firestoreActions";

const education = [
  {
    degree: "BSc in Computer Science & Engineering",
    institution: "Your University Name",
    period: "2021 — 2025",
    description:
      "Specialized in software engineering, database systems, and applied machine learning. Active contributor to university tech clubs and hackathons.",
  },
];

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCertificates().then((data) => {
      if (mounted) {
        setCerts(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="certificates" className="section-padding relative">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications & Education"
        subtitle="Continuous learning across web development, cloud, and data engineering."
      />

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        {/* Certificates */}
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-neon-green">
            <BadgeCheck size={18} /> Certifications
          </h3>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass-card h-20 animate-pulse bg-white/[0.02]" />
              ))}
            </div>
          ) : certs.length === 0 ? (
            <div className="glass-card p-8 text-center text-sm text-slate-400">
              No certificates added yet.
            </div>
          ) : (
            <div className="space-y-4">
              {certs.map((cert, i) => (
                <motion.a
                  key={cert.id}
                  href={cert.credentialUrl || "#"}
                  target={cert.credentialUrl ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass-card glass-card-hover flex items-center gap-4 p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-green/10 text-neon-green">
                    <Award size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">{cert.title}</p>
                    <p className="text-sm text-slate-400">
                      {cert.issuer} {cert.issueDate ? `· ${cert.issueDate}` : ""}
                    </p>
                  </div>
                  {cert.credentialUrl && (
                    <ExternalLink size={16} className="shrink-0 text-slate-500" />
                  )}
                </motion.a>
              ))}
            </div>
          )}
        </div>

        {/* Education timeline */}
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-neon-orange">
            <GraduationCap size={18} /> Education
          </h3>

          <div className="relative space-y-10 border-l border-white/10 pl-8">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[39px] top-1 h-4 w-4 rounded-full border-2 border-bg bg-neon-orange shadow-glow-orange" />
                <div className="glass-card glass-card-hover p-6">
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs text-neon-orange">
                    <Calendar size={14} /> {edu.period}
                  </div>
                  <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {edu.institution}
                  </p>
                  <p className="mt-3 text-sm text-slate-400">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
