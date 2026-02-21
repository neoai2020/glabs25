import { AppShell } from "@/components/layout/AppShell";
import { publishes } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { 
  Calendar, 
  Clock, 
  RefreshCcw, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Rocket,
  Pencil,
  Trash2,
  ArrowRight,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function SchedulerPage() {
  const queue = publishes.filter((p) => p.status === "scheduled");
  const completed = publishes.filter((p) => p.status === "sent");
  const prepared = publishes.filter((p) => p.status === "prepared");
  const failed = publishes.filter((p) => p.status === "failed");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <CheckCircle2 className="text-emerald-400" size={18} />;
      case "failed": return <XCircle className="text-rose-400" size={18} />;
      case "scheduled": return <Clock className="text-amber-400" size={18} />;
      case "prepared": return <AlertCircle className="text-blue-400" size={18} />;
      default: return null;
    }
  };

  return (
    <AppShell
      title="Auto Scheduler"
      subtitle="View and manage your scheduled posts - they publish automatically"
      showBanner={false}
      actions={
        <Link
          href="/launchpad"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/25"
        >
          <Rocket size={18} />
          Schedule New Post
        </Link>
      }
    >
      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="glass-gold rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <Clock className="text-amber-400" size={24} />
            <Badge tone="gold">PENDING</Badge>
          </div>
          <p className="mt-3 text-3xl font-bold text-amber-400">{queue.length}</p>
          <p className="text-sm text-slate-400">Scheduled</p>
        </div>

        <div className="glass-money rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="text-emerald-400" size={24} />
            <Badge tone="success">DONE</Badge>
          </div>
          <p className="mt-3 text-3xl font-bold text-emerald-400">{completed.length}</p>
          <p className="text-sm text-slate-400">Completed</p>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <AlertCircle className="text-blue-400" size={24} />
            <Badge tone="info">READY</Badge>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">{prepared.length}</p>
          <p className="text-sm text-slate-400">Prepared</p>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <XCircle className="text-rose-400" size={24} />
            {failed.length > 0 && <Badge tone="danger">ACTION</Badge>}
          </div>
          <p className="mt-3 text-3xl font-bold text-rose-400">{failed.length}</p>
          <p className="text-sm text-slate-400">Need Retry</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Posts */}
        <div className="glass-gold rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="text-amber-400" size={24} />
              <h2 className="text-xl font-bold text-white">Upcoming Posts</h2>
            </div>
            <Badge tone="gold">{queue.length} SCHEDULED</Badge>
          </div>
          <p className="mt-1 text-slate-400">These will publish automatically</p>

          <div className="mt-5 space-y-3">
            {queue.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center">
                <Calendar className="mx-auto text-slate-500" size={32} />
                <p className="mt-3 font-semibold text-white">Nothing Scheduled</p>
                <p className="mt-1 text-sm text-slate-400">
                  Schedule posts to earn money while you sleep
                </p>
                <Link
                  href="/launchpad"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black"
                >
                  <Zap size={16} />
                  Schedule Now
                </Link>
              </div>
            ) : (
              queue.map((item) => (
                <div 
                  key={item.id} 
                  className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <p className="font-semibold capitalize text-white">{item.destination}</p>
                        <p className="text-sm text-slate-400">
                          {item.assetIds.length} image{item.assetIds.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <Badge tone="gold">Scheduled</Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-400">
                      <Clock size={14} className="inline mr-1" />
                      {item.scheduledFor ? new Date(item.scheduledFor).toLocaleString() : 'Soon'}
                    </span>
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-white/10 px-3 py-1 text-white hover:bg-white/15">
                        <Pencil size={14} className="inline mr-1" />
                        Edit
                      </button>
                      <button className="rounded-lg bg-rose-500/10 px-3 py-1 text-rose-400 hover:bg-rose-500/20">
                        <Trash2 size={14} className="inline mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Post History */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <Badge tone="info">HISTORY</Badge>
          </div>
          <p className="mt-1 text-slate-400">Your publishing history</p>

          <div className="mt-5 space-y-3">
            {publishes.map((item) => (
              <div 
                key={item.id} 
                className={`rounded-xl border p-4 ${
                  item.status === "failed" 
                    ? "border-rose-500/30 bg-rose-500/5" 
                    : item.status === "sent"
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <p className="font-semibold capitalize text-white">{item.destination}</p>
                      <p className="text-sm text-slate-400">
                        {item.assetIds.length} image{item.assetIds.length !== 1 ? 's' : ''} 
                        • {item.linkId ? "Link attached" : "No link"}
                      </p>
                    </div>
                  </div>
                  <Badge
                    tone={
                      item.status === "sent" ? "success" :
                      item.status === "failed" ? "danger" :
                      item.status === "scheduled" ? "gold" : "info"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
                
                {item.status === "failed" && item.error && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-rose-500/10 p-3">
                    <span className="text-sm text-rose-300">{item.error}</span>
                    <button className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/15">
                      <RefreshCcw size={14} />
                      Retry
                    </button>
                  </div>
                )}

                {item.status === "prepared" && (
                  <div className="mt-3 rounded-lg bg-blue-500/10 p-3">
                    <p className="text-sm text-blue-300">
                      Ready to post manually on Instagram
                    </p>
                  </div>
                )}

                <p className="mt-2 text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap size={20} />
          <h2 className="text-lg font-bold">Scheduling Tips</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <CheckCircle2 className="text-emerald-400" size={20} />
            <p className="mt-2 font-semibold text-white">Best Times to Post</p>
            <p className="mt-1 text-sm text-slate-400">
              8-11 PM local time gets the highest engagement. Schedule posts for evening hours.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <CheckCircle2 className="text-emerald-400" size={20} />
            <p className="mt-2 font-semibold text-white">Stay Consistent</p>
            <p className="mt-1 text-sm text-slate-400">
              Post daily to build momentum. Batch create and schedule for the week ahead.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <CheckCircle2 className="text-emerald-400" size={20} />
            <p className="mt-2 font-semibold text-white">Spread Them Out</p>
            <p className="mt-1 text-sm text-slate-400">
              Don't post all at once. Space them 2-4 hours apart for better reach.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
