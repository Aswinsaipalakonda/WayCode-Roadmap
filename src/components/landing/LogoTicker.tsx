"use client";

import Image from "next/image";

const stackLogos = [
  { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Supabase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "Vercel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
];

export function LogoTicker() {
  return (
    <section className="py-10 bg-white dark:bg-slate-950 border-y border-slate-200/60 dark:border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
          Powering Autonomous Workflows Across Modern Stacks
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
          {stackLogos.map((item) => (
            <div key={item.name} className="flex items-center gap-2.5 group cursor-pointer">
              <Image
                src={item.url}
                alt={item.name}
                width={28}
                height={28}
                className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
              />
              <span className="font-extrabold text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
