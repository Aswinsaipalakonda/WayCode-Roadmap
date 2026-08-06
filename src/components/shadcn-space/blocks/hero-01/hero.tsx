"use client";

import { useState } from "react";
import { Instrument_Serif } from "next/font/google";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Loader2 } from "lucide-react";
import { signInWithGitHub } from "@/lib/supabase/auth";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

export type AvatarList = {
  image: string;
};

type HeroSectionProps = {
  avatarList: AvatarList[];
};

function HeroSection({ avatarList }: HeroSectionProps) {
  const [loading, setLoading] = useState(false);

  const handleGitHubAuth = async () => {
    try {
      setLoading(true);
      await signInWithGitHub();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <section id="hero">
      <div className="w-full h-full relative">
        <div className="relative w-full pt-6 md:pt-16 pb-6 md:pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-sky-100 before:via-white before:to-amber-100 before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-slate-800 dark:before:via-black dark:before:to-stone-700 dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col max-w-5xl mx-auto gap-8">
              <div className="relative flex flex-col text-center items-center sm:gap-6 gap-4">
                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="lg:text-8xl md:text-7xl text-5xl font-medium tracking-tight leading-14 md:leading-20 lg:leading-24"
                >
                  Building bold code with{" "}
                  <span
                    className={`${instrumentSerif.className} tracking-tight font-serif`}
                  >
                    autonomous AI
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeInOut" }}
                  className="text-base sm:text-lg font-normal max-w-2xl text-muted-foreground"
                >
                  WayCode is an asynchronous mobile gateway for AI software engineering agents. Prompt, monitor, and deploy code directly from your phone.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                className="flex items-center flex-col md:flex-row justify-center gap-8"
              >
                <Button
                  onClick={handleGitHubAuth}
                  disabled={loading}
                  className="relative text-sm font-extrabold rounded-full h-13 bg-[#0066FF] text-white hover:bg-[#0052CC] p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer shadow-lg shadow-blue-500/25 border border-white/20"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span className="relative z-10 transition-all duration-500 flex items-center gap-2">
                        <Github className="w-4 h-4 fill-current" />
                        <span>Sign in with GitHub</span>
                      </span>
                      <span className="absolute right-1 w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </span>
                    </>
                  )}
                </Button>

                <div className="flex items-center sm:gap-7 gap-3">
                  <ul className="avatar flex flex-row items-center">
                    {avatarList.map((avatar, index) => (
                      <li key={index} className="-mr-2 z-1">
                        <img
                          src={avatar.image}
                          alt="Avatar"
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-white dark:border-slate-900 object-cover"
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="gap-1 flex flex-col items-start">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <img
                          key={index}
                          src="https://images.shadcnspace.com/assets/svgs/icon-star.svg"
                          alt="star"
                          className="h-4 w-4"
                        />
                      ))}
                    </div>
                    <p className="sm:text-sm text-xs font-normal text-muted-foreground">
                      Trusted by 1000+ engineers
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
