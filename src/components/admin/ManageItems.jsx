// src/components/admin/ManageItems.jsx
"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2, Loader2, ExternalLink, X } from "lucide-react";
import { getProjects, deleteProject, updateProject, getCertificates, deleteCertificate, updateCertificate } from "@/lib/firestoreActions";
import Modal from "@/components/ui/Modal"; // আপনার প্রজেক্টের মডাল কম্পোনেন্ট

export default function ManageItems({ type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // এডিট স্টেটের জন্য ভ্যারিয়েবল
  const [editingItem, setEditingItem] = useState(null); 
  const [editForm, setEditForm] = useState({ title: "", tags: "", liveLink: "", githubLink: "", description: "" });
  const [updating, setUpdating] = useState(false);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      if (type === "project") {
        const data = await getProjects();
        setItems(data);
      } else {
        const data = await getCertificates();
        setItems(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [type]);

  // ডিলিট লজিক
  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    const toastId = toast.loading("Deleting...");
    try {
      if (type === "project") {
        await deleteProject(id);
      } else {
        await deleteCertificate(id);
      }
      toast.success("Deleted successfully!", { id: toastId });
      fetchDocs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete.", { id: toastId });
    }
  };

  // এডিট বাটন চাপলে ফর্ম পপুলেট করার ফাংশন
  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditForm({
      title: item.title || "",
      tags: item.tags ? item.tags.join(", ") : "",
      liveLink: item.liveLink || "",
      githubLink: item.githubLink || "",
      description: item.description || ""
    });
  };

  // আপডেট সাবমিট লজিক
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const toastId = toast.loading("Updating item...");

    try {
      const tagsArray = editForm.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const updatedData = {
        title: editForm.title,
        tags: tagsArray,
        liveLink: editForm.liveLink,
        githubLink: editForm.githubLink,
        description: editForm.description,
      };

      if (type === "project") {
        await updateProject(editingItem.id, updatedData);
      } else {
        await updateCertificate(editingItem.id, updatedData);
      }

      toast.success("Updated successfully!", { id: toastId });
      setEditingItem(null); // মডাল বন্ধ করা
      fetchDocs(); // লিস্ট রিফ্রেশ করা
    } catch (err) {
      console.error(err);
      toast.error("Failed to update.", { id: toastId });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="animate-spin text-neon-green" size={28} />
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-slate-500 text-sm py-4">No published {type}s found.</p>;
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto w-full rounded-xl border border-white/5 bg-white/[0.01]">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-white/[0.02] text-xs uppercase text-slate-300 font-mono">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4 hidden sm:table-cell">Tags / Info</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-4 font-medium text-white">
                  <div className="flex flex-col">
                    <span>{item.title}</span>
                    {item.liveLink && (
                      <a href={item.liveLink} target="_blank" rel="noreferrer" className="text-xs text-neon-green inline-flex items-center gap-0.5 mt-0.5 hover:underline">
                        Live <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {item.tags?.map((t) => (
                      <span key={t} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-300">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEditClick(item)}
                      className="p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🚀 ডায়নামিক এডিট মডাল পপআপ */}
      {editingItem && (
        <Modal isOpen={!!editingItem} onClose={() => setEditingItem(null)}>
          <div className="p-6 bg-slate-950 rounded-2xl border border-white/10 max-w-lg w-full text-left relative">
            <button 
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            
            <h3 className="text-lg font-bold text-white mb-4">Edit {type === "project" ? "Project" : "Certificate"}</h3>
            
            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-slate-400 font-mono block mb-1">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="input-cyber w-full bg-slate-900 border border-white/5 text-sm p-2 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-mono block mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={editForm.tags}
                  onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                  className="input-cyber w-full bg-slate-900 border border-white/5 text-sm p-2 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-mono block mb-1">Live Link</label>
                  <input
                    type="url"
                    value={editForm.liveLink}
                    onChange={(e) => setEditForm({ ...editForm, liveLink: e.target.value })}
                    className="input-cyber w-full bg-slate-900 border border-white/5 text-sm p-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-mono block mb-1">GitHub Link</label>
                  <input
                    type="url"
                    value={editForm.githubLink}
                    onChange={(e) => setEditForm({ ...editForm, githubLink: e.target.value })}
                    className="input-cyber w-full bg-slate-900 border border-white/5 text-sm p-2 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-mono block mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="input-cyber w-full bg-slate-900 border border-white/5 text-sm p-2 rounded-lg resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 text-xs font-semibold bg-neon-green text-black rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}