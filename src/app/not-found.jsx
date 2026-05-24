"use client";

import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#081120] text-white">

      {/* Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
        <div className="absolute right-[-120px] bottom-[-120px] h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">

        {/* Funny Travel GIF */}
        <img
          src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
          alt="lost traveler"
          className="mx-auto mb-6 h-56 w-56 rounded-3xl border border-white/10 shadow-2xl animate-bounce"
        />

        {/* 404 Text */}
        <h1 className="text-7xl font-extrabold text-cyan-400 drop-shadow-[0_10px_30px_rgba(34,211,238,0.4)]">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-3 text-3xl font-bold">
          Oops! You’re Lost 🌍
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-400">
          This page disappeared during your journey.  
          Even experienced travelers take wrong turns 😄
        </p>

        {/* Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">

          {/* Home Button */}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold shadow-lg transition hover:scale-110 hover:rotate-1"
          >
            <Home size={16} />
            Go Home
          </Link>

          {/* Retry Button */}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm transition hover:scale-110 hover:-rotate-1 hover:bg-white/10"
          >
            <RotateCcw size={16} />
            Retry
          </button>
        </div>

        {/* Footer text */}
        <p className="mt-10 text-xs text-gray-500 animate-pulse">
          Tip: Follow the map next time 🧭
        </p>
      </div>
    </div>
  );
}