import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary border-primary/20",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-danger/10 text-danger border-danger/20",
        outline: "text-foreground border-neutral-300 dark:border-neutral-700",
        success: "border-transparent bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
        running: "border-transparent bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
        queued: "border-transparent bg-neutral-500/10 text-neutral-600 border-neutral-500/20 dark:text-neutral-400",
        pending: "border-transparent bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
