"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import PopularCountries from "@/components/PopularCountries";
import CountryResult from "@/components/CountryResult";
import MapSection from "@/components/MapSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import { exploreCountry } from "@/lib/exploreApi";
import type { CountryData } from "@/types/country";

export default function Home() {
  const [country, setCountry] = useState<CountryData | null>(null);
  const [interpretedAs, setInterpretedAs] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setCountry(null);
    setHasSearched(true);

    try {
      const data = await exploreCountry(query);

      if (data.success && data.data) {
        setCountry(data.data);
        setInterpretedAs(data.interpretedAs || "");

        // Smooth scroll to results
        setTimeout(() => {
          document
            .getElementById("results")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <main className="relative">
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero Section ───────────────────────────────────────── */}
      <Hero />

      {/* ── Explore Section ────────────────────────────────────── */}
      <section
        id="explore"
        className="relative py-20 px-6 -mt-12"
      >
        {/* Background accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-500/5 blur-[120px]" />

        <div className="relative max-w-5xl mx-auto space-y-8">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold text-brand-400 uppercase tracking-widest glass rounded-full mb-4">
              Explorer
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              Discover Countries Instantly
            </h2>
            <p className="text-sm text-white/40 font-light">
              Type in any language — English, 日本語, العربية, Español, and more.
            </p>
          </motion.div>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            error={error}
          />

          {/* Popular Countries (show when no results) */}
          {!country && !isLoading && (
            <PopularCountries onSelect={handleSearch} />
          )}

          {/* Skeleton Loader */}
          {isLoading && (
            <div className="space-y-4 max-w-5xl mx-auto">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-6">
                  <div className="w-36 h-24 rounded-xl skeleton" />
                  <div className="flex-1 space-y-3">
                    <div className="h-8 w-64 rounded-lg skeleton" />
                    <div className="h-4 w-48 rounded-lg skeleton" />
                    <div className="flex gap-2">
                      <div className="h-6 w-16 rounded-lg skeleton" />
                      <div className="h-6 w-20 rounded-lg skeleton" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glass rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl skeleton" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-16 rounded skeleton" />
                        <div className="h-4 w-24 rounded skeleton" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          <div id="results">
            {country && !isLoading && (
              <div className="space-y-6">
                <CountryResult
                  country={country}
                  interpretedAs={interpretedAs}
                />
                <MapSection
                  lat={country.latlng[0]}
                  lng={country.latlng[1]}
                  countryName={country.name.common}
                />
              </div>
            )}
          </div>

          {/* Empty State (after search returned no result) */}
          {hasSearched && !country && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🌍</div>
              <p className="text-white/40 text-sm font-light">
                No country found. Try a different search term.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────── */}
      <Features />

      {/* ── How It Works ───────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Stats ──────────────────────────────────────────────── */}
      <Stats />

      {/* ── Footer ─────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
