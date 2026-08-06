"use client";

import { motion } from "framer-motion";
import { Cpu, GitBranch, Smartphone, Zap } from "lucide-react";

export function BentoGridSection() {
  return (
    <section id="architecture" className="py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            Proposed Solution
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            One gateway. Four core responsibilities.
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Asynchronous Execution (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-primary flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">Core Capability</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mt-2">
                Asynchronous Execution Engine
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-3 leading-relaxed">
                Requests become persistent Redis jobs. The mobile browser does not need to remain connected while an AI agent works autonomously on the cloud host.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-bold">
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <span>01 REQUEST</span>
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <span>02 QUEUE</span>
                <span className="w-2 h-2 rounded-full bg-teal-500" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <span>03 EXECUTE</span>
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <span>04 REPORT</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Persistent AI Runtime (Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-5 p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  24/7 ONLINE
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mt-6">
                Persistent AI Runtime
              </h3>
              <p className="text-sm text-slate-400 font-medium mt-3 leading-relaxed">
                The cloud executor remains available 24/7 independently of the developer workstation or smartphone connection.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-baseline justify-between">
              <div className="text-5xl font-black font-mono text-white">
                24<span className="text-2xl text-primary font-bold">/7</span>
              </div>
              <div className="text-right text-xs font-mono text-slate-400">
                <div>PM2 Process Manager</div>
                <div className="text-emerald-400 font-bold mt-0.5">Uptime 99.9%</div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Repository Native (Span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-6 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:border-primary/40 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-accent flex items-center justify-center mb-6">
              <GitBranch className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">Repository Native</span>
            <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white mt-2">
              Work Directly With Git
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-2">
              Native version control workflow without exposing local uncommitted state.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-mono text-xs font-bold border border-blue-200 dark:border-blue-800">
                Git Clone
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">
                Checkout Branch
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">
                LLM Edit
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">
                Local Build
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-mono text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                Git Push
              </span>
            </div>
          </motion.div>

          {/* Card 4: Mobile First Control Plane (Span 6) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-6 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:border-primary/40 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-warning flex items-center justify-center mb-6">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-warning">Mobile First</span>
            <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white mt-2">
              Control Plane, Zero Editing
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-2">
              High-level intent inputs optimized for touch viewports.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2 text-xs font-bold">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <span>Intent Prompting</span>
                <span className="text-primary font-bold">✓</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <span>GitHub OAuth</span>
                <span className="text-primary font-bold">✓</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <span>Live Logs Stream</span>
                <span className="text-primary font-bold">✓</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <span>WhatsApp Alerts</span>
                <span className="text-emerald-500 font-bold">✓</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
