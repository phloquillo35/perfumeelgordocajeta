import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger" | "gold" | "gold-outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    // Las variantes doradas consumen la clase única `.btn-gold*` de globals.css,
    // que ya controla su propio padding/tamaño/hover. No aplicamos el bloque
    // genérico de tamaño para evitar conflictos de estilo.
    const isGold = variant === "gold" || variant === "gold-outline";
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center font-sans font-light transition-all duration-500",
          "focus:outline-none",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "text-[11px] uppercase tracking-[0.2em]",
          {
            "bg-white text-black hover:bg-white/90 active:scale-[0.97]":
              variant === "primary",
            "border border-white/20 text-white/70 hover:text-white hover:border-white/50 active:scale-[0.97]":
              variant === "outline",
            "text-white/30 hover:text-white/60": variant === "ghost",
            "border border-red-500/20 text-red-400/70 hover:bg-red-500/10 hover:text-red-400 active:scale-[0.97]":
              variant === "danger",
            "btn-gold": variant === "gold",
            "btn-gold-outline": variant === "gold-outline",
          },
          !isGold && {
            "px-5 py-2": size === "sm",
            "px-8 py-3": size === "md",
            "px-10 py-4": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps };
