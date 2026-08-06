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
      <div className="max-w-6xl mx-auto rounded-[40px] bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        
        {/* Glow & Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
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

            <div className="pt-4">
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

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[260px] sm:max-w-[280px] rounded-[32px] overflow-hidden border-4 border-white/40 shadow-2xl">
              <Image
                src="/images/cta-phone-mockup.png"
                alt="WayCode Mobile Live Deployment Alert"
                width={400}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
