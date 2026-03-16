"use client";

import { motion } from "framer-motion";
import { Globe, Facebook, Instagram, Mail, Phone, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                World<span className="text-gradient">Lens</span>
              </span>
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed font-light mb-6">
              A beautifully designed global discovery experience. Explore any
              country in any language with AI-powered search and stunning
              visualizations.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/islam.mohamed.966245?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass hover:bg-[#1877F2]/20 hover:border-[#1877F2]/30 hover:text-[#1877F2] transition-all duration-300 text-white/40"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/isla4a4m____/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass hover:bg-[#E1306C]/20 hover:border-[#E1306C]/30 hover:text-[#E1306C] transition-all duration-300 text-white/40"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {["Explorer", "Features", "How It Works", "API"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/40 hover:text-white transition-colors duration-300 font-light"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-4">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:nm_benaboud@esi.dz"
                  className="flex items-center gap-2.5 text-sm text-white/40 hover:text-brand-400 transition-colors duration-300 font-light group"
                >
                  <div className="p-1.5 rounded-md bg-white/5 group-hover:bg-brand-500/10 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  nm_benaboud@esi.dz
                </a>
              </li>
              <li>
                <a
                  href="tel:0659361670"
                  className="flex items-center gap-2.5 text-sm text-white/40 hover:text-brand-400 transition-colors duration-300 font-light group"
                >
                  <div className="p-1.5 rounded-md bg-white/5 group-hover:bg-brand-500/10 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  0659361670
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/30 font-light">
            © {new Date().getFullYear()} WorldLens. Crafted with precision.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/30 font-light">
            Made with <Heart className="w-3 h-3 text-pink-500/60" /> for
            explorers everywhere
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
