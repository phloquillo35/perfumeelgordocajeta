import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "arabe" | "disenador" | "bottle" | "decant";
  className?: string;
}

const variants = {
  default: "text-white/40 bg-white/[0.03]",
  arabe: "text-amber-400 bg-amber-500/10 border border-amber-500/20",
  disenador: "text-blue-400 bg-blue-500/10 border border-blue-500/20",
  bottle: "text-gold-400 bg-gold-500/10 border border-gold-500/20",
  decant: "text-purple-400 bg-purple-500/10 border border-purple-500/20",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-light",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
