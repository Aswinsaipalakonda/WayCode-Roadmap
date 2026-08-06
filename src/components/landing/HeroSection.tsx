"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ArrowRight, Star, Loader2 } from "lucide-react";
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
    <section id="hero" className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-[#F4F8FF] dark:bg-slate-950">
      
      {/* Background Soft Blue Radial Glow (Matching Aivora Reference Image) */}
      <div className="absolute top-0 left-0 w-[600px] sm:w-[900px] h-[550px] bg-gradient-to-br from-blue-300/40 via-blue-200/20 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Trust Social Proof Pill (Matching Aivora top avatar pill) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center">AS</div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center">JD</div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-purple-500 text-white font-bold text-[10px] flex items-center justify-center">RK</div>
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                22K+ Trusted Users
              </span>
              <span className="text-amber-400 flex items-center text-xs font-bold gap-0.5">
                <Star className="w-3.5 h-3.5 fill-current" /> 5.0
              </span>
            </motion.div>

            {/* Solid Color Headline (Matching Aivora Reference Image Headline) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05]"
            >
              Future-Ready Chat <br />
              for Better Customer <br />
              Experiences
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Empower your engineering workflow with AI-driven chat solutions designed to deliver fast, accurate, and autonomous repository commits across every mobile touchpoint.
            </motion.p>

            {/* Action Buttons (Matching User's First Uploaded Image Button Style) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Primary Royal Blue Pill Button matching First Image */}
              <button
                onClick={handleGitHubAuth}
                disabled={loading}
                className="group w-full sm:w-auto h-13 px-8 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-extrabold text-base shadow-xl shadow-blue-500/25 border border-white/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
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

              {/* Secondary White Pill Button */}
              <a
                href="#architecture"
                className="group w-full sm:w-auto h-13 px-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 shadow-sm flex items-center justify-center gap-2 transform hover:scale-[1.02]"
              >
                <span>Learn more about us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

          </div>

          {/* Right Column Single Integrated Hero Image Mockup (Matching Aivora Image Layout) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[500px] hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/images/aivora-hero-mockup.png"
                alt="WayCode AI Gateway Hero Showcase"
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
  );
}
