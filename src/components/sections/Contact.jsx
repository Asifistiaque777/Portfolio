// src/components/sections/Contact.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Send, Mail, Github, Linkedin, Twitter, Loader2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const socials = [
  { icon: Github, href: "https://github.com/", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@asifistiaque.dev", label: "Email" },
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
    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <SectionHeading
        eyebrow="Get In Touch"
        title="Let's Build Something Great"
        subtitle="Have a project in mind or just want to say hi? My inbox is always open."
      />

      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 flex flex-col justify-between glass-card p-8"
        >
          <div>
            <h3 className="text-xl font-bold text-white">Contact Information</h3>
            <p className="mt-3 text-sm text-slate-400">
              Reach out directly or fill the form — I respond within 24 hours.
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-sm text-neon-green">
              <Mail size={16} /> hello@asifistiaque.dev
            </div>
          </div>

          <div className="mt-10 flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/[0.02] p-3 text-slate-400 transition-all duration-300 hover:border-neon-green/50 hover:text-neon-green hover:shadow-glow-green-sm"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="lg:col-span-3 glass-card flex flex-col gap-5 p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label-tag mb-2 block">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="input-cyber"
                required
              />
            </div>
            <div>
              <label className="label-tag mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className="input-cyber"
                required
              />
            </div>
          </div>
          <div>
            <label className="label-tag mb-2 block">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Tell me about your project..."
              className="input-cyber resize-none"
              required
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary mt-2 disabled:opacity-60">
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send Message <Send size={16} />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
