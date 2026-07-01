// src/components/sections/Navbar.jsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, TerminalSquare } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-xl border-b border-white/5 py-3" : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-24">
        <a href="#home" className="flex items-center gap-2 group">
          <TerminalSquare className="text-neon-green transition-transform group-hover:rotate-6" size={22} />
          <span className="font-mono text-sm sm:text-base font-semibold tracking-wider text-white">
            ASIF<span className="text-neon-green">.</span>DEV
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-slate-300 transition-colors hover:text-neon-green after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-neon-green after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden md:inline-flex btn-primary !py-2 !px-5 text-xs">
          Hire Me
        </a>

        <button
          className="md:hidden text-slate-200"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mx-6 mt-4 glass-card flex flex-col gap-1 p-4"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-neon-green"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
