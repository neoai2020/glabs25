"use client";

import { HelpCircle, MessageCircle, ArrowRight } from "lucide-react";

export function NeedHelpCard() {
  // Support desk link - to be updated
  const supportLink = "#support";

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20">
          <HelpCircle className="text-blue-400" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">Need Help?</h3>
          <p className="mt-1 text-slate-400">
            Our support team is here to help you succeed. Get answers to your questions quickly.
          </p>
          <a
            href={supportLink}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/30"
          >
            <MessageCircle size={16} />
            Contact Support
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
