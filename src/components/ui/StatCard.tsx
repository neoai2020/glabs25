type Props = {
  label: string;
  value: string;
  helper?: string;
};

export function StatCard({ label, value, helper }: Props) {
  return (
    <div className="glass-card rounded-xl p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      {helper && <p className="mt-1 text-sm text-slate-500">{helper}</p>}
    </div>
  );
}
