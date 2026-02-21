import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "info" | "gold" | "money";
  size?: "sm" | "md";
  pulse?: boolean;
};

export function Badge({ children, tone = "default", size = "sm", pulse = false }: Props) {
  const toneClass = {
    default: "bg-white/10 text-white border-white/20",
    success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    danger: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    gold: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    money: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  }[tone];

  const sizeClass = {
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3 py-1.5",
  }[size];

  return (
    <span className={clsx(
      "inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider border",
      toneClass,
      sizeClass
    )}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={clsx(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            tone === "success" || tone === "money" ? "bg-emerald-400" : "bg-amber-400"
          )}></span>
          <span className={clsx(
            "relative inline-flex h-2 w-2 rounded-full",
            tone === "success" || tone === "money" ? "bg-emerald-400" : "bg-amber-400"
          )}></span>
        </span>
      )}
      {children}
    </span>
  );
}
