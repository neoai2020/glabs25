"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, usePathname } from "next/navigation";
import {
  ONBOARDING_DASHBOARD_ROUTE,
  ONBOARDING_META_KEY,
} from "@/config/onboarding-content";
import { resolveOnboardingGate } from "@/lib/onboarding-gate";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];
const ONBOARDING_ROUTE = "/onboarding";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const gateInFlightRef = useRef<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === "SIGNED_OUT") {
          router.push("/login");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    if (loading) return;

    const isPublicRoute = publicRoutes.includes(pathname);
    const isOnboardingRoute = pathname === ONBOARDING_ROUTE;

    if (!user) {
      if (!isPublicRoute) {
        router.push("/login");
      }
      return;
    }

    if (isPublicRoute) {
      router.push(ONBOARDING_DASHBOARD_ROUTE);
      return;
    }

    const gateKey = `${user.id}:${pathname}`;
    if (gateInFlightRef.current === gateKey) return;
    gateInFlightRef.current = gateKey;

    let cancelled = false;
    (async () => {
      const gate = await resolveOnboardingGate(
        supabase,
        user.id,
        user.user_metadata
      );
      if (cancelled) return;

      if (!gate.isComplete && !isOnboardingRoute) {
        router.replace(ONBOARDING_ROUTE);
      } else if (gate.isComplete && isOnboardingRoute) {
        router.replace(ONBOARDING_DASHBOARD_ROUTE);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, loading, pathname, router]);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { [ONBOARDING_META_KEY]: false },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.session) {
      setSession(data.session);
      setUser(data.user);
      router.push(ONBOARDING_ROUTE);
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
