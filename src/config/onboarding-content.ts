export const ONBOARDING_PRODUCT_NAME = "G-Labs 95";

export const ONBOARDING_BETA_QUALIFICATION_CTA_URL = "http://profloop.com/activate";

export const ONBOARDING_DASHBOARD_ROUTE = "/";

export const ONBOARDING_META_KEY = "onboarding_completed";

export const onboardingContent = {
  preparing: {
    title: "Setting up your workspace",
    rows: [
      {
        label: "Loading your AI Profit Machine & daily image quota",
        description: "Preparing the verified AI image presets you can use today.",
      },
      {
        label: "Connecting your Money Links & Launchpad",
        description: "Syncing image generation and your personal asset library.",
      },
      {
        label: "Unlocking Training, Support & Premium Features",
        description:
          "Academy, Live Help, Scheduler, and Premium Tools — when your plan includes them.",
      },
    ],
    tip: "Start with Image Forge first — it walks you from a niche to a money-ready image in minutes.",
    continueCta: "Continue",
  },
  congratulations: {
    badge: "🎉 CONGRATULATIONS!",
    headline: "You've Been Randomly Selected",
    continueCta: "Continue",
  },
  beta: {
    headline:
      "Out of thousands of new members today, your account was flagged for our private Beta Tester program.",
    subcopy: `This is a separate, optional opportunity — not part of ${ONBOARDING_PRODUCT_NAME}. But we highly recommend checking it out.`,
    infoCard:
      "Don't panic! This is a good thing. You've been chosen to test a brand-new system — and testers get paid.",
    payLabel: "Beta Tester Pay:",
    payAmount: "$500/day",
    cta: "See If You Qualify >",
  },
  qualification: {
    badge: "✅ QUALIFICATION CHECK",
    headline: "Do You Meet These Requirements?",
    requirements: [
      "A phone or a computer",
      "Speaks English",
      "No tech skills required",
    ],
    footer: "If you checked all three — you qualify!",
    primaryCta: "🎯 Claim My Beta Tester Spot >",
    noThanksCta: "No thanks, skip this optional offer →",
    finePrint: `This is an optional partner offer, separate from your ${ONBOARDING_PRODUCT_NAME} membership. Spots are limited.`,
  },
} as const;
