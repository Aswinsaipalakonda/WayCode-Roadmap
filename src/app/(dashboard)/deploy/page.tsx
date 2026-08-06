import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, ExternalLink, CheckCircle2 } from "lucide-react";

export default function DeployPage() {
  return (
    <div className="space-y-4 max-w-md mx-auto pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-neutral-900 dark:text-white">Deployments</h1>
        <Badge variant="success"><CheckCircle2 className="w-3 h-3" /> System Live</Badge>
      </div>

      <Card className="p-5 border-primary/20 bg-gradient-to-br from-white to-primary-light/10 dark:from-neutral-900 dark:to-neutral-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Deployment Successful!</h3>
            <p className="text-xs text-neutral-500">nextjs-supabase-ecommerce</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between">
          <span className="text-xs font-mono text-primary font-medium truncate max-w-[200px]">
            https://nextjs-supabase-ecommerce.waycode.app
          </span>
          <a
            href="https://nextjs-supabase-ecommerce.waycode.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
          >
            <span>Visit</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </Card>
    </div>
  );
}
