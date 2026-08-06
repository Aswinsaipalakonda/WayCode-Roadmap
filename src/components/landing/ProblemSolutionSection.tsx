"use client";

import { motion } from "framer-motion";
import { Check, X, AlertTriangle } from "lucide-react";

export function ProblemSolutionSection() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            The Research Gap
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            The Resource Interface Duality
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
            The best device for interacting with an AI agent is not necessarily the best device for executing its work.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          
          {/* Card 1: Interface Plane */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">Plane 01</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                Mobile Device
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white">Interface Plane</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Intent Generation</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Excellent
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Approvals & Review</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Excellent
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Monitoring & Logs</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Excellent
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Heavy IDE Workloads</span>
                <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
                  <X className="w-4 h-4" /> Limited
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Execution Plane */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400">Plane 02</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50">
                Cloud Runtime
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white">Execution Plane</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-sm font-semibold text-slate-300">Repository Operations</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Excellent
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-sm font-semibold text-slate-300">AI Agent Workflows</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Excellent
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-sm font-semibold text-slate-300">Build & Unit Testing</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Excellent
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-sm font-semibold text-slate-300">Direct Human Interaction</span>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> Indirect
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Proposed Principle Callout */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-blue-50 dark:bg-slate-900/60 border border-blue-200/80 dark:border-blue-800/60">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Proposed Architectural Principle</span>
          <h4 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white mt-2">
            Separate <span className="text-primary">intent</span> from <span className="text-accent">execution.</span>
          </h4>
        </div>

      </div>
    </section>
  );
}
