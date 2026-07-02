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
  Trophy,
  Star,
  Loader2,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { getCertificates } from "@/lib/firestoreActions";

const iconMap = {
  Award,
  BadgeCheck,
  Trophy,
  Star,
  GraduationCap,
};

const education = [
  {
    degree: "BSc in Computer Science & Engineering",
    institution: "American International University-Bangladesh (AIUB)",
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
    // getCertificates এখন সরাসরি ফায়ারবেস থেকে কাস্টম 'order' অনুযায়ী সর্ট করা ডেটা নিয়ে আসবে
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
        
        {/* ---------------- 🚀 CERTIFICATIONS (NEW VERTICAL CARD DESIGN) ---------------- */}
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-neon-green">
            <BadgeCheck size={18} /> Certifications
          </h3>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="glass-card h-[340px] animate-pulse bg-white/[0.02] rounded-2xl" />
              ))}
            </div>
          ) : certs.length === 0 ? (
            <div className="glass-card p-8 text-center text-sm text-slate-400">
              No certificates added yet.
            </div>
          ) : (
            // মোবাইল ও ডেস্কটপের জন্য কাস্টম ড্র্যাগ অর্ডার অনুযায়ী সাজানো গ্রিড
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {certs.map((cert, i) => {
                const IconComponent = iconMap[cert.badgeIcon] || Award;

                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="glass-card bg-[#171412]/50 border border-white/5 rounded-2xl flex flex-col overflow-hidden w-full group hover:border-neon-green/20 transition-all duration-300 hover:shadow-xl"
                  >
                    {/* 📸 ১. টপ ভিজ্যুয়াল এরিয়া (মোবাইল ফ্রেন্ডলি ল্যান্ডস্কেপ অ্যাসপেক্ট রেশিও) */}
                    <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-slate-900 border-b border-white/5 flex items-center justify-center">
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={`${cert.title} preview`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-green/10 text-neon-green shadow-glow-green-sm">
                          <IconComponent size={22} />
                        </div>
                      )}
                      
                      {/* নিওন অ্যাকসেন্ট টপ-লেফট ইন্ডিকেটর */}
                      <div className="absolute top-2 left-2 rounded-md bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider text-neon-green uppercase border border-neon-green/10">
                        Verified
                      </div>
                    </div>

                    {/* 📝 ২. টেক্সট ডিটেইলস সেকশন (কার্ড বডি) */}
                    <div className="flex flex-1 flex-col p-5 gap-2 text-left justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm leading-snug tracking-tight group-hover:text-neon-green transition-colors duration-200 line-clamp-2">
                          {cert.title}
                        </h4>
                        
                        <p className="text-[11px] text-slate-400 font-medium mt-1">
                          {cert.issuer}
                        </p>
                        
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono mt-0.5">
                          <Calendar size={11} /> {cert.issueDate || "N/A"}
                        </div>

                        {cert.description && (
                          <p className="text-[11px] text-slate-500 mt-2 line-clamp-3 leading-relaxed font-normal">
                            {cert.description}
                          </p>
                        )}
                      </div>

                      {/* 🔗 ৩. ক্রেডেনশিয়াল অ্যাকশন বাটন (কার্ডের একদম নিচে) */}
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/[0.03] border border-white/5 text-slate-300 hover:bg-neon-green hover:text-black hover:border-transparent transition-all duration-200 active:scale-95"
                        >
                          Verify Credential <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* ---------------- 🎓 EDUCATION TIMELINE SECTION ---------------- */}
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-neon-orange">
            <GraduationCap size={18} /> Education
          </h3>

          <div className="relative space-y-8 border-l border-white/10 pl-8">
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
                <div className="glass-card bg-[#171412]/30 border border-white/5 p-6 rounded-2xl transition-all duration-300 hover:border-neon-orange/20">
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs text-neon-orange">
                    <Calendar size={14} /> {edu.period}
                  </div>
                  <h4 className="text-lg font-bold text-white leading-tight">{edu.degree}</h4>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {edu.institution}
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}