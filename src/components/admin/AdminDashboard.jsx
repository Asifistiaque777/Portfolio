// src/components/admin/AdminDashboard.jsx
"use client";
import { useState } from "react";
import { LayoutDashboard, FolderPlus, Award, Settings, ShieldAlert } from "lucide-react";
import AddProjectForm from "./AddProjectForm";
import AddCertificateForm from "./AddCertificateForm";
import ManageItems from "./ManageItems"; // নতুন ফাইলটি ইমপোর্ট করলাম

const tabs = [
  { id: "add-project", label: "Add Project", icon: FolderPlus },
  { id: "manage-projects", label: "Manage Projects", icon: Settings },
  { id: "add-certificate", label: "Add Certificate", icon: Award },
  { id: "manage-certificates", label: "Manage Certificates", icon: ShieldAlert },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("add-project");

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neon-green/10 text-neon-green">
          <LayoutDashboard size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Admin Control Panel</h3>
          <p className="text-xs text-slate-400">Manage, edit, and audit your portfolio assets in real time</p>
        </div>
      </div>

      {/* রেসপন্সিভ ট্যাব বার */}
      <div className="flex flex-wrap gap-2 rounded-xl sm:rounded-full border border-white/10 bg-white/[0.02] p-1.5 w-full sm:w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 w-full sm:w-auto ${
              activeTab === id
                ? "bg-neon-green text-black font-semibold shadow-md"
                : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* কন্ডিশনাল কন্টেন্ট রেন্ডারিং */}
      <div className="mt-4 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-sm">
        {activeTab === "add-project" && <AddProjectForm />}
        {activeTab === "add-certificate" && <AddCertificateForm />}
        {activeTab === "manage-projects" && <ManageItems type="project" />}
        {activeTab === "manage-certificates" && <ManageItems type="certificate" />}
      </div>
    </div>
  );
}