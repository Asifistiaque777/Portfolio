// src/components/sections/Contact.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Send, Mail, Github, Linkedin, MessageSquare, Facebook, Loader2, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// 🚀 আপনার রিয়েল ইনফরমেশন সিঙ্ক করা হয়েছে
const MY_EMAIL = "asifistiaque32@gmail.com";
const MY_WHATSAPP = "8801785480822"; 
const DISPLAY_PHONE = "+880 1785-480822";

const socials = [
  { icon: Github, href: "https://github.com/Asifistiaque777", label: "GitHub", color: "hover:text-white hover:border-white/40 hover:bg-white/5" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/asif-istiaque", label: "LinkedIn", color: "hover:text-[#0077B5] hover:border-[#0077B5]/40 hover:bg-[#0077B5]/5" },
  { icon: MessageSquare, href: `https://wa.me/${MY_WHATSAPP}`, label: "WhatsApp", color: "hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/5" },
  { icon: Facebook, href: "https://www.facebook.com/share/1964WsReHN/", label: "Facebook", color: "hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5" },
  { icon: Mail, href: `mailto:${MY_EMAIL}`, label: "Email", color: "hover:text-neon-green hover:border-neon-green/40 hover:bg-neon-green/5" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    setSubmitting(true);
    const toastId = toast.loading("Processing your message...");
    
    try {
      // ১. ফায়ারবেস ডেটাবেজে ব্যাকআপ সেভ
      await addDoc(collection(db, "messages"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      toast.success("Saved to database! Redirecting to email...", { id: toastId });

      // ২. সরাসরি ডেটাসহ মেইলে রিডিরেক্ট
      const emailSubject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
      const emailBody = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      );
      
      window.open(`mailto:${MY_EMAIL}?subject=${emailSubject}&body=${emailBody}`, "_blank");

      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড নিওন গ্লো ইফেক্ট */}
      <div className="absolute top-1/2 left-1/4 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-neon-green/5 blur-[120px]" />

      <SectionHeading
        eyebrow="Get In Touch"
        title="Let's Build Something Great"
        subtitle="Have a project in mind or just want to say hi? My inbox is always open."
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5 relative z-10 px-4">
        
        {/* 📋 বাম পাশের কার্ড: কন্টাক্ট ইনফরমেশন (আল্ট্রা হাইলাইটেড ডিজাইন) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 flex flex-col justify-between bg-[#131110]/60 border border-white/5 backdrop-blur-md p-8 rounded-2xl group hover:border-neon-green/30 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.05)]"
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-neon-green transition-colors duration-300">
                Contact Information
              </h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed font-normal">
                Reach out directly or fill the form — I will respond as soon as humanly possible.
              </p>
            </div>

            {/* হাইলাইটেড কন্টাক্ট রো */}
            <div className="space-y-4 pt-2">
              <a 
                href={`mailto:${MY_EMAIL}`} 
                className="flex items-center gap-4 font-mono text-xs sm:text-sm text-slate-300 hover:text-neon-green transition-all duration-300 w-fit group/link"
              >
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover/link:border-neon-green/40 text-slate-400 group-hover/link:text-neon-green group-hover/link:shadow-glow-green-sm transition-all duration-300 bg-gradient-to-br from-white/[0.02] to-transparent">
                  <Mail size={18} />
                </div>
                <span className="tracking-wide group-hover/link:translate-x-1 transition-transform duration-300">{MY_EMAIL}</span>
              </a>
              
              <a 
                href={`https://wa.me/${MY_WHATSAPP}`} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-4 font-mono text-xs sm:text-sm text-slate-300 hover:text-[#25D366] transition-all duration-300 w-fit group/link"
              >
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover/link:border-[#25D366]/40 text-slate-400 group-hover/link:text-[#25D366] group-hover/link:shadow-[0_0_15px_rgba(37,211,102,0.15)] transition-all duration-300 bg-gradient-to-br from-white/[0.02] to-transparent">
                  <Phone size={18} />
                </div>
                <span className="tracking-wide group-hover/link:translate-x-1 transition-transform duration-300">{DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* 🌐 প্রিমিয়াম সোশ্যাল আইকন গ্রিড */}
          <div className="mt-12">
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4 font-bold">Connect Socially</p>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-xl border border-white/5 bg-white/[0.01] p-3 text-slate-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:-translate-y-1 ${color}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ✉️ ডানপাশের কার্ড: ইন্টারঅ্যাক্টিভ ফর্ম */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="lg:col-span-3 bg-[#131110]/60 border border-white/5 backdrop-blur-md flex flex-col gap-5 p-8 rounded-2xl hover:border-white/10 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] text-left"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-mono tracking-wider text-slate-400 uppercase font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-neon-green/40 focus:ring-1 focus:ring-neon-green/10 transition-all duration-200"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono tracking-wider text-slate-400 uppercase font-medium">Your Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-neon-green/40 focus:ring-1 focus:ring-neon-green/10 transition-all duration-200"
                required
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-mono tracking-wider text-slate-400 uppercase font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell me about your project or share your ideas..."
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-neon-green/40 focus:ring-1 focus:ring-neon-green/10 transition-all duration-200 resize-none leading-relaxed"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={submitting} 
            className="w-full sm:w-fit inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold bg-neon-green text-black hover:bg-emerald-400 transition-all duration-200 shadow-glow-green-sm active:scale-95 disabled:opacity-50 font-mono uppercase tracking-wider mt-2 ml-auto cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Ingesting...
              </>
            ) : (
              <>
                Send Message <Send size={14} />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}