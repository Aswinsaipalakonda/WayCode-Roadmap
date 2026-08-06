"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

export default function ChatPage() {
  const [userName, setUserName] = useState("Developer");
  const supabase = createClient();

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Developer";
        setUserName(name.split(" ")[0]);
      }
    }
    fetchUser();
  }, [supabase]);

  return (
    <div className="space-y-6 max-w-md mx-auto pb-20">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Hi {userName}! 👋
        </h1>
        <p className="text-sm text-neutral-500 font-medium mt-1">
          What would you like to build today?
        </p>
      </div>

      {/* Intent Input Card */}
      <Card className="border-primary/20 shadow-way-lg relative overflow-hidden bg-gradient-to-b from-white to-primary-light/20 dark:from-neutral-900 dark:to-neutral-900">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-primary">Intent Prompt</span>
            </div>
            <Badge variant="outline" className="bg-white/80 text-[11px]">
              ⚡ Gemini 2.5 Pro
            </Badge>
          </div>

          <textarea
            className="w-full bg-transparent text-sm font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none resize-none min-h-[90px]"
            placeholder="Build an admin dashboard connected to Supabase orders table..."
          />

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <button type="button" className="px-3 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:border-primary transition">
                📎 Attach Context
              </button>
              <button type="button" className="px-3 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:border-primary transition">
                🗄 Use Database
              </button>
            </div>

            <Button size="icon" className="h-10 w-10 shrink-0 shadow-md">
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Tasks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Recent Tasks</h2>
          <Link href="/tasks" className="text-xs font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>

        <div className="space-y-2.5">
          <Card className="p-4 hover:border-primary/30 transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Admin Dashboard</h3>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">nextjs-supabase-ecommerce</p>
              </div>
              <Badge variant="success">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </Badge>
            </div>
          </Card>

          <Card className="p-4 hover:border-primary/30 transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Orders API Integration</h3>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">nextjs-supabase-ecommerce</p>
              </div>
              <Badge variant="running">
                <Clock className="w-3 h-3 animate-spin" /> Running (70%)
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
