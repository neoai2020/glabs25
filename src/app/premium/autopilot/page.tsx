"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import {
  Zap,
  Globe,
  Clock,
  BarChart3,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Copy,
  ExternalLink,
  Search,
  Users,
  TrendingUp,
  Target,
  Flame,
} from "lucide-react";

type TrafficSource = {
  id: string;
  name: string;
  url: string;
  category: "Forum" | "Social" | "Q&A" | "Directory" | "Blog";
  niche: string;
  trafficPotential: string;
  timeToComplete: string;
  difficulty: "Easy" | "Medium";
  instructions: string[];
  description: string;
};

const TRAFFIC_SOURCES: TrafficSource[] = [
  // ── Weight Loss (10) ──
  {
    id: "wl-1",
    name: "MyFitnessPal Community",
    url: "https://community.myfitnesspal.com",
    category: "Forum",
    niche: "Weight Loss",
    trafficPotential: "200-500/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create a free account at community.myfitnesspal.com",
      "Complete your profile with a photo and bio about your fitness journey",
      "Go to Settings → Signature and add your affiliate link",
      "Navigate to the Success Stories forum and post your transformation story",
      "Your signature with the link will automatically show on all your posts",
    ],
    description:
      "I've been on an incredible weight loss journey and wanted to share what finally worked for me. After trying dozens of approaches, I found a system that made everything click. It completely changed my relationship with food and exercise. If you're curious, here's what I used: [YOUR_LINK] — Honestly it was a game-changer for me. Would love to hear about your journeys too!",
  },
  {
    id: "wl-2",
    name: "LoseIt Reddit",
    url: "https://reddit.com/r/loseit",
    category: "Social",
    niche: "Weight Loss",
    trafficPotential: "300-800/mo",
    timeToComplete: "5 min",
    difficulty: "Easy",
    instructions: [
      "Create a Reddit account or log in",
      "Join r/loseit and read the community rules carefully",
      "Write an authentic post sharing your weight loss success story",
      "Naturally mention the resource that helped you and include your link",
    ],
    description:
      "Hey everyone! Long-time lurker, first-time poster. I've lost significant weight over the past few months and wanted to share what worked. The biggest game changer was finding a structured system that kept me accountable. Here's the resource I used: [YOUR_LINK] — I know everyone's journey is different, but this really helped me stay on track. Happy to answer any questions!",
  },
  {
    id: "wl-3",
    name: "Weight Loss Facebook Groups",
    url: "https://facebook.com/groups",
    category: "Social",
    niche: "Weight Loss",
    trafficPotential: "250-700/mo",
    timeToComplete: "15 min",
    difficulty: "Easy",
    instructions: [
      "Search Facebook for 'weight loss support' or 'weight loss journey' groups",
      "Join 5-10 active groups with 10,000+ members each",
      "Read each group's rules before posting",
      "Share an authentic success story with before/after context",
      "Include your affiliate link naturally within the story",
    ],
    description:
      "Hi everyone! 👋 I've been on this journey for a while and finally found something that works. I struggled for years with yo-yo dieting until I discovered a step-by-step system that simplified everything. Here's what I've been using: [YOUR_LINK] — It's been a total game changer. Would love to connect with others on the same path!",
  },
  {
    id: "wl-4",
    name: "Quora Weight Loss",
    url: "https://quora.com/topic/Weight-Loss",
    category: "Q&A",
    niche: "Weight Loss",
    trafficPotential: "300-900/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create a Quora account with a complete profile",
      "Follow weight loss, dieting, and fitness topics",
      "Find 5-10 popular questions about weight loss with lots of followers",
      "Write detailed, helpful answers sharing your experience",
      "Include your affiliate link as a recommended resource in each answer",
    ],
    description:
      "Great question! I struggled with this exact issue for years. What finally worked for me was finding a comprehensive system that addressed both nutrition and mindset. Rather than just another diet, it was a complete lifestyle shift. Here's the resource that helped me the most: [YOUR_LINK] — I hope it helps you as much as it helped me!",
  },
  {
    id: "wl-5",
    name: "r/WeightLossAdvice",
    url: "https://reddit.com/r/WeightLossAdvice",
    category: "Social",
    niche: "Weight Loss",
    trafficPotential: "200-600/mo",
    timeToComplete: "6 min",
    difficulty: "Easy",
    instructions: [
      "Log in to Reddit and join r/WeightLossAdvice",
      "Browse recent posts asking for advice",
      "Reply with genuine, helpful advice from your experience",
      "Mention the system or resource that helped you and include your link",
    ],
    description:
      "I totally understand where you're coming from — I was in the same boat not long ago. What made the biggest difference for me was following a structured approach instead of guessing. This is the resource I found most helpful: [YOUR_LINK] — It breaks everything down step by step. Wishing you the best on your journey!",
  },
  {
    id: "wl-6",
    name: "SparkPeople Forums",
    url: "https://sparkpeople.com",
    category: "Forum",
    niche: "Weight Loss",
    trafficPotential: "150-400/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Register for a free SparkPeople account",
      "Complete your profile and set your fitness goals",
      "Browse the community forums and find relevant threads",
      "Post helpful advice and share your experience",
      "Include your affiliate link as a recommended resource",
    ],
    description:
      "Hey SparkPeople fam! I wanted to share something that really accelerated my weight loss journey. After hitting a plateau, I found a system that helped me break through and keep the weight off. Check it out here: [YOUR_LINK] — It pairs perfectly with tracking on SparkPeople. Let me know if you have questions!",
  },
  {
    id: "wl-7",
    name: "Calorie Count Forum",
    url: "https://caloriecount.com",
    category: "Forum",
    niche: "Weight Loss",
    trafficPotential: "120-350/mo",
    timeToComplete: "9 min",
    difficulty: "Easy",
    instructions: [
      "Create an account on Calorie Count",
      "Fill out your profile with your health goals",
      "Join active forum discussions about calorie tracking and dieting",
      "Share what has worked for you and mention your link",
      "Engage with replies to build trust in the community",
    ],
    description:
      "Calorie counting has been a huge part of my success, but the missing piece was having a full system to follow alongside it. This resource gave me the structure I needed: [YOUR_LINK] — Combining it with calorie tracking made everything so much easier. Happy to share more details if anyone's interested!",
  },
  {
    id: "wl-8",
    name: "Pinterest Weight Loss Boards",
    url: "https://pinterest.com",
    category: "Social",
    niche: "Weight Loss",
    trafficPotential: "400-1000/mo",
    timeToComplete: "12 min",
    difficulty: "Easy",
    instructions: [
      "Create or log in to your Pinterest account",
      "Create a board called 'Weight Loss Tips' or similar",
      "Design eye-catching pins with weight loss tips using Canva",
      "Link each pin directly to your affiliate link",
      "Pin consistently and join group boards for more reach",
    ],
    description:
      "🔥 The #1 weight loss tip nobody talks about! I lost weight without starving myself using this simple system. It changed everything for me. Click to learn more: [YOUR_LINK] #weightloss #fatloss #healthylifestyle #transformation",
  },
  {
    id: "wl-9",
    name: "Medium Weight Loss Articles",
    url: "https://medium.com",
    category: "Blog",
    niche: "Weight Loss",
    trafficPotential: "200-600/mo",
    timeToComplete: "20 min",
    difficulty: "Medium",
    instructions: [
      "Create a free Medium account",
      "Write a detailed article about your weight loss experience (800+ words)",
      "Include helpful tips and your personal story",
      "Add your affiliate link naturally within the article",
      "Submit to relevant Medium publications for more exposure",
      "Add relevant tags like 'Weight Loss', 'Health', 'Fitness'",
    ],
    description:
      "After years of failed diets and frustration, I finally discovered an approach that worked — and stuck. In this article, I'm sharing the exact system that helped me transform my health without extreme restriction. If you're ready to try something different, here's the resource: [YOUR_LINK] — I wish I'd found it sooner.",
  },
  {
    id: "wl-10",
    name: "Twitter/X Fitness Community",
    url: "https://x.com",
    category: "Social",
    niche: "Weight Loss",
    trafficPotential: "150-500/mo",
    timeToComplete: "8 min",
    difficulty: "Easy",
    instructions: [
      "Log in to your X/Twitter account",
      "Follow fitness and weight loss influencers and hashtags",
      "Tweet your weight loss tips and story regularly",
      "Include your affiliate link in a pinned tweet",
      "Engage with the community by replying to others' posts",
    ],
    description:
      "I spent years trying every diet out there. What finally worked wasn't a diet at all — it was a complete system. Here's what changed everything for me 👇 [YOUR_LINK] #weightloss #transformation #health",
  },

  // ── Make Money Online (10) ──
  {
    id: "mmo-1",
    name: "Warrior Forum",
    url: "https://warriorforum.com",
    category: "Forum",
    niche: "Make Money Online",
    trafficPotential: "300-800/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create a free Warrior Forum account",
      "Complete your profile and add your link to the signature",
      "Browse the main discussion and 'War Room' sections",
      "Post helpful replies sharing your income-earning experience",
      "Your signature link appears on every post you make",
    ],
    description:
      "Great thread! I've been making money online for a while now and the biggest lesson I learned is that you need a proven system. Guessing doesn't work. This is the platform that helped me get started and scale: [YOUR_LINK] — It covers everything from setup to daily income strategies. Highly recommend for beginners.",
  },
  {
    id: "mmo-2",
    name: "r/Entrepreneur",
    url: "https://reddit.com/r/Entrepreneur",
    category: "Social",
    niche: "Make Money Online",
    trafficPotential: "400-1000/mo",
    timeToComplete: "8 min",
    difficulty: "Easy",
    instructions: [
      "Log in to Reddit and join r/Entrepreneur",
      "Read the subreddit rules carefully",
      "Share a genuine post about a side income method that worked for you",
      "Include your link as the resource you used to get started",
    ],
    description:
      "Hey r/Entrepreneur! I wanted to share something that's been working well for me as a side income stream. I started with zero experience and now I'm earning consistently using an AI-powered system. Here's the platform I use: [YOUR_LINK] — Happy to answer questions about my experience with it.",
  },
  {
    id: "mmo-3",
    name: "BlackHatWorld",
    url: "https://blackhatworld.com",
    category: "Forum",
    niche: "Make Money Online",
    trafficPotential: "250-700/mo",
    timeToComplete: "12 min",
    difficulty: "Easy",
    instructions: [
      "Register for a BlackHatWorld account",
      "Add your affiliate link to your forum signature",
      "Post in the 'Making Money' and 'Affiliate Programs' sections",
      "Share methods and case studies that provide real value",
      "Engage with other members' threads for visibility",
    ],
    description:
      "Sharing a method that's been working well for me lately. I've been using an AI-powered income system that handles most of the heavy lifting. Not going to overhype it — just sharing what works. Check it out here: [YOUR_LINK] — Let me know if you want me to break down my results in more detail.",
  },
  {
    id: "mmo-4",
    name: "Digital Point Forum",
    url: "https://digitalpoint.com",
    category: "Forum",
    niche: "Make Money Online",
    trafficPotential: "200-600/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create an account on Digital Point Forums",
      "Set up your signature with your affiliate link",
      "Participate in discussions about online business and monetization",
      "Share your experience and results to build credibility",
      "Post consistently to keep your signature visible",
    ],
    description:
      "Hey everyone, been a member here for a bit and wanted to share what's been working for me income-wise. I found a platform that uses AI to streamline the whole process. Here's the link if you want to check it out: [YOUR_LINK] — Would love to hear what methods are working for others too.",
  },
  {
    id: "mmo-5",
    name: "Quora Make Money",
    url: "https://quora.com/topic/Making-Money",
    category: "Q&A",
    niche: "Make Money Online",
    trafficPotential: "350-900/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Log in to Quora and follow 'Making Money' topics",
      "Find popular questions about making money online",
      "Write thoughtful, experience-based answers",
      "Include your affiliate link as a recommended resource",
      "Answer at least 5-10 questions for best results",
    ],
    description:
      "I've tried a lot of methods to make money online, and most were either scams or too complicated. What finally worked was an AI-powered platform that simplifies the whole process. Here's what I use and recommend: [YOUR_LINK] — It's beginner-friendly and the results speak for themselves.",
  },
  {
    id: "mmo-6",
    name: "Facebook MMO Groups",
    url: "https://facebook.com/groups",
    category: "Social",
    niche: "Make Money Online",
    trafficPotential: "300-800/mo",
    timeToComplete: "15 min",
    difficulty: "Easy",
    instructions: [
      "Search Facebook for 'make money online' or 'side hustle' groups",
      "Join 5-10 active groups with large memberships",
      "Read each group's posting rules",
      "Share your income story or results with your affiliate link",
      "Engage with comments to boost your post visibility",
    ],
    description:
      "Hey everyone! Just wanted to share a win 🎉 I've been using an AI-powered income platform and it's been incredible. I was skeptical at first but the results have been real. If you're looking for a legitimate way to earn: [YOUR_LINK] — Lmk if you have any questions, happy to help!",
  },
  {
    id: "mmo-7",
    name: "Medium Side Hustle",
    url: "https://medium.com",
    category: "Blog",
    niche: "Make Money Online",
    trafficPotential: "200-500/mo",
    timeToComplete: "20 min",
    difficulty: "Medium",
    instructions: [
      "Create or log in to your Medium account",
      "Write a detailed article about side hustles or making money online",
      "Share your personal experience and results",
      "Include your affiliate link within the article",
      "Tag with 'Side Hustle', 'Making Money', 'Passive Income'",
      "Submit to publications like 'The Startup' or 'Better Marketing'",
    ],
    description:
      "In 2024, I went from scrolling TikTok all day to building a real side income — without a fancy degree or startup capital. The secret? I found an AI-powered platform that did most of the work for me. Here's exactly what I use: [YOUR_LINK] — In this article, I'll break down my complete experience step by step.",
  },
  {
    id: "mmo-8",
    name: "LinkedIn Articles",
    url: "https://linkedin.com",
    category: "Social",
    niche: "Make Money Online",
    trafficPotential: "250-700/mo",
    timeToComplete: "15 min",
    difficulty: "Medium",
    instructions: [
      "Log in to LinkedIn",
      "Click 'Write article' from your homepage",
      "Write a professional piece about alternative income streams",
      "Include your affiliate link as a resource recommendation",
      "Share the article to your network and relevant LinkedIn groups",
      "Engage with all comments to boost the algorithm",
    ],
    description:
      "The future of income is changing. AI is creating new opportunities for everyday people to earn from home. I've personally been exploring an AI-powered income platform that's delivered real results. For anyone exploring alternative income streams, here's what I recommend: [YOUR_LINK] — I'd love to hear your thoughts.",
  },
  {
    id: "mmo-9",
    name: "r/WorkOnline",
    url: "https://reddit.com/r/WorkOnline",
    category: "Social",
    niche: "Make Money Online",
    trafficPotential: "200-600/mo",
    timeToComplete: "6 min",
    difficulty: "Easy",
    instructions: [
      "Join r/WorkOnline on Reddit",
      "Read the community rules",
      "Share a post about a legitimate online income method",
      "Include your affiliate link as the platform you use",
    ],
    description:
      "Hey r/WorkOnline! I've been using an AI-powered platform to earn income from home and wanted to share my experience. It's legit and beginner-friendly — no technical skills needed. Here's the platform: [YOUR_LINK] — Happy to share more details about how I got started.",
  },
  {
    id: "mmo-10",
    name: "Twitter/X Hustle Community",
    url: "https://x.com",
    category: "Social",
    niche: "Make Money Online",
    trafficPotential: "150-500/mo",
    timeToComplete: "8 min",
    difficulty: "Easy",
    instructions: [
      "Log in to X/Twitter",
      "Follow hashtags like #SideHustle, #MakeMoneyOnline, #PassiveIncome",
      "Tweet about your income-earning experience regularly",
      "Pin a tweet with your affiliate link to the top of your profile",
      "Reply to popular money-making threads with your experience",
    ],
    description:
      "Most 'make money online' advice is garbage. Here's what actually works 👇 I've been using an AI-powered income platform and it's the real deal. No hype, just results. Try it yourself: [YOUR_LINK] #sidehustle #makemoneyonline #ai",
  },

  // ── Health & Fitness (10) ──
  {
    id: "hf-1",
    name: "Bodybuilding.com Forums",
    url: "https://forum.bodybuilding.com",
    category: "Forum",
    niche: "Health & Fitness",
    trafficPotential: "300-800/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create an account on Bodybuilding.com",
      "Set up your profile and add your link to your signature",
      "Post in relevant subforums like Supplements, Nutrition, or Workout Programs",
      "Share helpful advice based on your experience",
      "Your signature link shows on all posts automatically",
    ],
    description:
      "Great question! I've been training for years and the biggest game-changer for me was finding a system that combined proper nutrition with the right workout structure. Here's what I recommend for anyone looking to level up: [YOUR_LINK] — It covers everything from meal planning to progressive overload. Check it out!",
  },
  {
    id: "hf-2",
    name: "r/Fitness",
    url: "https://reddit.com/r/Fitness",
    category: "Social",
    niche: "Health & Fitness",
    trafficPotential: "400-1000/mo",
    timeToComplete: "8 min",
    difficulty: "Easy",
    instructions: [
      "Join r/Fitness on Reddit",
      "Read the community rules and wiki thoroughly",
      "Contribute helpful advice in comments and posts",
      "Share your fitness transformation with your link when relevant",
    ],
    description:
      "After years of inconsistent training, I finally found a system that helped me build a sustainable routine. The key was having a structured plan instead of winging it every day. Here's the resource that helped me most: [YOUR_LINK] — It's great for both beginners and intermediate lifters.",
  },
  {
    id: "hf-3",
    name: "Fitocracy",
    url: "https://fitocracy.com",
    category: "Social",
    niche: "Health & Fitness",
    trafficPotential: "150-400/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Sign up for a free Fitocracy account",
      "Complete your profile with your fitness story",
      "Join groups related to your fitness interests",
      "Share your workout achievements and tips",
      "Include your affiliate link in helpful posts",
    ],
    description:
      "Hey Fitocracy fam! Wanted to share a resource that's been awesome for my fitness journey. It's helped me structure my workouts and nutrition better than anything else I've tried. Check it out: [YOUR_LINK] — Pair it with Fitocracy tracking and you're unstoppable!",
  },
  {
    id: "hf-4",
    name: "Facebook Fitness Groups",
    url: "https://facebook.com/groups",
    category: "Social",
    niche: "Health & Fitness",
    trafficPotential: "250-700/mo",
    timeToComplete: "15 min",
    difficulty: "Easy",
    instructions: [
      "Search Facebook for fitness, gym, and workout groups",
      "Join 5-10 groups with 10K+ active members",
      "Read each group's rules before posting",
      "Share fitness tips and your personal results",
      "Include your affiliate link naturally in your posts",
    ],
    description:
      "Hey fitness family! 💪 Just wanted to share something that's been a game-changer for me. I found a complete health and fitness system that finally helped me stay consistent. Here it is: [YOUR_LINK] — If you're tired of programs that don't work, give this a try!",
  },
  {
    id: "hf-5",
    name: "Quora Health Topics",
    url: "https://quora.com/topic/Health",
    category: "Q&A",
    niche: "Health & Fitness",
    trafficPotential: "300-800/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Follow health and fitness topics on Quora",
      "Find popular questions about health, exercise, and nutrition",
      "Write detailed, helpful answers based on experience",
      "Include your affiliate link as a recommended resource",
      "Answer at least 5-10 questions for maximum reach",
    ],
    description:
      "This is a great question and one I spent years figuring out. The most impactful change I made was following a structured health system instead of random advice from the internet. Here's what I recommend: [YOUR_LINK] — It covers nutrition, exercise, and overall wellness in one place.",
  },
  {
    id: "hf-6",
    name: "T-Nation Forums",
    url: "https://t-nation.com",
    category: "Forum",
    niche: "Health & Fitness",
    trafficPotential: "200-600/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create a T-Nation account",
      "Browse the forums and find relevant discussions",
      "Post knowledgeable replies about training and nutrition",
      "Share your link when recommending resources",
      "Build credibility by being consistent and helpful",
    ],
    description:
      "Solid discussion! I've been lifting for years and recently found a system that took my training and nutrition to the next level. It's well-structured and backed by solid principles. Worth checking out: [YOUR_LINK] — Especially useful if you've hit a plateau.",
  },
  {
    id: "hf-7",
    name: "Pinterest Health Boards",
    url: "https://pinterest.com",
    category: "Social",
    niche: "Health & Fitness",
    trafficPotential: "350-900/mo",
    timeToComplete: "12 min",
    difficulty: "Easy",
    instructions: [
      "Log in to Pinterest and create a 'Health & Fitness Tips' board",
      "Design attractive pins with health tips using Canva",
      "Link each pin to your affiliate link",
      "Pin 5-10 pins and join group boards for more reach",
      "Stay consistent — Pinterest rewards frequent pinning",
    ],
    description:
      "💪 The simple health hack that changed everything for me! No extreme diets, no 2-hour gym sessions. Just a smart, structured system. Click to learn more: [YOUR_LINK] #fitness #health #wellness #workout #healthylifestyle",
  },
  {
    id: "hf-8",
    name: "Medium Wellness",
    url: "https://medium.com",
    category: "Blog",
    niche: "Health & Fitness",
    trafficPotential: "200-500/mo",
    timeToComplete: "20 min",
    difficulty: "Medium",
    instructions: [
      "Log in to Medium",
      "Write a wellness-focused article (800+ words)",
      "Share personal health transformation or tips",
      "Include your affiliate link within the content",
      "Tag with 'Health', 'Fitness', 'Wellness', 'Self Improvement'",
      "Submit to health-related Medium publications",
    ],
    description:
      "Health isn't just about the gym — it's about building a lifestyle. In this article, I'm sharing the complete system that helped me transform my health from the inside out. Here's the resource I swear by: [YOUR_LINK] — If you're serious about making a lasting change, this is a great place to start.",
  },
  {
    id: "hf-9",
    name: "r/HealthyFood",
    url: "https://reddit.com/r/HealthyFood",
    category: "Social",
    niche: "Health & Fitness",
    trafficPotential: "150-500/mo",
    timeToComplete: "6 min",
    difficulty: "Easy",
    instructions: [
      "Join r/HealthyFood on Reddit",
      "Share meal ideas, nutrition tips, or food prep strategies",
      "Mention helpful resources you've used in your health journey",
      "Include your link naturally in the conversation",
    ],
    description:
      "Healthy eating doesn't have to be complicated! I've been following a system that makes meal planning and nutrition super simple. Here's the resource that helped me: [YOUR_LINK] — It takes the guesswork out of eating well. Highly recommend!",
  },
  {
    id: "hf-10",
    name: "Instagram Fitness",
    url: "https://instagram.com",
    category: "Social",
    niche: "Health & Fitness",
    trafficPotential: "300-800/mo",
    timeToComplete: "15 min",
    difficulty: "Medium",
    instructions: [
      "Set up or optimize your Instagram profile for fitness content",
      "Add your affiliate link in your bio",
      "Post workout tips, meal prep ideas, or transformation photos",
      "Use relevant hashtags like #fitness #health #workout",
      "Direct followers to the link in your bio",
      "Engage with fitness community through comments and stories",
    ],
    description:
      "The system that changed my health game 👇 No fad diets. No crazy workouts. Just a smart, simple approach that actually works. Link in bio to learn more! [YOUR_LINK] #fitness #healthjourney #transformation",
  },

  // ── Beauty & Skincare (10) ──
  {
    id: "bs-1",
    name: "MakeupAlley",
    url: "https://makeupalley.com",
    category: "Forum",
    niche: "Beauty & Skincare",
    trafficPotential: "200-500/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create a MakeupAlley account",
      "Complete your beauty profile",
      "Browse the forums and product review sections",
      "Post helpful reviews and skincare advice",
      "Include your affiliate link when recommending products or routines",
    ],
    description:
      "I've tried SO many skincare products and routines over the years, and I finally found a system that simplified everything. My skin has never looked better! Here's what I've been using: [YOUR_LINK] — It takes the guesswork out of skincare. Would love to hear what works for you too!",
  },
  {
    id: "bs-2",
    name: "r/SkincareAddiction",
    url: "https://reddit.com/r/SkincareAddiction",
    category: "Social",
    niche: "Beauty & Skincare",
    trafficPotential: "400-1000/mo",
    timeToComplete: "8 min",
    difficulty: "Easy",
    instructions: [
      "Join r/SkincareAddiction on Reddit",
      "Read the subreddit rules and wiki",
      "Share your skincare routine or results in a post",
      "Include your affiliate link when recommending the resource that helped you",
    ],
    description:
      "After years of acne and trial-and-error, I found a skincare system that actually works with my skin instead of against it. Sharing my routine and the resource that helped me figure it out: [YOUR_LINK] — My skin has done a complete 180. Happy to share more details!",
  },
  {
    id: "bs-3",
    name: "Facebook Beauty Groups",
    url: "https://facebook.com/groups",
    category: "Social",
    niche: "Beauty & Skincare",
    trafficPotential: "250-700/mo",
    timeToComplete: "15 min",
    difficulty: "Easy",
    instructions: [
      "Search Facebook for beauty, skincare, and makeup groups",
      "Join 5-10 active groups with large memberships",
      "Read group rules before posting",
      "Share skincare tips, product recommendations, or routines",
      "Include your affiliate link naturally in your post",
    ],
    description:
      "Hey beauties! ✨ I just had to share this because it's been such a game-changer for my skin. I found a complete skincare system that simplified my routine and gave me amazing results. Check it out here: [YOUR_LINK] — Your skin will thank you!",
  },
  {
    id: "bs-4",
    name: "Pinterest Beauty Boards",
    url: "https://pinterest.com",
    category: "Social",
    niche: "Beauty & Skincare",
    trafficPotential: "400-1000/mo",
    timeToComplete: "12 min",
    difficulty: "Easy",
    instructions: [
      "Log in to Pinterest and create a 'Beauty & Skincare Tips' board",
      "Design beautiful pins with skincare tips using Canva",
      "Link each pin to your affiliate link",
      "Join beauty and skincare group boards",
      "Pin consistently for maximum reach",
    ],
    description:
      "✨ The skincare secret that transformed my skin! No expensive products, no complicated routines. Just a simple system that works. Click to discover: [YOUR_LINK] #skincare #beauty #glowup #skincareroutine",
  },
  {
    id: "bs-5",
    name: "Quora Beauty Topics",
    url: "https://quora.com/topic/Beauty",
    category: "Q&A",
    niche: "Beauty & Skincare",
    trafficPotential: "250-700/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Follow beauty and skincare topics on Quora",
      "Find popular questions about skincare routines and beauty tips",
      "Write detailed, helpful answers based on personal experience",
      "Include your affiliate link as a recommended resource",
      "Answer 5-10 questions for best results",
    ],
    description:
      "Great question! I dealt with the same issue and spent a fortune trying different products. What finally worked was following a complete skincare system instead of random tips. Here's what I recommend: [YOUR_LINK] — It addresses this exact concern and more.",
  },
  {
    id: "bs-6",
    name: "r/MakeupAddiction",
    url: "https://reddit.com/r/MakeupAddiction",
    category: "Social",
    niche: "Beauty & Skincare",
    trafficPotential: "300-800/mo",
    timeToComplete: "8 min",
    difficulty: "Easy",
    instructions: [
      "Join r/MakeupAddiction on Reddit",
      "Read the subreddit rules",
      "Share a look or routine and include product recommendations",
      "Mention helpful beauty resources with your link",
    ],
    description:
      "Hey everyone! I've been on a major beauty journey and wanted to share the resource that helped me the most. It's a complete system that covers skincare and beauty from A to Z. Here it is: [YOUR_LINK] — It totally changed my approach. Would love to see your routines too!",
  },
  {
    id: "bs-7",
    name: "Beauty Insider Community",
    url: "https://sephora.com",
    category: "Forum",
    niche: "Beauty & Skincare",
    trafficPotential: "200-600/mo",
    timeToComplete: "12 min",
    difficulty: "Easy",
    instructions: [
      "Sign up for a Sephora Beauty Insider account",
      "Join the Beauty Insider Community forums",
      "Post in skincare and beauty discussion threads",
      "Share your routine and recommend resources",
      "Include your affiliate link in helpful posts",
    ],
    description:
      "Sephora fam, I have to share this! I found a system that completely simplified my skincare routine and my skin has never been better. Here's the resource: [YOUR_LINK] — It's perfect for anyone who's overwhelmed by all the product choices out there.",
  },
  {
    id: "bs-8",
    name: "Medium Beauty",
    url: "https://medium.com",
    category: "Blog",
    niche: "Beauty & Skincare",
    trafficPotential: "150-400/mo",
    timeToComplete: "20 min",
    difficulty: "Medium",
    instructions: [
      "Log in to Medium",
      "Write a detailed beauty or skincare article (800+ words)",
      "Share your personal skincare journey and results",
      "Include your affiliate link naturally in the content",
      "Tag with 'Beauty', 'Skincare', 'Self Care'",
      "Submit to beauty-related Medium publications",
    ],
    description:
      "I spent years (and thousands of dollars) trying to find the perfect skincare routine. In this article, I'm sharing the system that finally gave me clear, glowing skin — without breaking the bank. Here's the resource: [YOUR_LINK] — I hope it helps you skip all the trial and error I went through.",
  },
  {
    id: "bs-9",
    name: "Instagram Beauty",
    url: "https://instagram.com",
    category: "Social",
    niche: "Beauty & Skincare",
    trafficPotential: "350-900/mo",
    timeToComplete: "15 min",
    difficulty: "Medium",
    instructions: [
      "Optimize your Instagram profile for beauty content",
      "Add your affiliate link in your bio",
      "Post skincare routines, product reviews, or before/after photos",
      "Use hashtags like #skincare #beauty #glowup #skincareroutine",
      "Direct followers to the link in your bio",
      "Engage with the beauty community through comments and stories",
    ],
    description:
      "The skincare routine that changed EVERYTHING for me 👇 No more guessing what products to use. Just clear, glowing skin. Link in bio! [YOUR_LINK] #skincare #beauty #glowup #skincarejourney",
  },
  {
    id: "bs-10",
    name: "TikTok Beauty",
    url: "https://tiktok.com",
    category: "Social",
    niche: "Beauty & Skincare",
    trafficPotential: "400-1000/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create or log in to your TikTok account",
      "Add your affiliate link in your bio",
      "Create short beauty tip or skincare routine videos",
      "Use trending sounds and beauty hashtags",
      "Direct viewers to the link in your bio",
    ],
    description:
      "POV: You finally found the skincare system that actually works ✨ Link in bio for the exact resource I used! [YOUR_LINK] #skincare #beautytok #glowup #skincareRoutine",
  },

  // ── Pets (10) ──
  {
    id: "pet-1",
    name: "DogForum",
    url: "https://dogforum.com",
    category: "Forum",
    niche: "Pets",
    trafficPotential: "150-400/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create a DogForum account",
      "Complete your profile with info about your dog(s)",
      "Browse forums related to dog training, health, or nutrition",
      "Post helpful advice and share your experience",
      "Include your affiliate link when recommending resources",
    ],
    description:
      "Great thread! As a lifelong dog owner, I know how overwhelming it can be to find the right products and advice. I found a resource that covers pretty much everything — training, nutrition, health tips. Check it out: [YOUR_LINK] — My dog and I have both benefited from it!",
  },
  {
    id: "pet-2",
    name: "r/Dogs",
    url: "https://reddit.com/r/dogs",
    category: "Social",
    niche: "Pets",
    trafficPotential: "300-800/mo",
    timeToComplete: "8 min",
    difficulty: "Easy",
    instructions: [
      "Join r/dogs on Reddit",
      "Read the community rules",
      "Share helpful posts about dog care, training, or product reviews",
      "Include your affiliate link when recommending resources",
    ],
    description:
      "Hey fellow dog lovers! I wanted to share a resource that's been super helpful for my pup. It covers everything from training tips to health and nutrition. Here's the link: [YOUR_LINK] — It's been great for both new and experienced dog owners. Would love to hear what resources you all use!",
  },
  {
    id: "pet-3",
    name: "CatForum",
    url: "https://catforum.com",
    category: "Forum",
    niche: "Pets",
    trafficPotential: "120-350/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Register for a CatForum account",
      "Set up your profile with info about your cat(s)",
      "Browse discussions about cat health, behavior, and nutrition",
      "Share advice and recommendations in relevant threads",
      "Include your affiliate link when suggesting resources",
    ],
    description:
      "Cat parent here! 🐱 I've been using this amazing resource for all things cat care — nutrition, behavior, health tips. It's been a lifesaver. Check it out: [YOUR_LINK] — Would definitely recommend for any cat owner looking for reliable information.",
  },
  {
    id: "pet-4",
    name: "Facebook Pet Groups",
    url: "https://facebook.com/groups",
    category: "Social",
    niche: "Pets",
    trafficPotential: "250-700/mo",
    timeToComplete: "15 min",
    difficulty: "Easy",
    instructions: [
      "Search Facebook for pet, dog, and cat groups",
      "Join 5-10 active groups with 10K+ members",
      "Read each group's posting rules",
      "Share pet care tips and cute stories about your pets",
      "Include your affiliate link when recommending resources",
    ],
    description:
      "Hey pet parents! 🐾 Just had to share this resource that's been amazing for my fur babies. It covers everything from nutrition to training to health tips. Here it is: [YOUR_LINK] — My pets have never been happier or healthier! Anyone else tried something similar?",
  },
  {
    id: "pet-5",
    name: "Quora Pets",
    url: "https://quora.com/topic/Pets",
    category: "Q&A",
    niche: "Pets",
    trafficPotential: "200-600/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Follow pet-related topics on Quora",
      "Find popular questions about pet care and health",
      "Write detailed, helpful answers based on your experience",
      "Include your affiliate link as a recommended resource",
      "Answer 5-10 questions for maximum reach",
    ],
    description:
      "Great question! As a pet owner who's dealt with this exact issue, I found a really helpful resource that covers pet health and care in depth. Here's what I recommend: [YOUR_LINK] — It addresses this question perfectly and has tons of other useful information.",
  },
  {
    id: "pet-6",
    name: "r/Cats",
    url: "https://reddit.com/r/cats",
    category: "Social",
    niche: "Pets",
    trafficPotential: "250-700/mo",
    timeToComplete: "6 min",
    difficulty: "Easy",
    instructions: [
      "Join r/cats on Reddit",
      "Share cute cat photos and stories",
      "Comment helpfully on other posts about cat care",
      "Include your link when recommending resources in comments",
    ],
    description:
      "My cat has been thriving since I found this amazing pet care resource! It has everything from nutrition guides to behavioral tips. Here's the link: [YOUR_LINK] — If you're a cat parent, you'll love it. Happy to share more about my experience!",
  },
  {
    id: "pet-7",
    name: "Pinterest Pet Boards",
    url: "https://pinterest.com",
    category: "Social",
    niche: "Pets",
    trafficPotential: "300-800/mo",
    timeToComplete: "12 min",
    difficulty: "Easy",
    instructions: [
      "Create a 'Pet Care Tips' board on Pinterest",
      "Design cute, eye-catching pins with pet tips using Canva",
      "Link each pin to your affiliate link",
      "Join pet-related group boards",
      "Pin consistently for growing reach",
    ],
    description:
      "🐾 The pet care secret every owner needs to know! Keep your furry friend happy and healthy with this amazing resource. Click to learn more: [YOUR_LINK] #pets #dogs #cats #petcare #petlovers",
  },
  {
    id: "pet-8",
    name: "PetForums",
    url: "https://petforums.co.uk",
    category: "Forum",
    niche: "Pets",
    trafficPotential: "150-400/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create an account on PetForums.co.uk",
      "Complete your profile with info about your pets",
      "Browse and participate in relevant discussions",
      "Share advice and pet care tips",
      "Include your affiliate link when recommending resources",
    ],
    description:
      "Fellow pet owners! I've been using this incredible resource for pet care and it's been wonderful. Covers nutrition, training, health — everything. Here it is: [YOUR_LINK] — Highly recommend for anyone who wants the best for their pets.",
  },
  {
    id: "pet-9",
    name: "Medium Pets",
    url: "https://medium.com",
    category: "Blog",
    niche: "Pets",
    trafficPotential: "100-300/mo",
    timeToComplete: "20 min",
    difficulty: "Medium",
    instructions: [
      "Log in to Medium",
      "Write a heartfelt article about pet ownership (800+ words)",
      "Share tips, stories, or product recommendations",
      "Include your affiliate link within the content",
      "Tag with 'Pets', 'Dogs', 'Cats', 'Pet Care'",
      "Submit to pet-related Medium publications",
    ],
    description:
      "Being a pet owner is one of life's greatest joys — but it can also be overwhelming. In this article, I'm sharing the resource that made pet ownership so much easier for me. Everything from nutrition to behavior in one place: [YOUR_LINK] — I hope it helps you and your furry friend!",
  },
  {
    id: "pet-10",
    name: "Instagram Pets",
    url: "https://instagram.com",
    category: "Social",
    niche: "Pets",
    trafficPotential: "300-800/mo",
    timeToComplete: "15 min",
    difficulty: "Medium",
    instructions: [
      "Create or optimize your Instagram for pet content",
      "Add your affiliate link in your bio",
      "Post cute pet photos and care tips regularly",
      "Use hashtags like #pets #dogsofinstagram #catsofinstagram",
      "Direct followers to the link in your bio",
      "Engage with the pet community through comments and stories",
    ],
    description:
      "The resource that made me a better pet parent 🐾 Happy pet, happy life! Link in bio for the full details. [YOUR_LINK] #pets #petcare #dogsofinstagram #catsofinstagram",
  },

  // ── Home & Garden (10) ──
  {
    id: "hg-1",
    name: "GardenWeb Forums",
    url: "https://houzz.com/discussions",
    category: "Forum",
    niche: "Home & Garden",
    trafficPotential: "200-500/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create a Houzz account (GardenWeb is now part of Houzz)",
      "Complete your profile and browse the discussion forums",
      "Post in gardening, landscaping, or home improvement threads",
      "Share helpful tips and your personal experience",
      "Include your affiliate link when recommending resources",
    ],
    description:
      "Great discussion! I've been doing home improvement and gardening for years, and the best resource I've found is this: [YOUR_LINK] — It covers everything from garden planning to DIY home projects. Saved me tons of time and money. Highly recommend!",
  },
  {
    id: "hg-2",
    name: "r/HomeImprovement",
    url: "https://reddit.com/r/HomeImprovement",
    category: "Social",
    niche: "Home & Garden",
    trafficPotential: "300-800/mo",
    timeToComplete: "8 min",
    difficulty: "Easy",
    instructions: [
      "Join r/HomeImprovement on Reddit",
      "Read the community rules",
      "Share helpful advice on home improvement questions",
      "Post about your own projects and include helpful resources",
      "Include your link when recommending tools or guides",
    ],
    description:
      "Hey r/HomeImprovement! I tackled a similar project recently and wanted to share a resource that helped me a lot. It has step-by-step guides for all kinds of home projects: [YOUR_LINK] — Saved me from a lot of expensive mistakes. Hope it helps!",
  },
  {
    id: "hg-3",
    name: "Facebook Home Groups",
    url: "https://facebook.com/groups",
    category: "Social",
    niche: "Home & Garden",
    trafficPotential: "250-700/mo",
    timeToComplete: "15 min",
    difficulty: "Easy",
    instructions: [
      "Search Facebook for home improvement and gardening groups",
      "Join 5-10 active groups with 10K+ members",
      "Read group rules before posting",
      "Share before/after photos and helpful DIY tips",
      "Include your affiliate link when recommending resources",
    ],
    description:
      "Hey home enthusiasts! 🏡 Just finished a big project and had to share the resource that made it possible. It has guides for everything from basic repairs to full renovations. Check it out: [YOUR_LINK] — It's been my go-to for every project!",
  },
  {
    id: "hg-4",
    name: "Pinterest Home Boards",
    url: "https://pinterest.com",
    category: "Social",
    niche: "Home & Garden",
    trafficPotential: "400-1000/mo",
    timeToComplete: "12 min",
    difficulty: "Easy",
    instructions: [
      "Create a 'Home & Garden Ideas' board on Pinterest",
      "Design attractive pins with home and garden tips using Canva",
      "Link each pin to your affiliate link",
      "Join home improvement and gardening group boards",
      "Pin consistently for maximum reach",
    ],
    description:
      "🏡 Transform your home without breaking the bank! Amazing DIY tips and home improvement guides all in one place. Click to discover: [YOUR_LINK] #homeimprovement #diy #gardening #homedecor #interiordesign",
  },
  {
    id: "hg-5",
    name: "Quora Home Topics",
    url: "https://quora.com/topic/Home-Improvement",
    category: "Q&A",
    niche: "Home & Garden",
    trafficPotential: "250-700/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Follow home improvement and gardening topics on Quora",
      "Find popular questions about DIY, renovation, and gardening",
      "Write detailed, experience-based answers",
      "Include your affiliate link as a recommended resource",
      "Answer 5-10 questions for maximum visibility",
    ],
    description:
      "I dealt with this exact same issue in my home! What helped me the most was finding a comprehensive resource that walks you through everything step by step. Here's what I recommend: [YOUR_LINK] — It covers this topic in detail and has saved me a lot of headaches.",
  },
  {
    id: "hg-6",
    name: "r/Gardening",
    url: "https://reddit.com/r/gardening",
    category: "Social",
    niche: "Home & Garden",
    trafficPotential: "200-600/mo",
    timeToComplete: "6 min",
    difficulty: "Easy",
    instructions: [
      "Join r/gardening on Reddit",
      "Share your garden progress photos and tips",
      "Comment helpfully on posts asking for gardening advice",
      "Include your link when recommending helpful resources",
    ],
    description:
      "Fellow gardeners! I found an incredible resource that covers everything from soil prep to pest control to seasonal planting guides. Here's the link: [YOUR_LINK] — My garden has never looked better since I started using it. Happy growing!",
  },
  {
    id: "hg-7",
    name: "DIY Chatroom",
    url: "https://diychatroom.com",
    category: "Forum",
    niche: "Home & Garden",
    trafficPotential: "150-400/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create a DIY Chatroom account",
      "Browse the forums for relevant home improvement discussions",
      "Post helpful replies and share your DIY experience",
      "Include your affiliate link when recommending resources or guides",
      "Add your link to your forum signature for ongoing visibility",
    ],
    description:
      "Solid project! I tackled something similar and the biggest help was having a comprehensive guide resource. This one covers pretty much every DIY topic: [YOUR_LINK] — Step-by-step instructions that even beginners can follow. Highly recommend checking it out!",
  },
  {
    id: "hg-8",
    name: "Medium Home & Garden",
    url: "https://medium.com",
    category: "Blog",
    niche: "Home & Garden",
    trafficPotential: "150-400/mo",
    timeToComplete: "20 min",
    difficulty: "Medium",
    instructions: [
      "Log in to Medium",
      "Write a home improvement or gardening article (800+ words)",
      "Share your project story, tips, and lessons learned",
      "Include your affiliate link within the content",
      "Tag with 'Home Improvement', 'DIY', 'Gardening', 'Home Decor'",
      "Submit to relevant Medium publications",
    ],
    description:
      "I went from knowing nothing about home improvement to confidently tackling projects myself — all thanks to one resource. In this article, I'm sharing my journey and the guide that made it all possible: [YOUR_LINK] — Whether you're a beginner or experienced, there's something here for you.",
  },
  {
    id: "hg-9",
    name: "Instagram Home Decor",
    url: "https://instagram.com",
    category: "Social",
    niche: "Home & Garden",
    trafficPotential: "350-900/mo",
    timeToComplete: "15 min",
    difficulty: "Medium",
    instructions: [
      "Create or optimize your Instagram for home content",
      "Add your affiliate link in your bio",
      "Post home decor inspiration, DIY projects, and garden photos",
      "Use hashtags like #homedecor #diy #gardening #homedesign",
      "Direct followers to the link in your bio",
      "Engage with the home and garden community",
    ],
    description:
      "How I transformed my home on a budget 🏡 DIY tips and tricks that anyone can do! Link in bio for the full guide. [YOUR_LINK] #homedecor #diy #homeimprovement #gardening",
  },
  {
    id: "hg-10",
    name: "TikTok Home",
    url: "https://tiktok.com",
    category: "Social",
    niche: "Home & Garden",
    trafficPotential: "350-900/mo",
    timeToComplete: "10 min",
    difficulty: "Easy",
    instructions: [
      "Create or log in to your TikTok account",
      "Add your affiliate link in your bio",
      "Create short DIY tip or home transformation videos",
      "Use trending sounds and home improvement hashtags",
      "Direct viewers to the link in your bio",
    ],
    description:
      "POV: You just discovered the easiest way to transform your home 🏡✨ Link in bio! [YOUR_LINK] #homeimprovement #diytok #homedecor #gardentok #beforeandafter",
  },
];

