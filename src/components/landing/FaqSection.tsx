"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does WayCode allow my phone browser to disconnect?",
    a: "When you submit an intent prompt, the request is validated and immediately written to a persistent Redis task queue. The server returns a unique task ID, allowing your browser session to safely close while background cloud workers process the job.",
  },
  {
    q: "Is my GitHub repository safe when executing AI agents?",
    a: "Yes. All agent code generation runs inside isolated, ephemeral Docker containers. WayCode creates dedicated feature branches (e.g. agent/task-XXXX) without mutating your main branch directly.",
  },
  {
    q: "How do I receive completion notifications on my phone?",
    a: "WayCode dispatches instant notifications via Web Push API as well as WhatsApp Cloud API messages containing task status, summary diffs (+N −M lines), and live Vercel preview deployment URLs.",
  },
  {
    q: "Which AI models power the WayCode execution plane?",
    a: "By default, WayCode uses Gemini 2.5 Pro for repository reasoning, AST parsing, and code generation. You can also select Claude 3.5 Sonnet in your settings.",
  },
  {
    q: "Do I need a persistent desktop IDE running?",
    a: "No. That is the core innovation of WayCode — zero local compilation or local desktop IDE setup is needed. You prompt and review from your mobile phone while cloud workers execute everything.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="mt-14 space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-slate-950 dark:text-white"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-200/50 dark:border-slate-800 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
