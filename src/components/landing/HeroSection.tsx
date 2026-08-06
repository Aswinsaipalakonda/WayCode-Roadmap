"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ArrowRight, Star, Loader2, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { signInWithGitHub } from "@/lib/supabase/auth";

export function HeroSection() {
  const [loading, setLoading] = useState(false);

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
    <section id="hero" className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/90 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      
      {/* Background Soft Ambient Light Spheres (Matching Aivora Aesthetic) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[550px] bg-gradient-to-tr from-blue-400/25 via-primary/20 to-purple-400/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-300/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Social Proof Pill (Matching Aivora top avatar pill) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-md backdrop-blur-md"
            >
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center">AS</div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center">JD</div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-purple-500 text-white font-bold text-[10px] flex items-center justify-center">RK</div>
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                1,000+ Active Gateway Runs
              </span>
              <span className="text-amber-400 flex items-center text-xs font-bold gap-0.5">
                <Star className="w-3.5 h-3.5 fill-current" /> 5.0
              </span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.06]"
            >
              Future-Ready Chat <br className="hidden sm:inline" />
              for <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">Autonomous AI Engineering</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Decouple mobile intent generation from cloud AI execution. Prompt, monitor, approve, and push code directly to GitHub from your phone.
            </motion.p>

            {/* Action Buttons (Matching Second Image Pill Style with Arrow Slide) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Primary Pill Button matching Second Image Pill Style */}
              <button
                onClick={handleGitHubAuth}
                disabled={loading}
                className="group w-full sm:w-auto h-14 px-8 rounded-full bg-primary hover:bg-primary/95 text-white font-extrabold text-base shadow-xl shadow-primary/30 border border-white/20 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
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

              {/* Secondary Pill Button */}
              <a
                href="#architecture"
                className="group w-full sm:w-auto h-14 px-8 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 transform hover:scale-[1.02]"
              >
                <span>Learn Architecture</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Micro Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Async Execution Queue</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Gemini 2.5 Pro Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-500" />
                <span>Isolated Docker Sandbox</span>
              </div>
            </motion.div>
          </div>

          {/* Right Mobile Phone Showcase Column with Floating Parallax Context Cards (Matching Aivora Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative group"
          >
            {/* Floating Glassmorphic Context Card 1: Context.py (Top Right) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 sm:-right-8 z-30 p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-white/60 dark:border-slate-800/80 shadow-2xl backdrop-blur-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-primary font-mono font-bold text-xs flex items-center justify-center border border-blue-500/20">
                🐍
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">Context.py</div>
                <div className="text-[10px] text-slate-500 font-mono">AST Parsed • 9.33KB</div>
              </div>
            </motion.div>

            {/* Floating Glassmorphic Context Card 2: Notion / Connection Pill (Middle Left) */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -left-6 sm:-left-12 -translate-y-1/2 z-30 p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-white/60 dark:border-slate-800/80 shadow-2xl backdrop-blur-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 font-extrabold text-xs flex items-center justify-center border border-emerald-500/20">
                ✓
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">Supabase DB</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Connected • RLS Active</div>
              </div>
            </motion.div>

            {/* Phone Render Shell */}
            <div className="relative w-full max-w-[340px] sm:max-w-[390px] hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-indigo-500/20 blur-3xl rounded-full transform scale-90 group-hover:scale-105 transition-transform" />

              <div className="relative rounded-[42px] overflow-hidden border-4 border-white/80 dark:border-slate-800/80 shadow-[0_30px_90px_rgba(0,115,230,0.25)]">
                <Image
                  src="/images/hero-phone-mockup.png"
                  alt="WayCode Mobile Gateway Preview"
                  width={600}
                  height={1000}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
