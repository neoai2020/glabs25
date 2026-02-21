"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AcademyPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("glabs_needs_onboarding", "true");
    router.replace("/");
  }, [router]);

  return null;
}
