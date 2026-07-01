// src/components/admin/AdminGateway.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { KeyRound, Lock, ShieldCheck } from "lucide-react";
import Modal from "@/components/ui/Modal";
import AdminDashboard from "./AdminDashboard";

export default function AdminGateway({ isOpen, onClose }) {
  const [passkey, setPasskey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const ADMIN_PASSKEY = process.env.NEXT_PUBLIC_ADMIN_PASSKEY;

  const handleVerify = (e) => {
    e.preventDefault();
    if (passkey === ADMIN_PASSKEY) {
      setAuthenticated(true);
      setError("");
      toast.success("Access granted. Welcome back, Asif.");
    } else {
      setError("Invalid passkey. Access denied.");
      toast.error("Invalid passkey.");
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after the close animation finishes
    setTimeout(() => {
      setPasskey("");
      setAuthenticated(false);
      setError("");
    }, 300);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth={authenticated ? "max-w-4xl" : "max-w-sm"}
    >
      {!authenticated ? (
        <form onSubmit={handleVerify} className="flex flex-col items-center gap-5 py-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neon-green/10 text-neon-green shadow-glow-green-sm">
            <Lock size={26} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Restricted Area</h3>
            <p className="mt-1 text-sm text-slate-400">
              Enter the admin passkey to manage portfolio content.
            </p>
          </div>

          <div className="w-full">
            <div className="relative">
              <KeyRound
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter passkey"
                autoFocus
                className="input-cyber pl-11 text-center tracking-widest"
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-neon-orange"
              >
                {error}
              </motion.p>
            )}
          </div>

          <button type="submit" className="btn-primary w-full">
            <ShieldCheck size={16} /> Verify Access
          </button>
        </form>
      ) : (
        <AdminDashboard />
      )}
    </Modal>
  );
}
