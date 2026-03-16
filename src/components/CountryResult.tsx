"use client";

import {
  Building2,
  Users,
  Globe2,
  Languages,
  Coins,
  Clock,
  MapPin,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import type { CountryData } from "@/types/country";
import { useState } from "react";

interface CountryResultProps {
  country: CountryData;
  interpretedAs?: string;
}

function formatPopulation(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return n.toString();
}

export default function CountryResult({
  country,
  interpretedAs,
}: CountryResultProps) {
  const [copied, setCopied] = useState(false);

  const nativeNames = country.name.nativeName
    ? Object.values(country.name.nativeName)
        .map((n) => n.common)
        .filter((n) => n !== country.name.common)
        .slice(0, 3)
    : [];

  const languageList = Object.values(country.languages || {});
  const currencyList = Object.values(country.currencies || {});

  const handleCopy = () => {
    const text = `${country.name.common} — Capital: ${
      country.capital?.[0] || "N/A"
    }, Region: ${country.region}, Population: ${formatPopulation(
      country.population
    )}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dataCards = [
    {
      Icon: Building2,
      label: "Capital",
      value: country.capital?.[0] || "N/A",
      accent: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      Icon: Users,
      label: "Population",
      value: formatPopulation(country.population),
      accent: "text-brand-400",
      bg: "bg-brand-400/10",
    },
    {
      Icon: Globe2,
      label: "Region",
      value: country.subregion || country.region || "N/A",
      accent: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      Icon: Languages,
      label: "Languages",
      value: languageList.slice(0, 3).join(", ") || "N/A",
      accent: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      Icon: Coins,
      label: "Currency",
      value:
        currencyList
          .slice(0, 2)
          .map((c) => `${c.name} (${c.symbol})`)
          .join(", ") || "N/A",
      accent: "text-pink-400",
      bg: "bg-pink-400/10",
    },
    {
      Icon: Clock,
      label: "Timezone",
      value: country.timezones?.[0] || "N/A",
      accent: "text-violet-400",
      bg: "bg-violet-400/10",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 animate-slide-up">
      {/* ── Country Header (Flag + Name) ────────────────────────── */}
      <div className="glass rounded-2xl p-6 glow-box relative overflow-hidden">
        {/* Subtle flag background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url(${country.flags.svg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative flex flex-col sm:flex-row items-center gap-6">
          {/* Flag */}
          <div className="relative group flex-shrink-0">
            <img
              src={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="w-28 h-20 sm:w-36 sm:h-24 object-cover rounded-xl shadow-2xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Name & Meta */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            {interpretedAs && (
              <p className="text-xs font-medium text-brand-400/80 mb-1 uppercase tracking-wider">
                Interpreted as &ldquo;{interpretedAs}&rdquo;
              </p>
            )}
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
              {country.name.common}
            </h2>
            <p className="text-sm text-white/40 mb-2">
              {country.name.official}
            </p>

            {nativeNames.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {nativeNames.map((n) => (
                  <span
                    key={n}
                    className="px-2.5 py-1 text-xs font-medium text-white/50 glass rounded-lg"
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl glass hover:bg-white/5 transition-all group"
              title="Copy country info"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-white/40 group-hover:text-white/70" />
              )}
            </button>
            {country.maps?.googleMaps && (
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass hover:bg-white/5 transition-all group"
                title="Open in Google Maps"
              >
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/70" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Data Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {dataCards.map((card) => (
          <div
            key={card.label}
            className="glass rounded-2xl p-5 glow-box hover:bg-white/[0.05] hover:scale-[1.02] transition-all duration-500 h-full"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl ${card.bg}`}>
                <card.Icon className={`w-4 h-4 ${card.accent}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
                  {card.label}
                </p>
                <p className="text-sm font-semibold text-white/90">
                  {card.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Border Countries ────────────────────────────────────── */}
      {country.borderNames && country.borderNames.length > 0 && (
        <div className="glass rounded-2xl p-6 glow-box">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-brand-400" />
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
              Neighboring Countries
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {country.borderNames.map((name) => (
              <span
                key={name}
                className="px-3 py-2 text-sm font-medium glass rounded-xl hover:bg-white/5 hover:text-white transition-all duration-300 cursor-default text-white/60"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {country.borders.length === 0 && (
        <div className="glass rounded-2xl p-6 glow-box">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-400" />
            <p className="text-sm text-white/40 font-medium">
              This country has no land borders (island nation)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
