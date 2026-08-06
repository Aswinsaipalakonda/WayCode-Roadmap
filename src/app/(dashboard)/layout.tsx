"use client";

import { TopBar } from "@/components/layout/TopBar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <TopBar />
      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full">
        {children}
      </main>
      <BottomTabBar />
    </div>
  );
}
