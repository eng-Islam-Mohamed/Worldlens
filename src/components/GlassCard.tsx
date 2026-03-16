"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-6 glow-box ${
        hover
          ? "hover:bg-white/[0.05] hover:border-white/10 hover:glow-box-strong hover:scale-[1.02] transition-all duration-500"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
