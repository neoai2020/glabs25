"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Zap, Mail, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-500 shadow-lg shadow-amber-500/20">
              <Zap className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">G-Labs 95</h1>
              <p className="text-xs font-medium text-emerald-400">AI Income System</p>
            </div>
          </div>

          {sent ? (
            /* Success state */
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                <CheckCircle2 className="text-emerald-400" size={32} />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-white">Check your email</h2>
              <p className="mt-3 text-lg text-slate-400">
                We sent a password reset link to
              </p>
              <p className="mt-1 font-semibold text-white">{email}</p>
              <p className="mt-4 text-sm text-slate-500">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </p>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-4 font-semibold text-white transition hover:bg-white/10"
                >
                  Try a different email
                </button>
                <Link
                  href="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-amber-400 transition hover:text-amber-300"
                >
                  <ArrowLeft size={18} />
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            /* Form state */
            <>
              <h2 className="text-3xl font-bold text-white">Forgot your password?</h2>
              <p className="mt-2 text-slate-400">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>

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

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-premium flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold text-black disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending reset link...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center">
                <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300">
                  <ArrowLeft size={16} />
                  Back to Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right Side - Promo */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center bg-gradient-to-br from-amber-900/20 to-emerald-900/20 p-12">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-white">
            Don&apos;t worry, it happens to the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">
              best of us
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            We&apos;ll get you back into your account in no time. Just enter your email and follow the instructions.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                <span className="text-xl">📧</span>
              </div>
              <div>
                <p className="font-medium text-white">Check your inbox</p>
                <p className="text-sm text-slate-400">Reset link arrives in seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <p className="font-medium text-white">Set a new password</p>
                <p className="text-sm text-slate-400">Pick something strong and memorable</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <p className="font-medium text-white">Get back to earning</p>
                <p className="text-sm text-slate-400">Your images and links are waiting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
