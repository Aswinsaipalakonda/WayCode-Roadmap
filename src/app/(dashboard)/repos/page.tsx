import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderGit2, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReposPage() {
  return (
    <div className="space-y-4 max-w-md mx-auto pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-neutral-900 dark:text-white">Repositories</h1>
        <Button size="sm" className="h-8 gap-1">
          <Plus className="w-4 h-4" /> Add
        </Button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
        <input
          type="text"
          placeholder="Search repositories..."
          className="w-full h-10 pl-10 pr-4 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium focus:outline-none focus:border-primary"
        />
      </div>

      <div className="space-y-2.5">
        <Card className="p-4 border-primary/40 bg-primary-light/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">nextjs-supabase-ecommerce</h3>
            </div>
            <Badge variant="outline">Private</Badge>
          </div>
          <p className="text-xs text-neutral-500 mt-1">A modern e-commerce platform built with Next.js, Supabase, and Stripe.</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-neutral-500" />
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">admin-dashboard</h3>
            </div>
            <Badge variant="outline">Private</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
