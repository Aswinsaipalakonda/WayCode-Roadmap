"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Menu, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

interface TopBarProps {
  onMenuClick?: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const avatarUrl = user?.user_metadata?.avatar_url;
  const fullName = user?.user_metadata?.full_name || user?.email || "Developer";
  const initials = fullName.slice(0, 2).toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200/80 dark:border-neutral-800 px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-neutral-700 dark:text-neutral-300"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/chat" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center p-1.5 shadow-sm">
            <Image src="/images/logo.svg" alt="WayCode Logo" width={20} height={20} />
          </div>
          <span className="font-extrabold text-base tracking-tight text-neutral-900 dark:text-white">
            WayCode
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-neutral-600 dark:text-neutral-400 relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger animate-pulse" />
        </button>

        {user ? (
          <div className="flex items-center gap-1.5">
            <Link href="/settings">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={fullName}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border border-primary/40 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-xs flex items-center justify-center">
                  {initials}
                </div>
              )}
            </Link>
            <button
              onClick={handleSignOut}
              className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-danger transition"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link href="/">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-xs flex items-center justify-center">
              ?
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
