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
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-12 py-4 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/80 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo with PNG asset */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center p-1.5 shadow-md group-hover:scale-105 transition-transform shrink-0 border border-white/20">
            <Image src="/images/logo.png" alt="WayCode Logo" width={22} height={22} priority />
          </div>
          <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">
            WayCode
          </span>
        </Link>

        {/* Clean Plain Menu Links without highlighting (Matching Aivora Reference Image) */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Home", href: "#hero" },
            { label: "Features", href: "#features" },
            { label: "About us", href: "#architecture" },
            { label: "Pricing", href: "#pricing" },
            { label: "Blog", href: "#workflow" },
            { label: "Pages", href: "#faq" },
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

        {/* Right Action Button (Royal Blue Pill Button with GitHub Icon + Arrow) */}
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

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
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
            className="md:hidden mt-3 p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-3"
          >
            {[
              { label: "Home", href: "#hero" },
              { label: "Features", href: "#features" },
              { label: "About us", href: "#architecture" },
              { label: "Pricing", href: "#pricing" },
              { label: "Blog", href: "#workflow" },
              { label: "Pages", href: "#faq" },
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
  );
}
