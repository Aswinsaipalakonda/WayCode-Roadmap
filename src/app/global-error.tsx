"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md space-y-4">
          <h2 className="text-2xl font-black">Application Error</h2>
          <p className="text-sm text-slate-400 font-medium">
            {error?.message || "A critical error occurred."}
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm"
          >
            Refresh Gateway
          </button>
        </div>
      </body>
    </html>
  );
}
