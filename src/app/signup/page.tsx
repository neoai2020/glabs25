"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Zap, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, User, Phone, CheckCircle2, DollarSign, TrendingUp, Clock, Shield } from "lucide-react";

// Country codes for phone validation
const countryCodes = [
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
  { code: "+31", country: "NL", flag: "🇳🇱" },
  { code: "+46", country: "SE", flag: "🇸🇪" },
  { code: "+47", country: "NO", flag: "🇳🇴" },
  { code: "+45", country: "DK", flag: "🇩🇰" },
  { code: "+41", country: "CH", flag: "🇨🇭" },
  { code: "+43", country: "AT", flag: "🇦🇹" },
  { code: "+32", country: "BE", flag: "🇧🇪" },
  { code: "+353", country: "IE", flag: "🇮🇪" },
  { code: "+64", country: "NZ", flag: "🇳🇿" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "SA", flag: "🇸🇦" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
  { code: "+60", country: "MY", flag: "🇲🇾" },
  { code: "+63", country: "PH", flag: "🇵🇭" },
  { code: "+62", country: "ID", flag: "🇮🇩" },
  { code: "+66", country: "TH", flag: "🇹🇭" },
  { code: "+84", country: "VN", flag: "🇻🇳" },
  { code: "+48", country: "PL", flag: "🇵🇱" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+90", country: "TR", flag: "🇹🇷" },
  { code: "+20", country: "EG", flag: "🇪🇬" },
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+254", country: "KE", flag: "🇰🇪" },
];

// Validate phone number (basic validation - at least 6 digits)
function isValidPhoneNumber(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length >= 6 && digitsOnly.length <= 15;
}

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userCountry, setUserCountry] = useState("");
  const { signUp } = useAuth();

  // Get user's country from IP on mount
  useEffect(() => {
    const getCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setUserCountry(data.country_name || "Unknown");
        
        // Auto-select country code based on detected country code
        const countryCodeMapping: Record<string, string> = {
          "US": "+1",
          "CA": "+1",
          "GB": "+44",
          "UK": "+44",
          "AU": "+61",
          "DE": "+49",
          "FR": "+33",
          "IT": "+39",
          "ES": "+34",
          "NL": "+31",
          "SE": "+46",
          "NO": "+47",
          "DK": "+45",
          "CH": "+41",
          "AT": "+43",
          "BE": "+32",
          "IE": "+353",
          "NZ": "+64",
          "IN": "+91",
          "CN": "+86",
          "JP": "+81",
          "KR": "+82",
          "BR": "+55",
          "MX": "+52",
          "ZA": "+27",
          "AE": "+971",
          "SA": "+966",
          "SG": "+65",
          "MY": "+60",
          "PH": "+63",
          "ID": "+62",
          "TH": "+66",
          "VN": "+84",
          "PL": "+48",
          "RU": "+7",
          "TR": "+90",
          "EG": "+20",
          "NG": "+234",
          "KE": "+254",
        };
        
        // Use country_code from API (e.g., "US", "GB", etc.)
        if (data.country_code && countryCodeMapping[data.country_code]) {
          setCountryCode(countryCodeMapping[data.country_code]);
        }
      } catch {
        setUserCountry("Unknown");
      }
    };
    getCountry();
  }, []);

  const sendToWebhook = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
  }) => {
    try {
      await fetch("https://hook.eu2.make.com/p9qo04kpjthqql1lbkjyqvhcxwhkthuj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      // Webhook error should not block signup
      console.error("Webhook error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate phone
    if (!isValidPhoneNumber(phoneNumber)) {
      setError("Please enter a valid phone number");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    // Send to webhook in background (don't await)
    sendToWebhook({
      firstName,
      lastName,
      email,
      phone: `${countryCode}${phoneNumber}`,
      country: userCountry,
    });

    const { error } = await signUp(email, password);

    if (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      {/* Left Side - Benefits */}
      <div className="hidden lg:flex lg:w-[45%] lg:flex-col lg:justify-center bg-gradient-to-br from-emerald-900/30 via-emerald-900/20 to-amber-900/20 p-12 xl:p-16">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Join 12,483+ members earning daily
          </div>

          <h2 className="mt-8 text-4xl font-bold text-white xl:text-5xl">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">Wealth Journey</span> Today
          </h2>

          <p className="mt-6 text-xl text-slate-300">
            Unlock the proven system that&apos;s helping everyday people build life-changing income online.
          </p>

          {/* Benefits */}
          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
                <DollarSign className="text-emerald-400" size={24} />
              </div>
              <div>
                <p className="font-semibold text-white text-lg">Proven Income System</p>
                <p className="text-slate-400">Follow our step-by-step blueprint used by thousands to earn online</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/20">
                <TrendingUp className="text-amber-400" size={24} />
              </div>
              <div>
                <p className="font-semibold text-white text-lg">$214.36/Day Average Earnings</p>
                <p className="text-slate-400">Our members earn an average of $214.36 per day in passive income</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
                <Clock className="text-emerald-400" size={24} />
              </div>
              <div>
                <p className="font-semibold text-white text-lg">Works While You Sleep</p>
                <p className="text-slate-400">Set it up once and earn 24/7 passive income on autopilot</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/20">
                <Shield className="text-amber-400" size={24} />
              </div>
              <div>
                <p className="font-semibold text-white text-lg">Full Support & Training</p>
                <p className="text-slate-400">Our success team guides you every step of the way</p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-slate-400 uppercase tracking-wide">Member Results This Month</p>
            <p className="mt-2 text-4xl font-bold text-white">$847,230</p>
            <p className="text-emerald-400 font-medium">Total earnings across all members</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-10 lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-emerald-500 shadow-lg shadow-amber-500/20">
              <Zap className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">G-Labs 95</h1>
            </div>
          </div>

          {/* Header */}
          <h2 className="text-3xl font-bold text-white">Welcome To G-Labs 95</h2>
          <p className="mt-2 text-lg text-slate-400">Enter Your Information Below To Create Your Account</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-400">
                {error}
              </div>
            )}

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-300">First Name</label>
                <div className="relative mt-1.5">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">Last Name</label>
                <div className="relative mt-1.5">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300">Email Address</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-300">Phone Number</label>
              <div className="mt-1.5 flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-28 rounded-xl border border-white/10 bg-white/5 px-3 py-3.5 text-white focus:border-amber-500/50 focus:outline-none"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code} className="bg-slate-900">
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <div className="relative flex-1">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
                    placeholder="555 123 4567"
                    required
                  />
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500 flex items-start gap-1.5">
                <Shield size={12} className="mt-0.5 shrink-0 text-emerald-500" />
                Our success team will reach out if there are any issues with your account or to help you maximize your earnings.
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-11 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
                  placeholder="At least 6 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300">Confirm Password</label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-premium flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold text-black disabled:opacity-70 mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating Your Account...
                </>
              ) : (
                <>
                  Create My Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-amber-400 hover:text-amber-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
