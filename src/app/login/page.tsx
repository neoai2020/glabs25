"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Zap, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-500 shadow-lg shadow-amber-500/20">
              <Zap className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">G-Labs 95</h1>
              <p className="text-xs text-emerald-400 font-medium">AI Income System</p>
            </div>
          </div>

          {/* Header */}
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-slate-400">Sign in to continue making money</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-400">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-12 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-premium flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold text-black disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-center text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-amber-400 hover:text-amber-300">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Promo */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center bg-gradient-to-br from-amber-900/20 to-emerald-900/20 p-12">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            12,483 members earning daily
          </div>

          <h2 className="mt-6 text-4xl font-bold text-white">
            Turn AI Images Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">Passive Income</span>
          </h2>

          <p className="mt-4 text-lg text-slate-300">
            Create stunning images with AI, post them on Pinterest, and earn money while you sleep. No design skills required.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <p className="font-medium text-white">$847,230</p>
                <p className="text-sm text-slate-400">Earned by members this month</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                <span className="text-xl">📈</span>
              </div>
              <div>
                <p className="font-medium text-white">$214.36/day average</p>
                <p className="text-sm text-slate-400">Member earnings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
