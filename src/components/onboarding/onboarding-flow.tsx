"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Globe,
  Loader2,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import {
  ONBOARDING_BETA_QUALIFICATION_CTA_URL,
  ONBOARDING_DASHBOARD_ROUTE,
  ONBOARDING_META_KEY,
  ONBOARDING_PRODUCT_NAME,
  onboardingContent,
} from "@/config/onboarding-content";

const PAGE_BG = "#0A0A0F";

const CONFETTI_COLORS = [
  "#F87171",
  "#FBBF24",
  "#34D399",
  "#60A5FA",
  "#A78BFA",
  "#F472B6",
  "#FACC15",
  "#22D3EE",
];

const CONFETTI_PARTICLE_COUNT = 56;

type StepId = "preparing" | "beta-selected" | "qualification";

const STEP_ORDER: StepId[] = ["preparing", "beta-selected", "qualification"];

export function OnboardingFlow() {
  const [step, setStep] = useState<StepId>("preparing");
  const router = useRouter();
  const { user } = useAuth();
  const completingRef = useRef(false);

  const goToStep = useCallback((next: StepId) => {
    setStep(next);
  }, []);

  const completeOnboarding = useCallback(
    async ({ openClaimUrl }: { openClaimUrl: boolean }) => {
      if (completingRef.current) return;
      completingRef.current = true;

      if (
        openClaimUrl &&
        ONBOARDING_BETA_QUALIFICATION_CTA_URL &&
        typeof window !== "undefined"
      ) {
        try {
          window.open(
            ONBOARDING_BETA_QUALIFICATION_CTA_URL,
            "_blank",
            "noopener,noreferrer"
          );
        } catch {
        }
      }

      if (user?.id) {
        try {
          await supabase
            .from("users")
            .upsert(
              { id: user.id, onboarding_completed_at: new Date().toISOString() },
              { onConflict: "id" }
            );
        } catch {
        }

        try {
          const existing =
            (user.user_metadata as Record<string, unknown> | null | undefined) ??
            {};
          await supabase.auth.updateUser({
            data: { ...existing, [ONBOARDING_META_KEY]: true },
          });
        } catch {
        }
      }

      router.replace(ONBOARDING_DASHBOARD_ROUTE);
    },
    [router, user]
  );

  const stepIndex = STEP_ORDER.indexOf(step);

  return (
    <div
      className="fixed inset-0 z-[300] flex h-dvh max-h-dvh flex-col overflow-hidden text-slate-100"
      style={{ backgroundColor: PAGE_BG }}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome onboarding"
    >
      <BackgroundGlows />
      <ConfettiBackdrop />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-6 pt-5 md:px-8 md:pt-7">
        <BrandHeader />

        <StepProgress current={stepIndex} total={STEP_ORDER.length} />

        <div className="flex min-h-0 flex-1 flex-col">
          <AnimatePresence mode="wait">
            {step === "preparing" && (
              <motion.section
                key="preparing"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex min-h-0 flex-1 flex-col justify-center"
              >
                <PreparingStep onContinue={() => goToStep("beta-selected")} />
              </motion.section>
            )}

            {step === "beta-selected" && (
              <motion.section
                key="beta-selected"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex min-h-0 flex-1 flex-col justify-center"
              >
                <BetaSelectedStep onContinue={() => goToStep("qualification")} />
              </motion.section>
            )}

            {step === "qualification" && (
              <motion.section
                key="qualification"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex min-h-0 flex-1 flex-col justify-center"
              >
                <QualificationStep
                  onClaim={() => completeOnboarding({ openClaimUrl: true })}
                  onSkip={() => completeOnboarding({ openClaimUrl: false })}
                />
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default OnboardingFlow;

function BrandHeader() {
  return (
    <div className="mb-3 flex flex-col items-center gap-1.5 md:mb-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-500 shadow-[0_0_24px_rgba(251,191,36,0.25)]">
        <Zap className="h-6 w-6 text-black" aria-hidden />
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {ONBOARDING_PRODUCT_NAME}
      </p>
    </div>
  );
}

function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div
      className="mx-auto mb-3 flex items-center gap-1.5 md:mb-5"
      aria-label={`Step ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <span
            key={i}
            className={
              "h-1.5 rounded-full transition-all duration-300 " +
              (active
                ? "w-8 bg-indigo-400"
                : done
                  ? "w-2 bg-emerald-400"
                  : "w-2 bg-white/15")
            }
          />
        );
      })}
    </div>
  );
}

function BackgroundGlows() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(99,102,241,0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 100%, rgba(251,191,36,0.10), transparent 70%)",
        }}
      />
    </div>
  );
}

function ConfettiBackdrop() {
  const particles = useMemo(() => {
    return Array.from({ length: CONFETTI_PARTICLE_COUNT }).map((_, i) => {
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      const left = (i * 37) % 100;
      const topStart = -10 - ((i * 13) % 25);
      const topEnd = 100 + ((i * 17) % 25);
      const delay = ((i * 0.41) % 5).toFixed(2);
      const duration = (6 + ((i * 0.7) % 6)).toFixed(2);
      const rotateStart = (i * 23) % 360;
      const rotateEnd = rotateStart + 360 + ((i * 11) % 180);
      const shape = i % 3;

      let width = 6;
      let height = 12;
      let radius = 1;
      if (shape === 0) {
        width = 8;
        height = 4;
        radius = 1;
      } else if (shape === 1) {
        width = 4;
        height = 14;
        radius = 1;
      } else {
        width = 6;
        height = 6;
        radius = 999;
      }

      return {
        i,
        color,
        left,
        topStart,
        topEnd,
        delay: Number(delay),
        duration: Number(duration),
        rotateStart,
        rotateEnd,
        width,
        height,
        radius,
      };
    });
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {particles.map((p) => (
        <motion.span
          key={p.i}
          initial={{
            opacity: 0,
            y: `${p.topStart}vh`,
            rotate: p.rotateStart,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [`${p.topStart}vh`, `${p.topEnd}vh`],
            rotate: [p.rotateStart, p.rotateEnd],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.9, 1],
          }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            borderRadius: p.radius,
            boxShadow: `0 0 8px ${p.color}55`,
          }}
        />
      ))}
    </div>
  );
}

function PreparingStep({ onContinue }: { onContinue: () => void }) {
  const rows = onboardingContent.preparing.rows;
  const generationRef = useRef(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    generationRef.current += 1;
    const myGen = generationRef.current;

    const schedule = [500, 650, 800];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    let cumulative = 0;
    schedule.forEach((delay, idx) => {
      cumulative += delay;
      timeouts.push(
        setTimeout(() => {
          if (generationRef.current !== myGen) return;
          setCompletedCount(idx + 1);
        }, cumulative)
      );
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const allDone = completedCount >= rows.length;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 md:gap-4">
      <h1 className="text-center text-2xl font-extrabold tracking-tight text-white md:text-3xl lg:text-4xl">
        {onboardingContent.preparing.title}
      </h1>

      <ul className="flex flex-col gap-2.5 md:gap-3">
        {rows.map((row, idx) => {
          const done = idx < completedCount;
          return (
            <li
              key={row.label}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm md:gap-4 md:p-4"
            >
              <div
                className={
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full md:h-10 md:w-10 " +
                  (done
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-indigo-500/20 text-indigo-200")
                }
                aria-hidden
              >
                {done ? (
                  <Check className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin md:h-5 md:w-5" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white md:text-base">
                  {row.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-400 md:text-sm">
                  {row.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-500/10 p-3 text-amber-100 md:p-4">
        <Sparkles
          className="mt-0.5 h-4 w-4 shrink-0 fill-current text-amber-300 md:h-5 md:w-5"
          aria-hidden
        />
        <p className="text-xs leading-relaxed md:text-sm">
          <span className="font-bold text-amber-300">Tip:</span>{" "}
          {onboardingContent.preparing.tip}
        </p>
      </div>

      <IndigoButton
        onClick={onContinue}
        disabled={!allDone}
        ariaLabel={onboardingContent.preparing.continueCta}
      >
        {onboardingContent.preparing.continueCta}
      </IndigoButton>
    </div>
  );
}

export function BetaSelectedStep({ onContinue }: { onContinue: () => void }) {
  const { headline, subcopy, infoCard, payLabel, payAmount, cta } =
    onboardingContent.beta;
  const congrats = onboardingContent.congratulations;

  const flaggedPhrase = "your account was flagged";
  const headlineParts = headline.split(flaggedPhrase);
  const headlineHasSplit = headlineParts.length === 2;

  const panicPrefix = "Don't panic!";
  const panicHasSplit = infoCard.startsWith(panicPrefix);
  const panicRest = panicHasSplit ? infoCard.slice(panicPrefix.length) : "";

  const paySplit = payAmount.split("/");
  const payHasSplit = paySplit.length === 2;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 md:gap-4">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30 md:h-16 md:w-16"
        style={{ boxShadow: "0 0 30px rgba(251,191,36,0.25)" }}
        aria-hidden
      >
        <Sparkles className="h-6 w-6 fill-current md:h-7 md:w-7" />
      </div>

      <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400 md:text-sm">
        {congrats.badge}
      </p>

      <h1 className="text-center text-2xl font-extrabold tracking-tight text-white md:text-3xl lg:text-4xl">
        {congrats.headline}
      </h1>

      <div className="relative w-full rounded-2xl border border-amber-400/25 bg-amber-500/10 p-4 pt-6 text-center md:p-5 md:pt-7">
        <span
          className="absolute left-1/2 top-0 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber-500/30 text-amber-300 md:h-8 md:w-8"
          style={{ boxShadow: `0 0 0 4px ${PAGE_BG}` }}
          aria-hidden
        >
          <Star className="h-3.5 w-3.5 fill-current md:h-4 md:w-4" />
        </span>

        <p className="text-sm leading-relaxed text-amber-50 md:text-base">
          {headlineHasSplit ? (
            <>
              {headlineParts[0]}
              <span className="font-bold text-amber-300">{flaggedPhrase}</span>
              {headlineParts[1]}
            </>
          ) : (
            headline
          )}
        </p>
        <p className="mt-2 text-xs text-zinc-400 md:text-sm">{subcopy}</p>
      </div>

      <div className="flex w-full items-start gap-3 rounded-2xl border border-indigo-500/25 bg-indigo-500/10 p-3 md:p-4">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200 md:h-10 md:w-10"
          aria-hidden
        >
          <Shield className="h-4 w-4 md:h-5 md:w-5" />
        </span>
        <p className="text-xs leading-relaxed text-zinc-200 md:text-sm">
          {panicHasSplit ? (
            <>
              <span className="font-bold text-white">{panicPrefix}</span>
              {panicRest}
            </>
          ) : (
            infoCard
          )}
        </p>
      </div>

      <div className="w-full rounded-2xl border border-indigo-500/25 bg-indigo-500/15 p-4 text-center md:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-300 md:text-xs">
          {payLabel.replace(/:$/, "").toUpperCase()}
        </p>
        <p className="mt-1 text-3xl font-extrabold leading-none text-indigo-200 md:text-4xl lg:text-5xl">
          {payHasSplit ? (
            <>
              {paySplit[0]}
              <span className="text-base font-semibold text-indigo-300/80 md:text-lg">
                /{paySplit[1]}
              </span>
            </>
          ) : (
            payAmount
          )}
        </p>
      </div>

      <IndigoButton onClick={onContinue} ariaLabel={cta} className="w-full">
        {cta}
      </IndigoButton>
    </div>
  );
}

function QualificationStep({
  onClaim,
  onSkip,
}: {
  onClaim: () => void;
  onSkip: () => void;
}) {
  const q = onboardingContent.qualification;

  const requirementIcons = [Smartphone, Globe, CheckCircle2];

  const dashSplit = q.footer.split("—");
  const footerHasSplit = dashSplit.length === 2;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 md:gap-4">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200 ring-1 ring-emerald-400/25">
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-200"
          aria-hidden
        >
          <Check className="h-3 w-3" />
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.22em] md:text-xs">
          {q.badge.replace(/^✅\s*/, "")}
        </span>
      </div>

      <h1 className="text-center text-2xl font-extrabold tracking-tight text-white md:text-3xl lg:text-4xl">
        {q.headline}
      </h1>

      <ul className="flex w-full flex-col gap-2.5 md:gap-3">
        {q.requirements.map((label, idx) => {
          const Icon = requirementIcons[idx] ?? CheckCircle2;
          return (
            <li
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm md:gap-4 md:p-4"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300"
                aria-hidden
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-white md:text-base">
                {label}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="text-center text-xs text-zinc-300 md:text-sm">
        {footerHasSplit ? (
          <>
            {dashSplit[0]}
            <span className="text-zinc-500">—</span>
            <span className="font-bold text-white">{dashSplit[1]}</span>
          </>
        ) : (
          q.footer
        )}
      </p>

      <ClaimButton onClick={onClaim}>{q.primaryCta}</ClaimButton>

      <button
        type="button"
        onClick={onSkip}
        className="text-xs text-zinc-400 underline decoration-zinc-600 underline-offset-4 transition hover:text-zinc-200 md:text-sm"
      >
        {q.noThanksCta}
      </button>

      <p className="max-w-xl text-center text-[10px] leading-relaxed text-zinc-500 md:text-xs">
        {q.finePrint}
      </p>
    </div>
  );
}

export function IndigoButton({
  children,
  onClick,
  disabled,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const base =
    "w-full rounded-2xl py-3.5 text-sm font-semibold transition-colors md:py-4 md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]";
  const enabled =
    "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_10px_30px_rgba(99,102,241,0.45)]";
  const disabledStyles =
    "bg-zinc-800 text-zinc-500 shadow-none cursor-not-allowed";

  return (
    <motion.button
      type="button"
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? undefined : { scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      className={[base, disabled ? disabledStyles : enabled, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </motion.button>
  );
}

function ClaimButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="w-full rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 py-3.5 text-sm font-extrabold text-black shadow-[0_10px_30px_rgba(251,191,36,0.35)] transition-shadow hover:shadow-[0_14px_40px_rgba(251,191,36,0.55)] md:py-4 md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]"
    >
      {children}
    </motion.button>
  );
}
