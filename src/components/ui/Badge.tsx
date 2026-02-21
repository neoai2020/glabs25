import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "info" | "gold";
  size?: "sm" | "md";
  pulse?: boolean;
};

export function Badge({ children, tone = "default", size = "sm", pulse = false }: Props) {
  const toneClass = {
    default: "bg-white/10 text-white",
    success: "bg-emerald-500/20 text-emerald-400",
    warning: "bg-amber-500/20 text-amber-400",
    danger: "bg-rose-500/20 text-rose-400",
    info: "bg-blue-500/20 text-blue-400",
    gold: "bg-amber-500/20 text-amber-400",
  }[tone];

  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span className={clsx(
      "inline-flex items-center gap-1.5 rounded-full font-medium",
      toneClass,
      sizeClass
    )}>
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
