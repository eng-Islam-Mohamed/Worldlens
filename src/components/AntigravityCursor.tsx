"use client";

import { useEffect, useRef } from "react";

export default function AntigravityCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only run on non-touch devices for performance and since it's a mouse effect
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Golden ratio spherical distribution
    const PARTICLE_COUNT = 600;

    class Particle {
      baseX: number; baseY: number; baseZ: number;
      x: number; y: number; z: number;
      curX: number; curY: number;
      vx: number; vy: number;
      color: string;
      size: number;

      constructor(i: number, total: number) {
        const phi = Math.PI * (3 - Math.sqrt(5));
        const y = 1 - (i / (total - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;

        this.baseX = Math.cos(theta) * radius;
        this.baseY = y;
        this.baseZ = Math.sin(theta) * radius;
        
        this.x = this.baseX;
        this.y = this.baseY;
        this.z = this.baseZ;

        this.curX = window.innerWidth / 2;
        this.curY = window.innerHeight / 2;
        this.vx = 0;
        this.vy = 0;

        // Map X coordinate to a beautiful orange -> pink -> purple -> blue gradient
        const normalizedX = (this.baseX + 1) / 2;
        const hue = 20 + normalizedX * 200;
        this.color = `hsl(${hue}, 80%, 65%)`;
        this.size = Math.random() * 1.5 + 0.8;
      }

      update(time: number, mouseX: number, mouseY: number) {
        // Slowly rotate the sphere over time
        const rotX = time * 0.00015;
        const rotY = time * 0.0002;

        let x1 = this.baseX * Math.cos(rotY) - this.baseZ * Math.sin(rotY);
        let z1 = this.baseX * Math.sin(rotY) + this.baseZ * Math.cos(rotY);

        let y1 = this.baseY * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = this.baseY * Math.sin(rotX) + z1 * Math.cos(rotX);

        this.x = x1;
        this.y = y1;
        this.z = z2;

        // 3D to 2D Projection
        const MAX_Z = 2;
        const scale = (MAX_Z + this.z) / MAX_Z;
        const radius = Math.min(width, height) * 0.45; // Size of the sphere
        
        const baseTargetX = width / 2 + this.x * radius * scale;
        const baseTargetY = height / 2 + this.y * radius * scale;

        let targetX = baseTargetX;
        let targetY = baseTargetY;

        // Mouse Repulsion Logic
        const dx = baseTargetX - mouseX;
        const dy = baseTargetY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200; // Interaction radius

        if (dist < maxDist && dist > 0) {
          // Calculate force (closer = stronger)
          const force = Math.pow((maxDist - dist) / maxDist, 2);
          const repelStrength = 180 * scale; 
          targetX += (dx / dist) * force * repelStrength;
          targetY += (dy / dist) * force * repelStrength;
        }

        // Spring physics for elegant bounce-back
        const springStrength = 0.05;
        const friction = 0.82;

        const ax = (targetX - this.curX) * springStrength;
        const ay = (targetY - this.curY) * springStrength;

        this.vx += ax;
        this.vy += ay;
        this.vx *= friction;
        this.vy *= friction;

        this.curX += this.vx;
        this.curY += this.vy;

        // Depth perspective (size and opacity fading based on Z)
        const depthSize = Math.max(0.1, this.size * scale);
        const opacity = Math.min(1, Math.max(0.1, (this.z + 1) / 2));

        return { x: this.curX, y: this.curY, size: depthSize, opacity, color: this.color };
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle(i, PARTICLE_COUNT));
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        const { x, y, size, opacity, color } = p.update(time, mouseX, mouseY);
        
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        // Subtle glow effect
        ctx.shadowBlur = size * 3;
        ctx.shadowColor = color;
        
        ctx.beginPath();
        // Drawing slightly elongated pill shapes pointing in the direction of velocity makes them look like dashes
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.5) {
            const angle = Math.atan2(p.vy, p.vx);
            ctx.ellipse(x, y, size * 2.5, size, angle, 0, Math.PI * 2);
        } else {
            ctx.arc(x, y, size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      });

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen', opacity: 0.65 }}
    />
  );
}
