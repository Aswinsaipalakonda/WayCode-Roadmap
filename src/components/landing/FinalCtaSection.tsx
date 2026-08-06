"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ArrowRight, Loader2 } from "lucide-react";
import { signInWithGitHub } from "@/lib/supabase/auth";

export function FinalCtaSection() {
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto rounded-[40px] bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white p-8 sm:p-16 relative overflow-hidden shadow-2xl">
        
        {/* Glow & Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-black/40 border border-white/20 p-2 flex items-center justify-center">
                <Image src="/images/logo.svg" alt="WayCode Logo" width={24} height={24} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">WayCode</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Start Building From Your Phone Today.
            </h2>
            <p className="text-base sm:text-lg text-blue-100 font-medium max-w-xl">
              Join thousands of developers shipping code asynchronously with persistent AI agents.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <button
              onClick={handleGitHubAuth}
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-base shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Github className="w-5 h-5 fill-current" />
                  <span>Sign in with GitHub</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
