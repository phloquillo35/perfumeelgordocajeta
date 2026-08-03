import { Lock } from "lucide-react";

export function TrustBadge({ icon, label, href }: { icon?: string; label?: string; href?: string }) {
  const defaultIcon = <Lock className="w-3 h-3 text-green-400" />;
  const defaultLabel = "Trusted";

  const content = (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/30 bg-black/60 backdrop-blur-xl text-gold-300 text-xs font-medium">
      {icon ? <img src={icon} alt={label ?? defaultLabel} className="w-4 h-4" /> : defaultIcon}
      <span>{label ?? defaultLabel}</span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
      {content}
    </a>
  ) : (
    content
  );
}
