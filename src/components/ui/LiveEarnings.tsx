"use client";

import { useState, useEffect } from "react";
import { Badge } from "./Badge";
import Link from "next/link";

const firstNames = [
  "Sarah", "Michael", "Jennifer", "David", "Lisa", "Robert", "Patricia", "James",
  "Linda", "William", "Barbara", "Richard", "Susan", "Joseph", "Karen", "Thomas",
  "Nancy", "Charles", "Betty", "Daniel", "Margaret", "Matthew", "Sandra", "Anthony",
  "Dorothy", "Mark", "Ashley", "Donald", "Kimberly", "Steven", "Emily", "Paul"
];

const lastInitials = ["M", "R", "K", "L", "S", "J", "W", "B", "T", "H", "D", "C", "P", "N"];

const niches = [
  "Home Decor", "Kitchen Gadgets", "Skincare", "Pet Products", "Baby Products",
  "Fashion", "Fitness", "Tech Gadgets", "Garden", "Beauty", "Wellness", "Office"
];

function generateRandomEarning() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastInitial = lastInitials[Math.floor(Math.random() * lastInitials.length)];
  const niche = niches[Math.floor(Math.random() * niches.length)];
  const amount = Math.floor(Math.random() * 200) + 20; // $20 - $220
  const seconds = Math.floor(Math.random() * 60) + 1;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: `${firstName} ${lastInitial}.`,
    amount: `$${amount}`,
    time: seconds < 60 ? `${seconds} sec ago` : "just now",
    niche,
  };
}

function generateInitialEarnings() {
  return Array.from({ length: 4 }, () => generateRandomEarning());
}

export function LiveEarnings() {
  const [earnings, setEarnings] = useState(generateInitialEarnings);

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings(prev => {
        const newEarning = generateRandomEarning();
        newEarning.time = "just now";
        // Add new earning at the top, remove the oldest one
        return [newEarning, ...prev.slice(0, 3)];
      });
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Update times every second
  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings(prev => prev.map(e => {
        if (e.time === "just now") return { ...e, time: "1 sec ago" };
        const match = e.time.match(/(\d+) sec ago/);
        if (match) {
          const secs = parseInt(match[1]) + 1;
          return { ...e, time: secs >= 60 ? "1 min ago" : `${secs} sec ago` };
        }
        return e;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">Live Member Earnings</h3>
          <Badge tone="success" pulse>LIVE</Badge>
        </div>
        <Link href="/social-proof" className="text-sm text-amber-400 hover:text-amber-300">View all →</Link>
      </div>
      
      <div className="mt-4 space-y-3">
        {earnings.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between rounded-xl bg-white/5 p-4 transition-all duration-500 animate-in fade-in slide-in-from-top-2"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 text-sm font-bold text-black">
                {item.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-white">{item.name} just earned</p>
                <p className="text-sm text-slate-400">{item.niche} • {item.time}</p>
              </div>
            </div>
            <span className="text-xl font-bold text-emerald-400 money-glow">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
