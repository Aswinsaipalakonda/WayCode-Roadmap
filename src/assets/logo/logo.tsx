import Image from "next/image";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center p-1.5 shadow-md border border-white/20 shrink-0">
        <Image src="/images/logo.png" alt="WayCode Logo" width={22} height={22} priority />
      </div>
      <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">
        WayCode
      </span>
    </div>
  );
};

export default Logo;
