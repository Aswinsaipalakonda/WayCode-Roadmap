"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App boundary error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <h2 className="text-2xl font-black">Something went wrong!</h2>
        <p className="text-sm text-slate-400 font-medium">
          {error?.message || "An unexpected error occurred while rendering the page."}
        </p>
        <Button
          onClick={() => reset()}
          className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
