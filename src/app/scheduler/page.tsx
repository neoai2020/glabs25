import { AppShell } from "@/components/layout/AppShell";
import { publishes } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Calendar, CheckCircle2, XCircle, Clock, Rocket, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SchedulerPage() {
  const scheduled = publishes.filter((p) => p.status === "scheduled");
  const completed = publishes.filter((p) => p.status === "sent");
  const failed = publishes.filter((p) => p.status === "failed");

  return (
    <AppShell
      title="Scheduler"
      subtitle="Track your scheduled and published posts."
      actions={
        <Link href="/launchpad" className="btn-premium flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-black">
          <Rocket size={18} />
          Publish Now
        </Link>
      }
    >
      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-2xl p-6">
          <Clock className="text-amber-400" size={28} />
          <p className="mt-3 text-3xl font-bold text-white">{scheduled.length}</p>
          <p className="text-slate-400">Scheduled</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <CheckCircle2 className="text-emerald-400" size={28} />
          <p className="mt-3 text-3xl font-bold text-white">{completed.length}</p>
          <p className="text-slate-400">Published</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <XCircle className="text-rose-400" size={28} />
          <p className="mt-3 text-3xl font-bold text-white">{failed.length}</p>
          <p className="text-slate-400">Failed</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Recent Activity</h2>

        {publishes.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-white/20 p-12 text-center">
            <Calendar className="mx-auto text-slate-500" size={48} />
            <h3 className="mt-4 text-xl font-semibold text-white">No posts yet</h3>
            <p className="mt-2 text-slate-400">Publish your first images to see them here.</p>
            <Link href="/launchpad" className="btn-premium mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-black">
              <Rocket size={18} />
              Publish Now
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {publishes.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    item.status === "sent" ? "bg-emerald-500/20" :
                    item.status === "failed" ? "bg-rose-500/20" : "bg-amber-500/20"
                  }`}>
                    {item.status === "sent" && <CheckCircle2 className="text-emerald-400" size={24} />}
                    {item.status === "failed" && <XCircle className="text-rose-400" size={24} />}
                    {item.status === "scheduled" && <Clock className="text-amber-400" size={24} />}
                    {item.status === "prepared" && <Clock className="text-blue-400" size={24} />}
                  </div>
                  <div>
                    <p className="font-semibold text-white capitalize">{item.destination}</p>
                    <p className="text-sm text-slate-400">
                      {item.assetIds.length} image{item.assetIds.length > 1 ? "s" : ""} • {item.scheduledFor ? new Date(item.scheduledFor).toLocaleDateString() : "Pending"}
                    </p>
                  </div>
                </div>
                <Badge tone={
                  item.status === "sent" ? "success" :
                  item.status === "failed" ? "danger" :
                  item.status === "scheduled" ? "gold" : "info"
                }>
                  {item.status === "sent" ? "Published" : item.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="glass-card rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white">Keep going</h3>
        <p className="mt-2 text-slate-300">Generate more images or queue up your next post.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/image-forge" className="btn-premium flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-black">
            <Sparkles size={18} />
            Create More Images
          </Link>
          <Link href="/launchpad" className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10">
            Publish Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
