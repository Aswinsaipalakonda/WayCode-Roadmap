import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Code, Cpu, Github, Database, Radio, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-md mx-auto pb-20">
      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary text-primary font-bold text-xl flex items-center justify-center shadow-md">
          AS
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-neutral-900 dark:text-white">Aswin Sai</h1>
            <Badge variant="default">Pro Plan</Badge>
          </div>
          <p className="text-xs text-neutral-500 font-medium mt-0.5">aswin.dev@example.com</p>
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 pl-1">Preferences</h2>
        <Card className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sun className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-bold text-neutral-900 dark:text-white">Appearance</span>
            </div>
            <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
              Light <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-bold text-neutral-900 dark:text-white">Editor Theme</span>
            </div>
            <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
              WayCode Light <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-bold text-neutral-900 dark:text-white">AI Model</span>
            </div>
            <span className="text-xs font-semibold text-primary flex items-center gap-1">
              Gemini 2.5 Pro <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Card>
      </div>

      {/* Integrations */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 pl-1">Integrations</h2>
        <Card className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="w-4 h-4 text-neutral-900 dark:text-white" />
              <span className="text-xs font-bold text-neutral-900 dark:text-white">GitHub</span>
            </div>
            <Badge variant="success">Connected</Badge>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-neutral-900 dark:text-white">Supabase</span>
            </div>
            <Badge variant="success">Connected</Badge>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Radio className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold text-neutral-900 dark:text-white">Redis Cloud</span>
            </div>
            <Badge variant="success">Connected</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
