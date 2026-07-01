// src/app/page.js
import CyberBackground from "@/components/ui/CyberBackground";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <CyberBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <section id="education" className="sr-only" aria-hidden="true" />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  );
}
