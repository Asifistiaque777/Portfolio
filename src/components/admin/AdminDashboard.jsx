// src/components/admin/AdminDashboard.jsx
"use client";
import { useState } from "react";
import { LayoutDashboard, FolderPlus, Award } from "lucide-react";
import AddProjectForm from "./AddProjectForm";
import AddCertificateForm from "./AddCertificateForm";

const tabs = [
  { id: "project", label: "Add Project", icon: FolderPlus },
  { id: "certificate", label: "Add Certificate", icon: Award },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("project");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neon-green/10 text-neon-green">
          <LayoutDashboard size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Admin Dashboard</h3>
          <p className="text-xs text-slate-400">Manage portfolio content in real time</p>
        </div>
      </div>

      <div className="flex w-fit gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 ${
              activeTab === id
                ? "bg-neon-green text-bg shadow-glow-green-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "project" ? <AddProjectForm /> : <AddCertificateForm />}
      </div>
    </div>
  );
}
