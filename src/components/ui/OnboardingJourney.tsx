"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X, ArrowRight, ArrowLeft, Sparkles, Zap, DollarSign, Rocket,
  TrendingUp, CheckCircle2, Trophy, Gift, Star, Users, Image as ImageIcon,
  Link2, PartyPopper, Crown,
} from "lucide-react";
import Link from "next/link";

const socialProofNames = [
  "Sarah M.", "David R.", "Jennifer K.", "Michael L.", "Lisa S.",
  "Robert J.", "Patricia W.", "James B.", "Linda T.", "William H.",
];

const socialProofAmounts = [
  "$347", "$1,204", "$89", "$562", "$2,100", "$178", "$923", "$441", "$1,850", "$67",
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function OnboardingJourney({ open, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [counter, setCounter] = useState(0);

  const totalSteps = 7;

  const goNext = useCallback(() => {
    if (step >= totalSteps - 1 || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setAnimating(false);
    }, 300);
  }, [step, animating]);

  const goBack = useCallback(() => {
    if (step <= 0 || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setAnimating(false);
    }, 300);
  }, [step, animating]);

  useEffect(() => {
    if (!open) {
      setStep(0);
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goBack();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, goNext, goBack, onClose]);

  useEffect(() => {
    if (!open || step !== 0) return;
    let i = 0;
    const target = 12483;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      i += increment;
      if (i >= target) {
        setCounter(target);
        clearInterval(timer);
      } else {
        setCounter(Math.floor(i));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [open, step]);

  const handleFinish = () => {
    localStorage.removeItem("glabs_needs_onboarding");
    onClose();
  };

  if (!open) return null;

  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md">
      {/* Close */}
      <button
        onClick={handleFinish}
        className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
      >
        <X size={20} />
      </button>

      {/* Progress bar */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicator */}
      <div className="absolute left-1/2 top-6 -translate-x-1/2 flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? "w-8 bg-amber-500" : i < step ? "w-2 bg-emerald-500" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className={`w-full max-w-2xl px-6 transition-all duration-300 ${
          animating ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {step === 0 && (
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 shadow-[0_0_60px_rgba(251,191,36,0.4)]">
              <PartyPopper size={48} className="text-black" />
            </div>
            <h1 className="mt-8 text-4xl font-extrabold text-white sm:text-5xl">
              Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">Club!</span>
            </h1>
            <p className="mt-4 text-xl text-slate-300">
              You just joined{" "}
              <span className="font-bold text-emerald-400">{counter.toLocaleString()}+</span>{" "}
              members who are earning daily
            </p>
            <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-4">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <p className="text-2xl font-bold text-emerald-400">$847K</p>
                <p className="text-xs text-slate-400">earned this month</p>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
                <p className="text-2xl font-bold text-amber-400">$214</p>
                <p className="text-xs text-slate-400">avg daily earnings</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <p className="text-2xl font-bold text-emerald-400">24/7</p>
                <p className="text-xs text-slate-400">passive income</p>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3 text-sm text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              347 people earned money today
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_60px_rgba(251,191,36,0.4)]">
              <Crown size={48} className="text-black" />
            </div>
            <h1 className="mt-8 text-4xl font-extrabold text-white">
              How You&apos;ll <span className="text-amber-400">Make Money</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              It&apos;s simpler than you think. Just 3 steps.
            </p>
            <div className="mt-8 space-y-4 text-left">
              <div className="flex items-start gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-xl font-bold text-black">1</div>
                <div>
                  <p className="text-lg font-bold text-white">AI Creates Stunning Images</p>
                  <p className="mt-1 text-slate-300">Pick a topic. Our AI generates beautiful, click-worthy images that people love.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-xl font-bold text-black">2</div>
                <div>
                  <p className="text-lg font-bold text-white">Attach Your Money Link</p>
                  <p className="mt-1 text-slate-300">Add your affiliate link. Every click on your image = potential money in your pocket.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-emerald-500 text-xl font-bold text-black">3</div>
                <div>
                  <p className="text-lg font-bold text-white">Publish &amp; Earn While You Sleep</p>
                  <p className="mt-1 text-slate-300">Post to Pinterest, Instagram &amp; more. Income flows 24/7 on autopilot.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-[0_0_60px_rgba(168,85,247,0.4)]">
              <ImageIcon size={48} className="text-white" />
            </div>
            <h1 className="mt-8 text-4xl font-extrabold text-white">
              Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI Profit Machine</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              This is where the magic happens. Pick a niche, and AI creates money-making images in seconds.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Home & Living", "Beauty", "Fashion", "Baby & Kids"].map((niche) => (
                <div key={niche} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <Sparkles size={20} className="mx-auto text-amber-400" />
                  <p className="mt-2 text-sm font-medium text-white">{niche}</p>
                  <p className="text-xs text-emerald-400">$80-$130/day</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
              <div className="flex items-center justify-center gap-2 text-amber-400">
                <TrendingUp size={20} />
                <span className="font-bold">Members generated 2.4M+ images last month</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">Each image is a potential income stream working for you 24/7</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_60px_rgba(16,185,129,0.4)]">
              <Link2 size={48} className="text-black" />
            </div>
            <h1 className="mt-8 text-4xl font-extrabold text-white">
              Your <span className="text-emerald-400">Money Links</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              This is where you connect your affiliate links. Every click on your image can earn you money.
            </p>
            <div className="mt-8 space-y-3 text-left">
              {[
                { name: "Amazon Associates", desc: "Earn 1-10% on every sale", color: "amber" },
                { name: "Etsy Affiliates", desc: "Earn 4-8% commission", color: "emerald" },
                { name: "Any Affiliate Network", desc: "ClickBank, ShareASale, CJ & more", color: "amber" },
              ].map((link) => (
                <div key={link.name} className={`flex items-center gap-4 rounded-xl border border-${link.color}-500/20 bg-${link.color}-500/10 p-4`}>
                  <DollarSign size={24} className={`text-${link.color}-400`} />
                  <div>
                    <p className="font-semibold text-white">{link.name}</p>
                    <p className="text-sm text-slate-400">{link.desc}</p>
                  </div>
                  <CheckCircle2 size={20} className="ml-auto text-emerald-400" />
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-emerald-400 font-medium">
              <Gift size={16} className="inline mr-1" />
              Don&apos;t have an affiliate link yet? We&apos;ll show you how to get one in 2 minutes!
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 shadow-[0_0_60px_rgba(59,130,246,0.4)]">
              <Rocket size={48} className="text-white" />
            </div>
            <h1 className="mt-8 text-4xl font-extrabold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Cash Out</span> &amp; Publish
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              One click to publish your images to Pinterest, Instagram, and more. Your money link goes with every post.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { name: "Pinterest", emoji: "📌", desc: "Best for clicks", tag: "RECOMMENDED" },
                { name: "Instagram", emoji: "📸", desc: "Great engagement" },
                { name: "Stock Sites", emoji: "🖼️", desc: "Passive income" },
              ].map((p) => (
                <div key={p.name} className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
                  {p.tag && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      {p.tag}
                    </span>
                  )}
                  <span className="text-3xl">{p.emoji}</span>
                  <p className="mt-2 font-semibold text-white">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
              <p className="text-sm text-blue-300">
                <Zap size={16} className="inline mr-1" />
                <strong className="text-white">Pro tip:</strong> Post at 8-11 PM for 2x more clicks. We handle the timing for you.
              </p>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 shadow-[0_0_60px_rgba(251,191,36,0.4)]">
              <Users size={48} className="text-black" />
            </div>
            <h1 className="mt-8 text-4xl font-extrabold text-white">
              Real People, <span className="text-emerald-400">Real Earnings</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              These are actual members earning money right now with G-Labs 95
            </p>
            <div className="mt-8 space-y-3 text-left">
              {socialProofNames.slice(0, 5).map((name, i) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl bg-white/5 p-4"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 text-sm font-bold text-black">
                      {name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-white">{name} just earned</p>
                      <p className="text-xs text-slate-400">{["Home Decor", "Skincare", "Baby Products", "Fashion", "Kitchen"][i]} • moments ago</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-emerald-400">{socialProofAmounts[i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-amber-400">
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
              <span className="ml-2 text-sm text-slate-400">4.9/5 from 2,847 members</span>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="text-center">
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 shadow-[0_0_80px_rgba(251,191,36,0.5)]">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber-400 to-emerald-500 opacity-30 animate-ping" />
              <Trophy size={56} className="text-black" />
            </div>
            <h1 className="mt-8 text-4xl font-extrabold text-white sm:text-5xl">
              You&apos;re <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">All Set!</span>
            </h1>
            <p className="mt-4 text-xl text-slate-300">
              Everything is ready. Time to create your first money-making image.
            </p>
            <div className="mx-auto mt-8 max-w-sm space-y-3 text-left">
              {[
                "AI Profit Machine ready",
                "Money Link system unlocked",
                "Cash Out channels available",
                "Social proof community access",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl bg-emerald-500/10 p-3">
                  <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                  <span className="font-medium text-white">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/image-forge"
              onClick={handleFinish}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 px-10 py-5 text-xl font-extrabold text-black shadow-[0_0_40px_rgba(251,191,36,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(251,191,36,0.5)]"
            >
              <Sparkles size={24} />
              Create My First Image
              <ArrowRight size={24} />
            </Link>
            <p className="mt-4 text-sm text-slate-500">Your income journey starts now</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-6">
        {step > 0 && step < totalSteps - 1 && (
          <button
            onClick={goBack}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        )}
        {step < totalSteps - 1 && (
          <button
            onClick={goNext}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3.5 font-bold text-black shadow-lg shadow-amber-500/30 transition-all hover:scale-105 hover:shadow-amber-500/40"
          >
            {step === 0 ? "Let's Go!" : "Continue"}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
