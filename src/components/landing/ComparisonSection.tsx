"use client";

import { Check, X, Minus } from "lucide-react";

const matrix = [
  {
    feature: "Connection-Independent Execution",
    waycode: true,
    cloudIde: false,
    remoteDesktop: false,
  },
  {
    feature: "Mobile Touch Optimized Interface",
    waycode: true,
    cloudIde: false,
    remoteDesktop: false,
  },
  {
    feature: "Persistent 24/7 Cloud Workers",
    waycode: true,
    cloudIde: "partial",
    remoteDesktop: false,
  },
  {
    feature: "Zero Local Compilation on Mobile",
    waycode: true,
    cloudIde: true,
    remoteDesktop: true,
  },
  {
    feature: "Direct Git Commit & Branch Push",
    waycode: true,
    cloudIde: true,
    remoteDesktop: "partial",
  },
  {
    feature: "WhatsApp & Push Completion Alerts",
    waycode: true,
    cloudIde: false,
    remoteDesktop: false,
  },
];

export function ComparisonSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            Architectural Benchmark
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            How WayCode Compares
          </h2>
        </div>

        {/* Table Container */}
        <div className="mt-14 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-4 px-6 text-sm font-extrabold text-slate-900 dark:text-white">Architectural Capability</th>
                <th className="py-4 px-6 text-center text-sm font-black text-primary bg-primary/5 rounded-t-2xl border-x border-t border-primary/20">
                  WayCode Gateway
                </th>
                <th className="py-4 px-6 text-center text-sm font-bold text-slate-500">Traditional Cloud IDE</th>
                <th className="py-4 px-6 text-center text-sm font-bold text-slate-500">Remote Desktop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800 text-sm font-medium">
              {matrix.map((row) => (
                <tr key={row.feature} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition">
                  <td className="py-4 px-6 font-bold text-slate-800 dark:text-slate-200">{row.feature}</td>
                  
                  {/* WayCode Status */}
                  <td className="py-4 px-6 text-center bg-primary/5 border-x border-primary/10">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-white shadow-sm">
                      <Check className="w-4 h-4" />
                    </span>
                  </td>

                  {/* Cloud IDE Status */}
                  <td className="py-4 px-6 text-center">
                    {row.cloudIde === true ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : row.cloudIde === "partial" ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                        <Minus className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800/40">
                        <X className="w-4 h-4" />
                      </span>
                    )}
                  </td>

                  {/* Remote Desktop Status */}
                  <td className="py-4 px-6 text-center">
                    {row.remoteDesktop === true ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : row.remoteDesktop === "partial" ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                        <Minus className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800/40">
                        <X className="w-4 h-4" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
