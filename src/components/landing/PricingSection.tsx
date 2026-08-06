"use client";

import { useState } from "react";
import { Check, Github, ArrowRight, Loader2 } from "lucide-react";
import { signInWithGitHub } from "@/lib/supabase/auth";

const plans = [
  {
    name: "Free Developer",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring autonomous mobile gateway development.",
    features: [
      "50 task runs / month",
      "Connect 3 GitHub Repositories",
      "Standard LLM Agent (Gemini 2.5)",
      "Standard Redis Queue Execution",
      "Web Push Notifications",
      "Community Discord Support",
    ],
    popular: false,
    buttonText: "Sign in with GitHub",
  },
  {
    name: "Pro Engineer",
    price: "$29",
    period: "per month",
    description: "For solo developers shipping production features from anywhere.",
    features: [
      "Unlimited Task Runs",
      "Unlimited GitHub Repositories",
      "High Priority AI Agents (Gemini 2.5 Pro)",
      "Instant Worker Queue Claim",
      "WhatsApp Cloud API Instant Alerts",
      "Automated Vercel / CI/CD Webhooks",
      "Priority Support",
    ],
    popular: true,
    buttonText: "Sign in with GitHub (Pro)",
  },
  {
    name: "Team & Studio",
    price: "$99",
    period: "per month",
    description: "For engineering teams needing shared oversight and approval gates.",
    features: [
      "Everything in Pro Engineer",
      "Shared Team Workspace & Audit Logs",
      "Custom Role-Based Approval Gates",
      "Dedicated Worker Instances",
      "Enterprise SLA Uptime Guarantee",
      "Custom Webhook Integrations",
    ],
    popular: false,
    buttonText: "Sign in with GitHub (Team)",
  },
];

export function PricingSection() {
  const [loading, setLoading] = useState(false);

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
    <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0066FF] bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
            Simple Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            Easy pricing for developer-first computing
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 font-medium">
            Start free with GitHub authentication. Upgrade anytime for higher queue priorities.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-3xl flex flex-col justify-between transition-all ${
                plan.popular
                  ? "bg-slate-900 text-white border-2 border-[#0066FF] shadow-2xl relative scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-950 dark:text-white border border-slate-200/80 dark:border-slate-800 shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0066FF] text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black">{plan.name}</h3>
                  <p className={`text-xs font-medium mt-1 ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black font-mono">{plan.price}</span>
                  <span className={`text-xs font-bold ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                    /{plan.period}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-3 text-xs font-semibold">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.popular ? "bg-[#0066FF] text-white" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                      }`}>
                        <Check className="w-3 h-3" />
                      </span>
                      <span className={plan.popular ? "text-slate-200" : "text-slate-700 dark:text-slate-300"}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={handleGitHubAuth}
                  disabled={loading}
                  className="group w-full py-3.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-extrabold text-sm shadow-md shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98]"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Github className="w-5 h-5 fill-current" />
                      <span>{plan.buttonText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
