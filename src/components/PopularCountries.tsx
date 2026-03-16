"use client";

import { motion } from "framer-motion";

const popularCountries = [
  { name: "Japan", emoji: "🇯🇵" },
  { name: "France", emoji: "🇫🇷" },
  { name: "Brazil", emoji: "🇧🇷" },
  { name: "United States", emoji: "🇺🇸" },
  { name: "Australia", emoji: "🇦🇺" },
  { name: "Egypt", emoji: "🇪🇬" },
  { name: "India", emoji: "🇮🇳" },
  { name: "Germany", emoji: "🇩🇪" },
  { name: "South Korea", emoji: "🇰🇷" },
  { name: "Mexico", emoji: "🇲🇽" },
];

interface PopularCountriesProps {
  onSelect: (name: string) => void;
}

export default function PopularCountries({ onSelect }: PopularCountriesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto mt-6"
    >
      <p className="text-center text-xs font-medium text-white/30 uppercase tracking-widest mb-3">
        Popular Countries
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {popularCountries.map((c, i) => (
          <motion.button
            key={c.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
            onClick={() => onSelect(c.name)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium glass rounded-xl hover:bg-white/5 hover:text-white text-white/50 transition-all duration-300 hover:scale-105"
          >
            <span className="text-base">{c.emoji}</span>
            {c.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
