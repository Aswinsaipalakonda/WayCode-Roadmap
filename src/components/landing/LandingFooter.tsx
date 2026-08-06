"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Disc as Discord } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col (Span 2) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-black border border-white/20 p-2 flex items-center justify-center">
                <Image src="/images/logo.svg" alt="WayCode Logo" width={20} height={20} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">WayCode</span>
            </div>
            <p className="text-xs text-slate-400 font-medium max-w-sm leading-relaxed">
              An Asynchronous Mobile Gateway for Autonomous Software Engineering Agents. Decoupling mobile intent from cloud execution.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com/Aswinsaipalakonda/WayCode-Roadmap" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition">
                <Discord className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Product</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#architecture" className="hover:text-white transition">Architecture</a></li>
              <li><a href="#workflow" className="hover:text-white transition">Workflow</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Resources</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><Link href="/prd.md" className="hover:text-white transition">PRD Document</Link></li>
              <li><a href="https://github.com/Aswinsaipalakonda/WayCode-Roadmap" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub Repo</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Legal</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Security Model</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} WayCode by Aswin Sai Palakonda. All rights reserved.</p>
          <p className="font-mono text-[11px]">Powered by Next.js 15 • Supabase • Gemini 2.5 Pro</p>
        </div>

      </div>
    </footer>
  );
}
