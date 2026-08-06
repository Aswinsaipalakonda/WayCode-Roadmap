import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="space-y-4 max-w-md mx-auto pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-neutral-900 dark:text-white">Tasks</h1>
        <Badge variant="outline">Total 3</Badge>
      </div>

      <div className="space-y-2.5">
        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Admin Dashboard</h3>
            <Badge variant="success"><CheckCircle2 className="w-3 h-3" /> Completed</Badge>
          </div>
          <p className="text-xs text-neutral-500">nextjs-supabase-ecommerce • 2m ago</p>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Orders API Integration</h3>
            <Badge variant="running"><Clock className="w-3 h-3 animate-spin" /> Running 70%</Badge>
          </div>
          <p className="text-xs text-neutral-500">nextjs-supabase-ecommerce • Active</p>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Customers Table UI</h3>
            <Badge variant="destructive"><XCircle className="w-3 h-3" /> Failed</Badge>
          </div>
          <p className="text-xs text-neutral-500">nextjs-supabase-ecommerce • 1h ago</p>
        </Card>
      </div>
    </div>
  );
}
