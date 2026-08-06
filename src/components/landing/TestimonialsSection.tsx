"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    name: "Alex Rivera",
    role: "Senior Full Stack Engineer",
    company: "Vercel Ecosystem",
    content: "WayCode completely changed how I ship code while traveling. I prompt an issue resolution from my iPhone during a commute, and by the time I arrive, the branch is pushed and preview link is live.",
    stars: 5,
  },
  {
    name: "Sarah Chen",
    role: "Indie Hacker & Founder",
    company: "SaaS Studio",
    content: "The asynchronous execution model is pure genius. Closing my phone browser doesn't interrupt the AI agent work. The WhatsApp alerts are super convenient.",
    stars: 5,
  },
  {
    name: "Marcus Vance",
    role: "Tech Lead",
    company: "DevOps Core",
    content: "The Docker sandbox isolation and automatic build verification gave our team the confidence to let AI agents run commits without risking our main branch.",
    stars: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            Developer Reviews
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Loved by Developers & Engineers
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed italic">
                  “{rev.content}”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <div className="font-bold text-sm text-slate-950 dark:text-white">{rev.name}</div>
                <div className="text-xs text-slate-500 font-medium">{rev.role} • {rev.company}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
