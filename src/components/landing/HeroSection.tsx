"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Loader2 } from "lucide-react";
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
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      {/* Background Radial Glow Accent */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-primary/15 via-blue-400/20 to-purple-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 text-primary dark:text-blue-400 text-xs sm:text-sm font-bold shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Future-Ready Asynchronous Mobile Gateway</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.05]"
            >
              Build from <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                anywhere.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              An asynchronous mobile gateway that converts developer intent into production repository-level code commits using persistent cloud AI agents.
            </motion.p>

            {/* CTA Button Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={handleGitHubAuth}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-primary/30 transition-all transform hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Github className="w-5 h-5 fill-current" />
                    <span>Sign in with GitHub</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <a
                href="#architecture"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm flex items-center justify-center gap-2"
              >
                <span>Explore Architecture</span>
                <span className="text-base">↓</span>
              </a>
            </motion.div>

            {/* Micro Feature Badges */}
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
                <Zap className="w-4 h-4 text-primary" />
                <span>Redis Queue Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-500" />
                <span>Docker Sandbox</span>
              </div>
            </motion.div>
          </div>

          {/* Right Mobile Phone Showcase Column (High-End Product Mockup Render) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative group"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] hover:scale-[1.02] transition-transform duration-500">
              {/* Soft Ambient Shadow Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-indigo-500/20 blur-3xl rounded-full transform scale-90 group-hover:scale-105 transition-transform" />

              {/* Clean Image Render */}
              <div className="relative rounded-[40px] overflow-hidden border-4 border-white/60 dark:border-slate-800/80 shadow-[0_30px_90px_rgba(0,115,230,0.22)]">
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
