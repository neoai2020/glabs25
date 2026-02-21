import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { earningsData, stats } from "@/lib/mockData";
import {
  User,
  Shield,
  CreditCard,
  Key,
  LogOut,
  CheckCircle2,
  Star,
  TrendingUp,
  Zap
} from "lucide-react";

export default function AccountPage() {
  return (
    <AppShell
      title="My Account"
      subtitle="Manage your profile, subscription, and settings"
      showBanner={false}
      actions={<Badge tone="gold">PRO MEMBER</Badge>}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-500 text-2xl font-bold text-black">
                AC
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Your Profile</h2>
                <p className="text-slate-400">Member since January 2026</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge tone="gold">PRO</Badge>
                  <Badge tone="success" pulse>ACTIVE</Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400">Display Name</label>
                <input
                  type="text"
                  defaultValue="Avery Creator"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white focus:border-amber-500/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400">Email</label>
                <input
                  type="email"
                  defaultValue="avery@example.com"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white focus:border-amber-500/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400">Timezone</label>
                <select className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white focus:border-amber-500/50 focus:outline-none">
                  <option>America/Los_Angeles (Pacific)</option>
                  <option>America/New_York (Eastern)</option>
                  <option>America/Chicago (Central)</option>
                  <option>Europe/London (GMT)</option>
                </select>
              </div>
            </div>

            <button className="mt-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-bold text-black transition hover:-translate-y-0.5">
              Save Changes
            </button>
          </div>

          {/* Connections */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Key className="text-amber-400" size={24} />
              <h2 className="text-xl font-bold text-white">Platform Connections</h2>
            </div>
            <p className="mt-1 text-slate-400">Connect your accounts for seamless publishing</p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📌</span>
                  <div>
                    <p className="font-semibold text-white">Pinterest</p>
                    <p className="text-sm text-emerald-400">Connected</p>
                  </div>
                </div>
                <CheckCircle2 className="text-emerald-400" size={24} />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📸</span>
                  <div>
                    <p className="font-semibold text-white">Instagram</p>
                    <p className="text-sm text-slate-400">Not connected</p>
                  </div>
                </div>
                <button className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black">
                  Connect
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🖼️</span>
                  <div>
                    <p className="font-semibold text-white">Stock Sites</p>
                    <p className="text-sm text-slate-400">Optional</p>
                  </div>
                </div>
                <button className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Your Stats */}
          <div className="glass-gold rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-amber-400" size={24} />
              <h2 className="text-xl font-bold text-white">Your Progress</h2>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Images Created</span>
                <span className="text-xl font-bold text-white">{stats.imagesGenerated}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Posts Published</span>
                <span className="text-xl font-bold text-white">{stats.postsPublished}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Current Streak</span>
                <span className="text-xl font-bold text-amber-400">{stats.streakDays} days 🔥</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Total Estimated Earnings</span>
                <span className="text-2xl font-bold text-emerald-400">${earningsData.allTime.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Star className="text-amber-400" size={24} />
              <h2 className="text-xl font-bold text-white">Subscription</h2>
            </div>

            <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-white">Pro Plan</p>
                  <p className="text-sm text-slate-400">Unlimited access</p>
                </div>
                <Badge tone="gold">ACTIVE</Badge>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Unlimited AI image generation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Unlimited publishing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  Advanced analytics
                </li>
              </ul>
            </div>

            <button className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 py-3 font-semibold text-white hover:bg-white/10">
              <CreditCard size={16} className="inline mr-2" />
              Manage Billing
            </button>
          </div>

          {/* Security */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <Shield className="text-amber-400" size={24} />
              <h2 className="text-xl font-bold text-white">Security</h2>
            </div>

            <div className="mt-5 space-y-3">
              <button className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10">
                <div>
                  <p className="font-semibold text-white">Change Password</p>
                  <p className="text-sm text-slate-400">Update your password</p>
                </div>
                <Zap className="text-slate-400" size={18} />
              </button>

              <button className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10">
                <div>
                  <p className="font-semibold text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-400">Add extra security</p>
                </div>
                <Badge tone="warning">Recommended</Badge>
              </button>
            </div>
          </div>

          {/* Logout */}
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 py-4 font-semibold text-rose-400 transition hover:bg-rose-500/20">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </AppShell>
  );
}
