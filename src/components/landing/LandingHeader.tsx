"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X, ArrowRight, Loader2 } from "lucide-react";
import { signInWithGitHub } from "@/lib/supabase/auth";
import type { User } from "@supabase/supabase-js";

interface LandingHeaderProps {
  user?: User | null;
}

export function LandingHeader({ user }: LandingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3.5 ${
        scrolled
          ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl border-b border-slate-200/60 dark:border-slate-800/80 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center p-2 shadow-lg group-hover:scale-105 transition-transform shrink-0 border border-white/20">
            <Image src="/images/logo.svg" alt="WayCode Logo" width={24} height={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-950 dark:text-white leading-none">
              WayCode
            </span>
            <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase mt-0.5">
              Mobile Gateway
            </span>
          </div>
        </Link>

        {/* Desktop Nav Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-xl p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800/80 shadow-inner">
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
              className="px-4 py-2 rounded-full text-xs font-extrabold text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-white dark:hover:bg-slate-800 transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Button matching reference image button style */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <Link
              href="/chat"
              className="group px-6 py-3 rounded-full bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-md shadow-primary/25 transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.02]"
            >
              <span>Go to Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <button
              onClick={handleGitHubAuth}
              disabled={loading}
              className="group px-6 py-3 rounded-full bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-md shadow-primary/30 border border-white/20 transition-all duration-300 flex items-center gap-2 transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Github className="w-4 h-4 fill-current" />
                  <span>Sign in with GitHub</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-2xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-3 p-5 rounded-3xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-3"
          >
            {[
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
                className="group w-full py-3.5 rounded-full bg-primary text-white font-extrabold text-sm shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
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
  );
}
