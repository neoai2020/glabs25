import clsx from "clsx";
import { TrendingUp, DollarSign, Image, Link2, Flame, MousePointerClick } from "lucide-react";

type Props = {
  label: string;
  value: string;
  helper?: string;
  tone?: "default" | "success" | "warning" | "danger" | "money" | "gold";
  icon?: "earnings" | "images" | "links" | "streak" | "clicks";
  trend?: string;
  prefix?: string;
};

const iconMap = {
  earnings: DollarSign,
  images: Image,
  links: Link2,
  streak: Flame,
  clicks: MousePointerClick,
};

export function StatCard({ label, value, helper, tone = "default", icon, trend, prefix }: Props) {
  const Icon = icon ? iconMap[icon] : null;
  
  const cardClass = {
    default: "glass-card",
    success: "glass-money",
    warning: "border-amber-500/20 bg-amber-500/5",
    danger: "border-rose-500/20 bg-rose-500/5",
    money: "glass-money",
    gold: "glass-gold",
  }[tone];

  const iconBgClass = {
    default: "bg-white/10 text-white",
    success: "bg-emerald-500/20 text-emerald-400",
    warning: "bg-amber-500/20 text-amber-400",
    danger: "bg-rose-500/20 text-rose-400",
    money: "bg-emerald-500/20 text-emerald-400",
    gold: "bg-amber-500/20 text-amber-400",
  }[tone];

  const valueClass = {
    default: "text-white",
    success: "text-emerald-400",
    warning: "text-amber-400",
    danger: "text-rose-400",
    money: "text-emerald-400",
    gold: "text-amber-400",
  }[tone];

  return (
    <div className={clsx("rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]", cardClass)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <div className="mt-2 flex items-baseline gap-1">
            {prefix && <span className={clsx("text-2xl font-bold", valueClass)}>{prefix}</span>}
            <span className={clsx("text-4xl font-bold tracking-tight", valueClass)}>{value}</span>
          </div>
          {helper && <p className="mt-2 text-sm text-slate-500">{helper}</p>}
          {trend && (
            <div className="mt-2 flex items-center gap-1 text-emerald-400">
              <TrendingUp size={14} />
              <span className="text-sm font-medium">{trend}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={clsx("flex h-12 w-12 items-center justify-center rounded-xl", iconBgClass)}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
}
