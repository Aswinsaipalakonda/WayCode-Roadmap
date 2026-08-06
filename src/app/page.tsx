import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, GitBranch, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white flex flex-col justify-between relative overflow-hidden px-4 py-8">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="relative z-10 flex items-center justify-between max-w-md mx-auto w-full pt-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-black/60 border border-white/10 p-2 flex items-center justify-center shadow-lg">
            <Image src="/images/logo.svg" alt="WayCode Logo" width={28} height={28} priority />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">WayCode</span>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 border border-white/10 text-primary-light font-medium">
          v1.0.0
        </span>
      </header>

      {/* Hero Welcome Container */}
      <section className="relative z-10 max-w-md mx-auto w-full text-center my-auto py-8 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary-light text-xs font-semibold mb-6 animate-pulse">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span>Asynchronous Mobile Gateway</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] text-white">
          Build from <br />
          <span className="bg-gradient-to-r from-primary via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            anywhere.
          </span>
        </h1>

        <p className="text-slate-400 text-base mt-4 max-w-xs mx-auto leading-relaxed">
          Decouple mobile intent generation from cloud AI agent execution. Prompt, monitor, and deploy code from your phone.
        </p>

        {/* Action Button */}
        <div className="mt-8 w-full max-w-xs space-y-3">
          <Link
            href="/chat"
            className="w-full h-13 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-lg shadow-primary/30 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 px-6 py-3.5"
          >
            <span>Open Mobile Gateway</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-3 gap-2 mt-10 w-full text-left">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <Cpu className="w-4 h-4 text-primary mb-1.5" />
            <div className="text-xs font-bold text-white">24/7 Agent</div>
            <div className="text-[10px] text-slate-400 leading-tight">Persistent Cloud</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <GitBranch className="w-4 h-4 text-emerald-400 mb-1.5" />
            <div className="text-xs font-bold text-white">Git Native</div>
            <div className="text-[10px] text-slate-400 leading-tight">Auto Commits</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-purple-400 mb-1.5" />
            <div className="text-xs font-bold text-white">Isolated</div>
            <div className="text-[10px] text-slate-400 leading-tight">Docker Sandbox</div>
          </div>
        </div>
      </section>

      {/* Trust Signals Footer */}
      <footer className="relative z-10 max-w-md mx-auto w-full text-center pb-4">
        <p className="text-xs font-medium text-slate-500 flex items-center justify-center gap-2">
          <span>Secure</span> • <span>Private</span> • <span>Developer First</span>
        </p>
      </footer>
    </main>
  );
}
