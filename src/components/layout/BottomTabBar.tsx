"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, ListTodo, FolderGit2, Rocket, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Chat", href: "/chat", icon: MessageSquare },
  { label: "Tasks", href: "/tasks", icon: ListTodo },
  { label: "Repos", href: "/repos", icon: FolderGit2 },
  { label: "Deploy", href: "/deploy", icon: Rocket },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border-t border-neutral-200/80 dark:border-neutral-800 px-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-14 h-12 rounded-2xl transition-all duration-200 gap-1",
              isActive
                ? "text-primary font-bold scale-105"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
