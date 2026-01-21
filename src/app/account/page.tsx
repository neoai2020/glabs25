import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { User, CreditCard, LogOut, CheckCircle2 } from "lucide-react";

export default function AccountPage() {
  return (
    <AppShell
      title="My Account"
      subtitle="Manage your profile and subscription"
    >
      {/* Profile Header */}
      <div className="glass-gold rounded-3xl p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-amber-400 to-emerald-500 text-2xl font-bold text-black shadow-lg shadow-amber-500/30">
            AC
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <h2 className="text-2xl font-bold text-white">Your Account</h2>
              <Badge tone="gold" size="md">G-LABS 95 MEMBER</Badge>
            </div>
            <p className="mt-1 text-slate-400">Member since January 2026</p>
          </div>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Profile Settings</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300">Display Name</label>
            <input
              type="text"
              defaultValue="Your Name"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Email Address</label>
            <input
              type="email"
              defaultValue="your@email.com"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
            />
          </div>
        </div>
        <button className="mt-6 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400">
          Save Changes
        </button>
      </div>

      {/* Subscription */}
      <div className="glass-card rounded-3xl p-8">
        <h2 className="text-xl font-bold text-white">Your Subscription</h2>
        <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-xl font-bold text-white">G-Labs 95 Membership</p>
                <Badge tone="success">Active</Badge>
              </div>
              <p className="mt-1 text-slate-400">Full access to all features</p>
            </div>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Unlimited AI image generation
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Step-by-step publishing guides
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Copy-paste captions
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 size={16} className="text-emerald-400" />
              Free training videos
            </div>
          </div>
        </div>
        <button className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white hover:bg-white/10">
          <CreditCard size={18} />
          Manage Billing
        </button>
      </div>

      {/* Sign Out */}
      <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/5 py-4 text-rose-400 hover:bg-rose-500/10">
        <LogOut size={20} />
        Sign Out
      </button>
    </AppShell>
  );
}
