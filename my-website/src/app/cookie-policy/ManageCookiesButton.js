"use client";

import { Sliders } from "lucide-react";

export default function ManageCookiesButton({ className = "" }) {
  const handleOpenSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cwa:open-cookie-settings"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleOpenSettings}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${className}`}
    >
      <Sliders size={16} className="text-emerald-400" />
      <span>Manage Cookie Preferences</span>
    </button>
  );
}
