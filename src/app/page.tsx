"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Github, ArrowRight, Loader2 } from "lucide-react";
import { signInWithGitHub } from "@/lib/supabase/auth";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

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
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Soft Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* Brand Logo */}
        <div className="w-16 h-16 rounded-2xl bg-black border border-white/20 p-3 mx-auto flex items-center justify-center shadow-xl">
          <Image src="/images/logo.png" alt="WayCode Logo" width={40} height={40} priority />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          WayCode Gateway
        </h1>

        <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed">
          Clean frontend scaffold ready for shadcn section installation. Paste your section command to build out each page block.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {user ? (
            <Button asChild size="lg" className="rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-extrabold px-8">
              <Link href="/chat">
                <span>Open Chat Workspace</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button
              onClick={handleGitHubAuth}
              disabled={loading}
              size="lg"
              className="rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-extrabold px-8 shadow-lg shadow-blue-500/25 border border-white/20"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Github className="w-5 h-5 mr-2 fill-current" />
                  <span>Sign in with GitHub</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
