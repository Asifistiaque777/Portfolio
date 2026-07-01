// src/components/admin/AddCertificateForm.jsx
"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Award, BadgeCheck, GraduationCap, Loader2, Star, Trophy, Link2 } from "lucide-react";
import { addCertificate } from "@/lib/firestoreActions";

const badgeOptions = [
  { value: "Award", icon: Award },
  { value: "BadgeCheck", icon: BadgeCheck },
  { value: "Trophy", icon: Trophy },
  { value: "Star", icon: Star },
  { value: "GraduationCap", icon: GraduationCap },
];

const initialState = {
  title: "",
  issuer: "",
  issueDate: "",
  credentialUrl: "",
  badgeIcon: "Award",
  image: "", // 🆕 ফায়ারবেসে ইমেজ পাথ স্টোর করার জন্য
};

export default function AddCertificateForm() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.issuer) {
      toast.error("Title and issuer are required.");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Saving certificate...");

    try {
      await addCertificate(form);
      toast.success("Certificate added successfully!", { id: toastId });
      setForm(initialState);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save certificate.", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-tag mb-2 block">Certificate Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Machine Learning Specialization"
            className="input-cyber"
            required
          />
        </div>
        <div>
          <label className="label-tag mb-2 block">Issuer *</label>
          <input
            type="text"
            name="issuer"
            value={form.issuer}
            onChange={handleChange}
            placeholder="Udemy / Kaggle / Coursera"
            className="input-cyber"
            required
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-tag mb-2 block">Issue Date</label>
          <input
            type="text"
            name="issueDate"
            value={form.issueDate}
            onChange={handleChange}
            placeholder="June 2026"
            className="input-cyber"
          />
        </div>
        <div>
          <label className="label-tag mb-2 block">Credential URL</label>
          <input
            type="url"
            name="credentialUrl"
            value={form.credentialUrl}
            onChange={handleChange}
            placeholder="https://verify.credential.com/..."
            className="input-cyber"
          />
        </div>
      </div>

      {/* 🆕 সার্টিফিকেট ইমেজ URL ইনপুট ফিল্ড */}
      <div>
        <label className="label-tag mb-2 block">Certificate Image URL</label>
        <div className="relative">
          <Link2 size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://i.ibb.co/xxxxx/your-certificate.png"
            className="input-cyber pl-10"
          />
        </div>
        <p className="mt-2 text-[11px] text-slate-500">
          সার্টিফিকেটের ছবি প্রথমে <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-neon-green underline">imgbb.com</a> তে আপলোড করে ডাইরেক্ট লিংকটি এখানে দিন।
        </p>
      </div>

      <div>
        <label className="label-tag mb-3 block">Badge Icon</label>
        <div className="flex flex-wrap gap-3">
          {badgeOptions.map(({ value, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, badgeIcon: value }))}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${
                form.badgeIcon === value
                  ? "border-neon-green bg-neon-green/10 text-neon-green shadow-glow-green-sm"
                  : "border-white/10 bg-white/[0.02] text-slate-500 hover:text-slate-300"
              }`}
              aria-label={value}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary mt-2 disabled:opacity-60">
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Saving...
          </>
        ) : (
          <>
            <Award size={16} /> Add Certificate
          </>
        )}
      </button>
    </form>
  );
}