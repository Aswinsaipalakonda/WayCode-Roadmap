"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const workflowSteps = [
  {
    step: "01",
    title: "Mobile Prompt Capture & Intent Parsing",
    subtitle: "Client Interaction Layer",
    desc: "The developer submits a high-level intent prompt from any mobile browser. The request is structured into a normalized JSON payload containing repository target, branch name, prompt directives, and authorization signatures without triggering local compilation.",
    pills: ["Mobile Web UI", "HTTPS Post"],
    log: "REQUEST RECEIVED -> Intent parsed into JSON payload",
  },
  {
    step: "02",
    title: "GitHub OAuth & Scope Verification",
    subtitle: "Security & Authentication",
    desc: "The API Gateway validates OAuth credentials and tenant permissions via Supabase Auth. It verifies repository write access and limits execution scope before allowing job creation.",
    pills: ["GitHub OAuth", "Supabase Auth"],
    log: "AUTH VERIFIED -> Scope: repo (read/write)",
  },
  {
    step: "03",
    title: "Asynchronous Redis Job Persistence",
    subtitle: "Gateway Queue Manager",
    desc: "Upon authentication, the request is written to a persistent Redis task queue. The gateway responds with a unique task ID, allowing the smartphone browser to disconnect safely while execution proceeds asynchronously.",
    pills: ["Redis Engine", "Job Queue"],
    log: "TASK PERSISTED -> TASK-4821 queued. Client may disconnect safely.",
  },
  {
    step: "04",
    title: "LLM Agentic Planning & Context Analysis",
    subtitle: "AI Execution Plane",
    desc: "A background cloud worker claims the queued task and invokes the LLM agent (e.g., Gemini 2.5 Pro). The agent parses the target codebase, builds a dependency graph, and formulates a step-by-step modification plan.",
    pills: ["LLM Agent", "AST Parser"],
    log: "WORKER CLAIMED -> Agent planning multi-file modifications...",
  },
  {
    step: "05",
    title: "Isolated Git Sandbox Workspace Modification",
    subtitle: "Code Execution Environment",
    desc: "The agent clones the repository into an isolated Docker container, creates a dedicated feature branch, and applies repository-level code edits to source files, dependencies, and configurations.",
    pills: ["Docker Sandbox", "Git Workspace"],
    log: "GIT CLONE -> Created feature branch agent/task-4821",
  },
  {
    step: "06",
    title: "Automated Local Build & Verification Checks",
    subtitle: "Quality Assurance Layer",
    desc: "Before committing changes, the execution plane runs local build tools, static linters, and unit test suites inside the sandbox container to guarantee code correctness and prevent syntax regression.",
    pills: ["NPM / Cargo", "Unit Tests"],
    log: "$ npm run build -> Build successful. 12 unit tests passed.",
  },
  {
    step: "07",
    title: "Git Commit & Remote Branch Push",
    subtitle: "Version Control Integration",
    desc: "Once verification passes, the executor creates a signed Git commit with detailed change summaries and pushes the new branch directly to the upstream remote repository (GitHub).",
    pills: ["Git Push", "SSH Signature"],
    log: "GIT PUSH -> Pushed agent/task-4821 to GitHub remote",
  },
  {
    step: "08",
    title: "CI/CD Webhook & Cloud Deployment Trigger",
    subtitle: "Deployment Automation",
    desc: "The remote push fires automated webhooks into the CI/CD pipeline (Vercel/GitHub Actions), building preview deployments and generating live preview URLs for instant verification.",
    pills: ["Vercel Webhook", "Preview Build"],
    log: "DEPLOYMENT LIVE -> Live URL: https://nextjs-supabase.vercel.app",
  },
  {
    step: "09",
    title: "WhatsApp Cloud Alert & Real-time Mobile Notification",
    subtitle: "Notification Dispatcher",
    desc: "The gateway dispatches a push alert and WhatsApp message to the developer's mobile device containing task completion status, summary diffs, and live deployment links.",
    pills: ["WhatsApp API", "Mobile Alert"],
    log: "NOTIFICATION SENT -> WhatsApp alert dispatched to developer.",
  },
];

export function WorkflowSection() {
  const [currentStep, setCurrentStep] = useState(0);

  const prevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? workflowSteps.length - 1 : prev - 1));
  };

  const nextStep = () => {
    setCurrentStep((prev) => (prev === workflowSteps.length - 1 ? 0 : prev + 1));
  };

  const active = workflowSteps[currentStep];

  return (
    <section id="workflow" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
            End-to-End Pipeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
            The 9-Stage Execution Workflow
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 font-medium">
            From mobile prompt to verified production commit in 9 seamless steps.
          </p>
        </div>

        {/* Step Navigation Rail */}
        <div className="mt-12 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center justify-between min-w-[700px] border-b border-slate-200 dark:border-slate-800 pb-3">
            {workflowSteps.map((item, index) => (
              <button
                key={item.step}
                onClick={() => setCurrentStep(index)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  currentStep === index
                    ? "text-primary font-bold scale-110"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <span className="text-xs font-mono font-bold">Stage {item.step}</span>
                <span className={`w-3 h-3 rounded-full border-2 transition-all ${
                  currentStep === index ? "bg-primary border-primary" : "bg-transparent border-slate-300 dark:border-slate-700"
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Content Container */}
        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-xl">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-black font-mono text-primary/30 dark:text-primary/40">
                {active.step}
              </span>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                  {active.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white mt-1 leading-snug">
                  {active.title}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {active.desc}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {active.pills.map((pill) => (
                <span key={pill} className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm">
                  {pill}
                </span>
              ))}
            </div>

            {/* Live Gateway Log Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white font-mono text-xs shadow-lg space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gateway Stream Log</div>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{active.log}</span>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={prevStep}
                className="p-3 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white dark:hover:bg-primary transition shadow-sm"
                aria-label="Previous step"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-500">
                Step {currentStep + 1} of 9
              </span>
              <button
                onClick={nextStep}
                className="p-3 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white dark:hover:bg-primary transition shadow-sm"
                aria-label="Next step"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column High-Res Product Image Render */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[320px] rounded-[36px] overflow-hidden border-4 border-white/80 dark:border-slate-800/80 shadow-2xl">
              <Image
                src="/images/feature-phone-mockup.png"
                alt="WayCode Feature Showcase"
                width={500}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
