"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import {
  Zap, Lock, ArrowRight, ArrowLeft, Loader2, CheckCircle2,
  Eye, EyeOff, AlertCircle, ShieldCheck,
} from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [ready, setReady] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const urlParams = new URLSearchParams(window.location.search);

      const urlError = urlParams.get("error");
      if (urlError) {
        setError(urlError);
        setChecking(false);
        return;
      }

      // Primary method: token_hash from customised Supabase email template
      const tokenHash = urlParams.get("token_hash");
      const type = urlParams.get("type");
      if (tokenHash && type === "recovery") {
        try {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: "recovery",
          });
          if (verifyError) {
            setError(verifyError.message);
          } else {
            setReady(true);
          }
        } catch {
          setError("Failed to verify reset link. Please request a new one.");
        }
        setChecking(false);
        return;
      }

      // Fallback: PKCE code exchange
      const code = urlParams.get("code");
      if (code) {
        try {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setError(exchangeError.message);
          } else {
            setReady(true);
          }
        } catch {
          setError("Failed to verify reset code. Please request a new link.");
        }
        setChecking(false);
        return;
      }

      // Fallback: hash-based tokens (implicit flow)
      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash);
      const hashError = hashParams.get("error_description");
      if (hashError) {
        setError(hashError.replace(/\+/g, " "));
        setChecking(false);
        return;
      }
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      if (accessToken && refreshToken) {
        try {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (sessionError) {
            setError(sessionError.message);
          } else {
            setReady(true);
          }
        } catch {
          setError("Failed to verify reset link. Please request a new one.");
        }
        setChecking(false);
        return;
      }

      // Fallback: existing session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setReady(true);
      } else {
        setError(
          "No active reset session. Please request a new password reset link."
        );
      }
      setChecking(false);
    };

    init();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Checking state ── */
  if (checking) {
    return (
      <div className="text-center">
        <Loader2 className="mx-auto animate-spin text-amber-400" size={40} />
        <h2 className="mt-6 text-2xl font-bold text-white">
          Verifying your reset link...
        </h2>
        <p className="mt-2 text-slate-400">This will only take a moment.</p>
      </div>
    );
  }

  /* ── Success state ── */
  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
          <CheckCircle2 className="text-emerald-400" size={32} />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-white">
          Password Updated!
        </h2>
        <p className="mt-3 text-lg text-slate-400">
          Your password has been changed successfully.
        </p>
        <Link
          href="/login"
          className="btn-premium mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-black"
        >
          Sign In With New Password
          <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  /* ── Error state (no valid session) ── */
  if (!ready && error) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/20">
          <AlertCircle className="text-rose-400" size={32} />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-white">Reset Failed</h2>
        <p className="mt-3 text-slate-400">{error}</p>
        <div className="mt-8 space-y-3">
          <Link
            href="/forgot-password"
            className="btn-premium flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold text-black"
          >
            Request a New Link
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/login"
            className="flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-amber-400 transition hover:text-amber-300"
          >
            <ArrowLeft size={18} />
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  /* ── New password form ── */
  return (
    <>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/20">
        <ShieldCheck className="text-amber-400" size={28} />
      </div>
      <h2 className="mt-6 text-3xl font-bold text-white">Set new password</h2>
      <p className="mt-2 text-slate-400">
        Choose a strong password for your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-400">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-300">
            New Password
          </label>
          <div className="relative mt-2">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-12 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              placeholder="At least 6 characters"
              required
              minLength={6}
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

        <div>
          <label className="block text-sm font-medium text-slate-300">
            Confirm Password
          </label>
          <div className="relative mt-2">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={20}
            />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-12 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
              placeholder="Re-enter your password"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
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
              Updating password...
            </>
          ) : (
            <>
              Update Password
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
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
              <p className="text-xs font-medium text-emerald-400">
                AI Income System
              </p>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="text-center">
                <Loader2
                  className="mx-auto animate-spin text-amber-400"
                  size={40}
                />
                <p className="mt-4 text-slate-400">Loading...</p>
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>

      {/* Right Side - Promo */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center bg-gradient-to-br from-amber-900/20 to-emerald-900/20 p-12">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold text-white">
            Almost there!{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">
              Set your new password
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Pick a strong password and you&apos;ll be back to earning in
            seconds.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                <CheckCircle2 className="text-emerald-400" size={20} />
              </div>
              <div>
                <p className="font-medium text-white">Use 6+ characters</p>
                <p className="text-sm text-slate-400">
                  Mix letters, numbers, and symbols
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                <CheckCircle2 className="text-emerald-400" size={20} />
              </div>
              <div>
                <p className="font-medium text-white">
                  Don&apos;t reuse passwords
                </p>
                <p className="text-sm text-slate-400">
                  Keep your account safe
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <p className="font-medium text-white">
                  Your earnings are waiting
                </p>
                <p className="text-sm text-slate-400">
                  Get back to making money with AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
