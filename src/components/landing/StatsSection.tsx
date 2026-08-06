"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "1,000+", label: "Tasks Executed", sub: "Autonomous Agent Commits" },
  { value: "99.9%", label: "Worker Uptime", sub: "PM2 Process Manager" },
  { value: "100%", label: "Async Queue", sub: "Redis Task Persistence" },
  { value: "0%", label: "Desktop Dependency", sub: "Build From Smartphone" },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="pt-6 md:pt-0 px-4 space-y-1"
            >
              <div className="text-3xl sm:text-5xl font-black text-primary-light tracking-tight font-mono">
                {item.value}
              </div>
              <div className="text-sm font-extrabold text-white">{item.label}</div>
              <div className="text-xs text-slate-400 font-medium">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
