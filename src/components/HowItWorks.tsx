"use client";

import { motion } from "framer-motion";
import { Search, Brain, BarChart3, MapPinned } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Search",
    description:
      "Type any country name in any language. Our search understands Japanese, Arabic, French — you name it.",
    accent: "from-cyan-500 to-blue-500",
  },
  {
    step: "02",
    icon: Brain,
    title: "AI Interprets",
    description:
      "Our AI engine instantly normalizes your input, corrects typos, and identifies the exact country you mean.",
    accent: "from-brand-500 to-purple-500",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Data Fetches",
    description:
      "Real-time data including population, capital, currencies, languages, and borders is fetched instantly.",
    accent: "from-pink-500 to-rose-500",
  },
  {
    step: "04",
    icon: MapPinned,
    title: "Explore",
    description:
      "View a comprehensive country profile with an interactive map, beautifully animated data cards, and more.",
    accent: "from-emerald-500 to-teal-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />

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
            How It Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Four Steps to
            <br />
            <span className="text-gradient">Global Discovery</span>
          </h2>
          <p className="text-base text-white/40 max-w-xl mx-auto font-light">
            From search to discovery in seconds. Here&apos;s how the magic
            happens.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-6 glow-box h-full hover:bg-white/[0.04] transition-all duration-500">
                {/* Step number */}
                <span className="text-5xl font-black text-white/[0.04] absolute top-4 right-5 select-none">
                  {s.step}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.accent} flex items-center justify-center mb-5 shadow-lg transition-transform duration-500 group-hover:scale-110`}
                >
                  <s.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white/90 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  {s.description}
                </p>
              </div>

              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
