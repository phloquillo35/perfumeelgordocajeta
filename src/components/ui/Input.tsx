import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2 font-light">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 bg-transparent border text-white/70 text-sm font-light",
            "placeholder:text-white/15 placeholder:font-light",
            "focus:outline-none focus:border-white/40",
            "transition-all duration-300",
            error ? "border-red-500/30" : "border-white/10 hover:border-white/25",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-[10px] text-red-400/70 tracking-wide">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
