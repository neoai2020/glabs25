import type { SupabaseClient } from "@supabase/supabase-js";
import { ONBOARDING_META_KEY } from "@/config/onboarding-content";

const LEGACY_ACCOUNT_GRACE_DAYS = 14;

export type OnboardingGateResult = {
  ok: true;
  isComplete: boolean;
};

type AuthMetadata = Record<string, unknown> | null | undefined;

function readMetaFlag(meta: AuthMetadata): boolean | undefined {
  if (!meta || typeof meta !== "object") return undefined;
  const value = (meta as Record<string, unknown>)[ONBOARDING_META_KEY];
  if (typeof value === "boolean") return value;
  return undefined;
}

export async function resolveOnboardingGate(
  supabase: SupabaseClient,
  userId: string | null | undefined,
  authMeta: AuthMetadata
): Promise<OnboardingGateResult> {
  if (!userId) {
    return { ok: true, isComplete: false };
  }

  const metaFlag = readMetaFlag(authMeta);

  if (metaFlag === true) {
    return { ok: true, isComplete: true };
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("onboarding_completed_at")
      .eq("id", userId)
      .maybeSingle();

    if (!error && data) {
      const ts = (data as { onboarding_completed_at?: string | null })
        .onboarding_completed_at;
      return { ok: true, isComplete: ts != null };
    }

    if (!error && !data) {
      if (metaFlag === false) {
        return { ok: true, isComplete: false };
      }
    }
  } catch {
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, created_at")
      .eq("id", userId)
      .maybeSingle();

    if (!error && data && metaFlag === undefined) {
      const createdAt = (data as { created_at?: string | null }).created_at;
      if (createdAt) {
        const ageMs = Date.now() - new Date(createdAt).getTime();
        const cutoffMs = LEGACY_ACCOUNT_GRACE_DAYS * 24 * 60 * 60 * 1000;
        return { ok: true, isComplete: ageMs > cutoffMs };
      }
    }
  } catch {
  }

  return { ok: true, isComplete: false };
}
