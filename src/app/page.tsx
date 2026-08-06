"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import Header from "@/components/shadcn-space/blocks/hero-01/header";
import HeroSection from "@/components/shadcn-space/blocks/hero-01/hero";
import BrandSlider from "@/components/shadcn-space/blocks/hero-01/brand-slider";

const navigationData = [
  { title: "Home", href: "#hero", isActive: true },
  { title: "Features", href: "#features" },
  { title: "Architecture", href: "#architecture" },
  { title: "Pricing", href: "#pricing" },
  { title: "FAQ", href: "#faq" },
];

const avatarList = [
  { image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
  { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
  { image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
];

const brandList = [
  { id: "1", name: "GitHub", image: "https://images.shadcnspace.com/assets/svgs/logo-github.svg", lightimg: "https://images.shadcnspace.com/assets/svgs/logo-github.svg" },
  { id: "2", name: "Supabase", image: "https://images.shadcnspace.com/assets/svgs/logo-supabase.svg", lightimg: "https://images.shadcnspace.com/assets/svgs/logo-supabase.svg" },
  { id: "3", name: "Vercel", image: "https://images.shadcnspace.com/assets/svgs/logo-vercel.svg", lightimg: "https://images.shadcnspace.com/assets/svgs/logo-vercel.svg" },
  { id: "4", name: "Next.js", image: "https://images.shadcnspace.com/assets/svgs/logo-nextjs.svg", lightimg: "https://images.shadcnspace.com/assets/svgs/logo-nextjs.svg" },
  { id: "5", name: "Tailwind CSS", image: "https://images.shadcnspace.com/assets/svgs/logo-tailwind.svg", lightimg: "https://images.shadcnspace.com/assets/svgs/logo-tailwind.svg" },
];

export default function Home() {
  const [, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Header navigationData={navigationData} />
      <main>
        <HeroSection avatarList={avatarList} />
        <div className="py-12 border-t border-border/40">
          <BrandSlider brandList={brandList} />
        </div>
      </main>
    </div>
  );
}
