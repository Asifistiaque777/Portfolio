// src/components/admin/ManageItems.jsx
"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2, Loader2, ExternalLink, X, GripVertical } from "lucide-react";
import { Reorder } from "framer-motion"; // 🆕 ড্র্যাগ রি-অর্ডারের জন্য ইম্পোর্ট করা হয়েছে
import { 
  getProjects, 
  deleteProject, 
  updateProject, 
  getCertificates, 
  deleteCertificate, 
  updateCertificate,
  updateItemsOrder // 🆕 ফায়ারবেসে অর্ডার ব্যাচ সেভ করার ফাংশন
} from "@/lib/firestoreActions";
import Modal from "@/components/ui/Modal"; 

export default function ManageItems({ type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // এডিট স্টেটের জন্য ভ্যারিয়েবল
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

  // 🆕 ড্র্যাগ করে ছেড়ে দিলে এই ফাংশনটি রান হবে এবং ডাটাবেজ আপডেট করবে
  const handleReorder = async (newOrder) => {
    setItems(newOrder); // UI-তে ইনস্ট্যান্ট মাখনের মতো রি-অর্ডার হবে
    try {
      const collectionName = type === "project" ? "projects" : "certificates";
      await updateItemsOrder(collectionName, newOrder); // ফায়ারবেসে ব্যাচ আপডেট পুশ হবে
    } catch (err) {
      console.error("Failed to update layout order:", err);
      toast.error("Failed to save layout order.");
    }
  };

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

  // এডিট বাটন চাপলে ফর্ম পপুলেট করার ফাংশน
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
      setEditingItem(null); 
      fetchDocs(); 
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
      <div className="w-full rounded-xl border border-white/5 bg-[#171412]/20 overflow-hidden">
        
        {/* কাস্টম টেবিল হেডার */}
        <div className="grid grid-cols-12 bg-white/[0.02] text-xs uppercase text-slate-300 font-mono p-4 font-bold border-b border-white/5">
          <div className="col-span-7 sm:col-span-6 flex items-center pl-7">Title</div>
          <div className="col-span-5 hidden sm:block">Tags / Info</div>
          <div className="col-span-5 sm:col-span-1 text-right">Actions</div>
        </div>

        {/* 🚀 🆕 FRAMER MOTION REORDER LIST INTERFACE */}
        <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="divide-y divide-white/5 w-full">
          {items.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              className="grid grid-cols-12 p-4 items-center bg-[#171412]/40 hover:bg-white/[0.02] transition-colors cursor-grab active:cursor-grabbing relative select-none group"
            >
              {/* ড্র্যাগ করার হ্যান্ডেল আইকন */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-hover:text-neon-green transition-colors">
                <GripVertical size={16} />
              </div>

              {/* টাইটেল এবং লাইভ লিংক */}
              <div className="col-span-7 sm:col-span-6 flex flex-col pl-7 min-w-0">
                <span className="font-medium text-white truncate">{item.title}</span>
                {item.liveLink && (
                  <a href={item.liveLink} target="_blank" rel="noreferrer" className="text-xs text-neon-green inline-flex items-center gap-0.5 mt-0.5 hover:underline pointer-events-auto">
                    Live <ExternalLink size={10} />
                  </a>
                )}
              </div>

              {/* ট্যাগ বা ইস্যুআর ইনফো */}
              <div className="col-span-5 hidden sm:flex flex-wrap gap-1 min-w-0">
                {type === "project" ? (
                  item.tags?.map((t) => (
                    <span key={t} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-300 truncate">{t}</span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 truncate">{item.issuer}</span>
                )}
              </div>

              {/* অ্যাকশন বাটনসমূহ */}
              <div className="col-span-5 sm:col-span-1 text-right">
                <div className="flex justify-end gap-1">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEditClick(item); }}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                  >
                    <Pencil size={14} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
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
                <label className="text-xs text-slate-400 font-mono block mb-1">
                  {type === "project" ? "Tags (comma separated)" : "Issuer / Institution"}
                </label>
                <input
                  type="text"
                  value={editForm.tags}
                  onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                  className="input-cyber w-full bg-slate-900 border border-white/5 text-sm p-2 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-mono block mb-1">Live Link / Credential</label>
                  <input
                    type="url"
                    value={editForm.liveLink}
                    onChange={(e) => setEditForm({ ...editForm, liveLink: e.target.value })}
                    className="input-cyber w-full bg-slate-900 border border-white/5 text-sm p-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-mono block mb-1">GitHub Link / Image URL</label>
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