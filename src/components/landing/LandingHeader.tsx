"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-4 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200/60 dark:border-slate-800/80 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center p-2 shadow-md group-hover:scale-105 transition-transform shrink-0">
            <Image src="/images/logo.svg" alt="WayCode Logo" width={24} height={24} />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-950 dark:text-white">
            WayCode
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-full border border-slate-200/60 dark:border-slate-800">
          <a
            href="#features"
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-white dark:hover:bg-slate-800 transition"
          >
            Features
          </a>
          <a
            href="#architecture"
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-white dark:hover:bg-slate-800 transition"
          >
            Architecture
          </a>
          <a
            href="#workflow"
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-white dark:hover:bg-slate-800 transition"
          >
            Workflow
          </a>
          <a
            href="#pricing"
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-white dark:hover:bg-slate-800 transition"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-white dark:hover:bg-slate-800 transition"
          >
            FAQ
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <Link
              href="/chat"
              className="px-5 py-2.5 rounded-full bg-primary text-white font-bold text-xs hover:bg-primary/90 shadow-md shadow-primary/20 transition flex items-center gap-1.5"
            >
              <span>Go to Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              onClick={handleGitHubAuth}
              disabled={loading}
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all transform hover:scale-105 flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Github className="w-4 h-4 fill-current" />
                  <span>Sign in with GitHub</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-5 rounded-3xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-4 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          >
            Features
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-4 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          >
            Architecture
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-4 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          >
            Workflow
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-4 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-4 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          >
            FAQ
          </a>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleGitHubAuth}
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Github className="w-5 h-5 fill-current" />
                  <span>Sign in with GitHub</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
