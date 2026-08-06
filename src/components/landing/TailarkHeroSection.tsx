"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowRight, Menu, X, Loader2, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { signInWithGitHub } from "@/lib/supabase/auth";
import type { User } from "@supabase/supabase-js";

interface TailarkHeroProps {
  user?: User | null;
}

export function TailarkHeroSection({ user }: TailarkHeroProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGitHubAuth = async () => {
    try {
      setLoading(true);
      await signInWithGitHub();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div id="hero" className="relative overflow-hidden bg-[#F4F8FF] dark:bg-slate-950 min-h-screen flex flex-col justify-between">
      
      {/* Ambient Radial Gradient Background (Tailark Hero-16 Lighting) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[600px] bg-gradient-to-b from-blue-300/30 via-blue-200/15 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-300/20 blur-[130px] rounded-full pointer-events-none" />

      {/* 1. Tailark Integrated Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-12 py-4 ${
          scrolled
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/80 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center p-2 shadow-md group-hover:scale-105 transition-transform shrink-0 border border-white/20">
              <Image src="/images/logo.png" alt="WayCode Logo" width={24} height={24} priority />
            </div>
            <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">
              WayCode
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", href: "#hero" },
              { label: "Features", href: "#features" },
              { label: "Architecture", href: "#architecture" },
              { label: "Workflow", href: "#workflow" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0066FF] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button (Royal Blue #0066FF Pill Button) */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <Link
                href="/chat"
                className="group px-6 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all duration-200 flex items-center gap-2 transform hover:scale-[1.02]"
              >
                <span>Go to Workspace</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <button
                onClick={handleGitHubAuth}
                disabled={loading}
                className="group px-6 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-extrabold text-sm shadow-md shadow-blue-500/25 border border-white/20 transition-all duration-200 flex items-center gap-2.5 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Github className="w-4 h-4 fill-current" />
                    <span>Sign in with GitHub</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-3"
            >
              {[
                { label: "Home", href: "#hero" },
                { label: "Features", href: "#features" },
                { label: "Architecture", href: "#architecture" },
                { label: "Workflow", href: "#workflow" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-4 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleGitHubAuth}
                  disabled={loading}
                  className="group w-full py-3.5 rounded-full bg-[#0066FF] text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Github className="w-5 h-5 fill-current" />
                      <span>Sign in with GitHub</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* 2. Tailark Hero-16 Hero Section Body */}
      <section className="relative pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#0066FF]" />
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  Future-Ready Asynchronous Gateway
                </span>
              </motion.div>

              {/* Display Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]"
              >
                Build from <br />
                anywhere with <br />
                <span className="text-[#0066FF]">Autonomous AI.</span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Decouple mobile intent generation from cloud AI execution. Prompt, monitor, approve, and commit code directly to GitHub from your phone.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <button
                  onClick={handleGitHubAuth}
                  disabled={loading}
                  className="group w-full sm:w-auto h-14 px-8 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-extrabold text-base shadow-xl shadow-blue-500/25 border border-white/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Github className="w-5 h-5 fill-current" />
                      <span>Sign in with GitHub</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    </>
                  )}
                </button>

                <a
                  href="#architecture"
                  className="group w-full sm:w-auto h-14 px-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                >
                  <span>Learn Architecture</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Connection Independent</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#0066FF]" />
                  <span>Redis Queue Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-500" />
                  <span>Docker Sandbox</span>
                </div>
              </motion.div>

            </div>

            {/* Right Column Mockup Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 flex items-center justify-center relative"
            >
              <div className="relative w-full max-w-[520px] hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/images/aivora-hero-mockup.png"
                  alt="WayCode Tailark Hero Gateway Mockup"
                  width={700}
                  height={900}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
