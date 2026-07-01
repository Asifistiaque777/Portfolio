// src/components/sections/Footer.jsx
"use client";
import { useState } from "react";
import { ShieldCheck, TerminalSquare } from "lucide-react";
import AdminGateway from "@/components/admin/AdminGateway";

export default function Footer() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <footer className="relative border-t border-white/5 px-6 py-12 sm:px-10 lg:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <a href="#home" className="flex items-center gap-2">
          <TerminalSquare className="text-neon-green" size={20} />
          <span className="font-mono text-sm font-semibold tracking-wider text-white">
            ASIF<span className="text-neon-green">.</span>DEV
          </span>
        </a>

        <p className="max-w-md text-sm text-slate-500">
          Designed &amp; engineered by Asif Istiaque. Built with Next.js, Tailwind CSS,
          Framer Motion &amp; Firebase.
        </p>

        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} Asif Istiaque. All rights reserved.
        </p>

        {/* Hidden Admin Gateway — intentionally subtle */}
        <button
          onClick={() => setAdminOpen(true)}
          aria-label="Admin access"
          title="Admin"
          className="mt-2 flex items-center gap-1 rounded-full px-2 py-1 text-[10px] text-slate-700 opacity-40 transition-all duration-300 hover:text-neon-green hover:opacity-100"
        >
          <ShieldCheck size={11} />
          <span className="font-mono">admin</span>
        </button>
      </div>

      <AdminGateway isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </footer>
  );
}
