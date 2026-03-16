"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Zap,
  Languages,
  Map,
  Shield,
  Palette,
} from "lucide-react";
import GlassCard from "./GlassCard";

const features = [
  {
    icon: Languages,
    title: "Any Language",
    description:
      "Type country names in English, Arabic, Japanese, Hindi, Spanish, or any language — our AI understands them all.",
    accent: "text-cyan-400",
    glow: "from-cyan-500/20",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Lightning-fast response powered by AI interpretation and real-time data fetching. No delays, no friction.",
    accent: "text-amber-400",
    glow: "from-amber-500/20",
  },
  {
    icon: Globe,
    title: "Comprehensive Data",
    description:
      "Get flag, capital, borders, population, languages, currencies, timezone, and an interactive map in one view.",
    accent: "text-brand-400",
    glow: "from-brand-500/20",
  },
  {
    icon: Map,
    title: "Interactive Maps",
    description:
      "Explore every country on a beautiful dark-themed interactive map with smooth zoom and real-time centering.",
    accent: "text-emerald-400",
    glow: "from-emerald-500/20",
  },
  {
    icon: Shield,
    title: "Smart Typo Handling",
    description:
      "Made a typo? No problem. Our AI-powered system intelligently corrects mistakes and finds what you meant.",
    accent: "text-pink-400",
    glow: "from-pink-500/20",
  },
  {
    icon: Palette,
    title: "Premium Experience",
    description:
      "A beautifully designed interface with smooth animations, elegant glassmorphism, and a luxury-tech aesthetic.",
    accent: "text-violet-400",
    glow: "from-violet-500/20",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-[120px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-brand-400 uppercase tracking-widest glass rounded-full mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Everything You Need to
            <br />
            <span className="text-gradient">Explore the World</span>
          </h2>
          <p className="text-base text-white/40 max-w-xl mx-auto font-light">
            Powerful features wrapped in an elegant interface, designed for
            discovery.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlassCard className="h-full group">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.glow} to-transparent flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110`}
                >
                  <feature.icon className={`w-5 h-5 ${feature.accent}`} />
                </div>
                <h3 className="text-base font-bold text-white/90 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
