"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Map as MapIcon } from "lucide-react";

interface MapSectionProps {
  lat: number;
  lng: number;
  countryName: string;
}

export default function MapSection({ lat, lng, countryName }: MapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      if (cancelled || !mapRef.current) return;

      // Clean up previous map
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 4,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        maxZoom: 18,
      }).addTo(map);

      // Custom marker icon
      const icon = L.divIcon({
        className: "",
        html: `
          <div style="
            width: 18px;
            height: 18px;
            background: linear-gradient(135deg, #7c3aed, #06b6d4);
            border-radius: 50%;
            border: 3px solid rgba(255,255,255,0.9);
            box-shadow: 0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.2);
          "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif;font-weight:600;color:#1f2937;font-size:14px;padding:2px 4px;">${countryName}</div>`
        );

      // Subtle circle around marker
      L.circle([lat, lng], {
        radius: 150000,
        color: "#7c3aed",
        fillColor: "#7c3aed",
        fillOpacity: 0.06,
        weight: 1,
        opacity: 0.25,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Give tiles time to load before showing
      setTimeout(() => {
        if (!cancelled) {
          setLoaded(true);
          map.invalidateSize();
        }
      }, 500);

      // Smooth fly-to
      setTimeout(() => {
        if (!cancelled && mapInstanceRef.current) {
          map.flyTo([lat, lng], 5, { duration: 1.5 });
        }
      }, 800);
    };

    initMap();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, countryName]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="glass rounded-2xl p-1 glow-box overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-5 py-3">
          <MapIcon className="w-4 h-4 text-brand-400" />
          <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
            Location Map
          </span>
        </div>

        {/* Map Container */}
        <div className="relative rounded-xl overflow-hidden mx-1 mb-1">
          <div
            ref={mapRef}
            className="w-full h-[350px] sm:h-[420px] lg:h-[480px] rounded-xl"
          />

          {/* Loading overlay */}
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1e] rounded-xl">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
                <span className="text-sm text-white/40 font-medium">
                  Loading map…
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
