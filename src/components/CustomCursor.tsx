"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over a clickable element
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Add mouse leave/enter to hide cursor when browser loses focus
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* ── Main Dot ────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-3 h-3 bg-brand-400 rounded-full mix-blend-screen"
        animate={{
          x: mousePos.x - 6,
          y: mousePos.y - 6,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 28,
          mass: 0.1,
        }}
        style={{
          boxShadow: "0 0 10px rgba(124, 58, 237, 0.8), 0 0 20px rgba(124, 58, 237, 0.4)",
        }}
      />

      {/* ── Trailing Aura ─────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-12 h-12 rounded-full border border-brand-400/30 bg-brand-500/10 backdrop-blur-[2px]"
        animate={{
          x: mousePos.x - 24,
          y: mousePos.y - 24,
          scale: isHovering ? 1.8 : 1,
          borderColor: isHovering ? "rgba(124, 58, 237, 0.8)" : "rgba(124, 58, 237, 0.3)",
          backgroundColor: isHovering ? "rgba(124, 58, 237, 0.2)" : "rgba(124, 58, 237, 0.1)",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.6,
        }}
        style={{
          boxShadow: isHovering 
            ? "0 0 30px rgba(124, 58, 237, 0.4), inset 0 0 20px rgba(124, 58, 237, 0.2)" 
            : "0 0 15px rgba(124, 58, 237, 0.2)",
        }}
      />
    </>
  );
}
