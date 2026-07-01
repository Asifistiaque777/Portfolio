"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { UploadCloud, Loader2, Link2 } from "lucide-react";
import { addProjectWithUrl } from "@/lib/firestoreActions";

const initialState = {
  title: "",
  description: "",
  tags: "",
  liveLink: "",
  githubLink: "",
  imageUrl: "",
};

export default function AddProjectForm() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      toast.error("Title and description are required.");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Publishing project...");

    try {
      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await addProjectWithUrl({
        title: form.title,
        description: form.description,
        tags: tagsArray,
        liveLink: form.liveLink,
        githubLink: form.githubLink,
        image: form.imageUrl,
      });

      toast.success("Project published successfully!", { id: toastId });
      setForm(initialState);
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish. Check console for details.", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-tag mb-2 block">Project Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="E-Commerce Analytics Dashboard"
            className="input-cyber"
            required
          />
        </div>
        <div>
          <label className="label-tag mb-2 block">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Next.js, Firebase, Tailwind"
            className="input-cyber"
          />
        </div>
      </div>

      <div>
        <label className="label-tag mb-2 block">Description *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Briefly describe the project, your role, and key results..."
          className="input-cyber resize-none"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-tag mb-2 block">Live Link</label>
          <input
            type="url"
            name="liveLink"
            value={form.liveLink}
            onChange={handleChange}
            placeholder="https://yourproject.com"
            className="input-cyber"
          />
        </div>
        <div>
          <label className="label-tag mb-2 block">GitHub Link</label>
          <input
            type="url"
            name="githubLink"
            value={form.githubLink}
            onChange={handleChange}
            placeholder="https://github.com/you/repo"
            className="input-cyber"
          />
        </div>
      </div>

      <div>
        <label className="label-tag mb-2 block">Project Image URL</label>
        <div className="relative">
          <Link2 size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://i.ibb.co/xxxxx/your-screenshot.png"
            className="input-cyber pl-10"
          />
        </div>
        <p className="mt-2 text-[11px] text-slate-500">
          ইমেজ আগে <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-neon-green underline">imgbb.com</a> তে আপলোড করুন।
        </p>
      </div>

      <button type="submit" disabled={submitting} className="btn-primary mt-2 disabled:opacity-60">
        {submitting ? "Publishing..." : "Publish Project"}
      </button>
    </form>
  );
}