const NICHES = [
  "All",
  "Weight Loss",
  "Make Money Online",
  "Health & Fitness",
  "Beauty & Skincare",
  "Pets",
  "Home & Garden",
];

const NICHE_ICONS: Record<string, React.ReactNode> = {
  "Weight Loss": <Flame className="h-4 w-4" />,
  "Make Money Online": <TrendingUp className="h-4 w-4" />,
  "Health & Fitness": <Zap className="h-4 w-4" />,
  "Beauty & Skincare": <Target className="h-4 w-4" />,
  Pets: <Users className="h-4 w-4" />,
  "Home & Garden": <Globe className="h-4 w-4" />,
};

const CATEGORY_TONE: Record<string, "default" | "success" | "warning" | "info" | "gold"> = {
  Forum: "warning",
  Social: "info",
  "Q&A": "success",
  Directory: "gold",
  Blog: "default",
};

export default function AutopilotPage() {
  const [affiliateLink, setAffiliateLink] = useState("");
  const [activeNiche, setActiveNiche] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered =
    activeNiche === "All"
      ? TRAFFIC_SOURCES
      : TRAFFIC_SOURCES.filter((s) => s.niche === activeNiche);

  const completedCount = completed.size;

  function toggleComplete(id: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function getDescription(source: TrafficSource) {
    const link = affiliateLink.trim() || "[YOUR_LINK]";
    return source.description.replace("[YOUR_LINK]", link);
  }

  async function copyDescription(source: TrafficSource) {
    const text = getDescription(source);
    await navigator.clipboard.writeText(text);
    setCopiedId(source.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <AppShell
      title="Autopilot Traffic Machine"
      subtitle="Post once. Get traffic forever. 60 free traffic sources with step-by-step instructions."
    >
      {/* ── Hero Stats ── */}
      <div className="glass-gold rounded-2xl p-6 md:p-8">
        <div className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              <Zap className="mr-2 inline h-7 w-7 text-amber-400" />
              Your Traffic Autopilot
            </h2>
            <p className="mt-2 text-lg text-slate-300">
              Post your link to these 60 sources and watch visitors flow in — forever.
            </p>
          </div>
          <Badge tone="gold" size="md" pulse>
            {completedCount} of 60 completed
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-amber-400">60</p>
            <p className="text-sm text-slate-400">Free Traffic Sources</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-emerald-400">6</p>
            <p className="text-sm text-slate-400">Profitable Niches</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-amber-400">200–1,000</p>
            <p className="text-sm text-slate-400">Visitors/mo Per Source</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2 text-center text-sm text-emerald-400">
          <Users className="h-4 w-4" />
          Members submitted to <span className="font-bold">847K+</span> traffic sources this month
        </div>
      </div>

      {/* ── How It Works ── */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h3 className="mb-6 text-xl font-bold text-white">How It Works — 3 Simple Steps</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-2xl font-bold text-amber-400">
              1
            </div>
            <h4 className="mb-2 text-lg font-semibold text-white">Choose a Source</h4>
            <p className="text-sm text-slate-400">
              Pick any of the 60 traffic sources below. Start with easy ones first.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-2xl font-bold text-amber-400">
              2
            </div>
            <h4 className="mb-2 text-lg font-semibold text-white">Follow the Steps</h4>
            <p className="text-sm text-slate-400">
              Each source has numbered instructions. Just follow them one by one.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-2xl font-bold text-emerald-400">
              3
            </div>
            <h4 className="mb-2 text-lg font-semibold text-white">Paste Your Link</h4>
            <p className="text-sm text-slate-400">
              Copy the pre-written description and post it. Your link is included automatically.
            </p>
          </div>
        </div>
      </div>

      {/* ── Affiliate Link Input ── */}
      <div className="glass-gold rounded-2xl p-6">
        <label className="mb-3 block text-lg font-bold text-white">
          <Search className="mr-2 inline h-5 w-5 text-amber-400" />
          Enter Your Affiliate Link Once
        </label>
        <p className="mb-4 text-sm text-slate-400">
          Paste your link here and it will be inserted into every description below automatically.
        </p>
        <input
          type="url"
          placeholder="https://your-affiliate-link.com/ref=you"
          value={affiliateLink}
          onChange={(e) => setAffiliateLink(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-lg text-white placeholder-slate-500 outline-none transition-all focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20"
        />
        {affiliateLink && (
          <p className="mt-2 text-sm text-emerald-400">
            <CheckCircle2 className="mr-1 inline h-4 w-4" />
            Your link will replace [YOUR_LINK] in all descriptions below.
          </p>
        )}
      </div>

      {/* ── Niche Tabs ── */}
      <div className="flex flex-wrap gap-2">
        {NICHES.map((niche) => {
          const isActive = activeNiche === niche;
          const count =
            niche === "All"
              ? TRAFFIC_SOURCES.length
              : TRAFFIC_SOURCES.filter((s) => s.niche === niche).length;
          return (
            <button
              key={niche}
              onClick={() => setActiveNiche(niche)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "btn-premium text-white shadow-lg"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:border-amber-500/30 hover:text-white"
              }`}
            >
              {niche !== "All" && NICHE_ICONS[niche]}
              {niche}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive ? "bg-white/20 text-white" : "bg-white/10 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Progress Bar ── */}
      <div className="glass-card rounded-xl p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Progress: <span className="font-bold text-white">{completedCount}</span> of{" "}
            <span className="font-bold text-white">60</span> sources completed
          </span>
          <span className="font-bold text-amber-400">
            {Math.round((completedCount / 60) * 100)}%
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/5">
          <div
            className="btn-premium h-full rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / 60) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Traffic Sources ── */}
      <div className="space-y-3">
        {filtered.map((source) => {
          const isExpanded = expandedId === source.id;
          const isDone = completed.has(source.id);

          return (
            <div
              key={source.id}
              className={`overflow-hidden rounded-xl border transition-all ${
                isDone
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              {/* Card Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : source.id)}
                className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-white/[0.03] md:p-5"
              >
                {/* Checkbox */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComplete(source.id);
                  }}
                  className={`flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 transition-all ${
                    isDone
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-white/20 hover:border-amber-500/50"
                  }`}
                >
                  {isDone && <CheckCircle2 className="h-4 w-4" />}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-base font-semibold md:text-lg ${isDone ? "text-emerald-400 line-through" : "text-white"}`}
                    >
                      {source.name}
                    </span>
                    <Badge tone={CATEGORY_TONE[source.category] ?? "default"} size="sm">
                      {source.category}
                    </Badge>
                    {source.difficulty === "Medium" && (
                      <Badge tone="warning" size="sm">
                        Medium
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3 text-emerald-500" />
                      {source.trafficPotential}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-amber-500" />
                      {source.timeToComplete}
                    </span>
                    <span className="text-slate-600">{source.niche}</span>
                  </div>
                </div>

                {/* Expand Icon */}
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-slate-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-500" />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-white/5 px-4 pb-5 pt-4 md:px-5">
                  {/* Step-by-Step Instructions */}
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-400">
                    Step-by-Step Instructions
                  </h4>
                  <ol className="mb-6 space-y-2">
                    {source.instructions.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                          {i + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-slate-300">{step}</span>
                      </li>
                    ))}
                  </ol>

                  {/* Pre-Written Description */}
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-400">
                    Pre-Written Description — Copy &amp; Paste
                  </h4>
                  <div className="mb-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                      {getDescription(source)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => copyDescription(source)}
                      className="btn-premium flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all"
                    >
                      {copiedId === source.id ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" /> Copy Description
                        </>
                      )}
                    </button>
                    <a
                      href={source.url.startsWith("http") ? source.url : `https://${source.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:border-amber-500/30 hover:bg-white/10"
                    >
                      <ExternalLink className="h-4 w-4" /> Visit Site
                    </a>
                    <button
                      onClick={() => toggleComplete(source.id)}
                      className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                        isDone
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border border-white/10 bg-white/5 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isDone ? "Completed!" : "Mark Done"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="glass-gold rounded-2xl p-6 text-center md:p-8">
        <h3 className="mb-2 text-xl font-bold text-white">
          You have {60 - completedCount} sources left!
        </h3>
        <p className="text-slate-400">
          Every source you submit to is free, passive traffic flowing to your link — forever. Keep
          going!
        </p>
      </div>
    </AppShell>
  );
}
