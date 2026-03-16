"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, AlertCircle, X } from "lucide-react";
import { useState, useCallback, useRef } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  error: string | null;
}

export default function SearchBar({ onSearch, isLoading, error }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim() && !isLoading) {
        onSearch(query.trim());
      }
    },
    [query, isLoading, onSearch]
  );

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        {/* Glow ring behind input */}
        <div
          className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-500/30 via-brand-400/20 to-cyan-500/30 blur-xl transition-opacity duration-500 ${
            isFocused ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`relative flex items-center gap-3 px-5 py-4 rounded-2xl glass-strong transition-all duration-300 ${
            isFocused
              ? "ring-1 ring-brand-500/40"
              : "ring-1 ring-transparent hover:ring-white/10"
          }`}
        >
          {/* Search / Loading Icon */}
          <div className="flex-shrink-0">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-white/40" />
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder='Search any country… try "日本", "Alemania", or "fr"'
            className="flex-1 bg-transparent text-white text-base placeholder:text-white/30 focus:outline-none font-light"
            disabled={isLoading}
            autoComplete="off"
            id="country-search"
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4 text-white/40" />
            </button>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="flex-shrink-0 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-brand-500/20"
          >
            {isLoading ? "Searching…" : "Explore"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 mt-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
