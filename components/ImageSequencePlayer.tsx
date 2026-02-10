
import React, { useRef, useEffect } from 'react';
import { MotionValue, useAnimationFrame, useMotionValue } from 'framer-motion';

interface ImageSequencePlayerProps {
  progress: MotionValue<number>;
}

const ImageSequencePlayer: React.FC<ImageSequencePlayerProps> = ({ progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const internalProgress = useMotionValue(0);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=90&w=1200";
    img.onload = () => { heroImageRef.current = img; };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    return progress.on("change", (v) => internalProgress.set(v));
  }, [progress, internalProgress]);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const p = internalProgress.get();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;

    // RESPONSIVE SCALING FACTOR
    const isMobile = width < 768;
    const scaleFactor = Math.min(1.2, Math.max(0.5, width / 1400));
    const explodeScale = isMobile ? 0.6 : 1;

    ctx.clearRect(0, 0, width, height);

    // DRAW THE HERO PRODUCT
    if (p < 0.25 || p > 0.85) {
      const alpha = p < 0.25 ? 1 : (p - 0.85) / 0.15;
      const fadeOut = p < 0.25 ? Math.max(0, 1 - (p / 0.15)) : alpha;
      
      if (heroImageRef.current) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, p < 0.25 ? fadeOut : alpha);
        const img = heroImageRef.current;
        // Adjust product scale for portrait screens
        const productBaseScale = width < height ? 0.6 : 0.4;
        const scale = (productBaseScale + (p * 0.05)) * scaleFactor;
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, centerX - w/2, centerY - h/2, w, h);
        ctx.restore();
      }
    }

    // DRAW THE EXPLODED ENGINEERING VIEW
    if (p > 0.1) {
      const explodeFactor = Math.min(1, Math.max(0, (p - 0.1) / 0.6));
      const reassemble = p > 0.75 ? Math.max(0, 1 - (p - 0.75) / 0.2) : 1;
      const activeExplode = explodeFactor * reassemble;

      const drawComponent = (x: number, y: number, label: string, color: string, radius: number) => {
        // Apply responsive scale to coordinates
        const targetX = centerX + (x * activeExplode * explodeScale * scaleFactor);
        const targetY = centerY + (y * activeExplode * explodeScale * scaleFactor);
        const alpha = Math.min(1, activeExplode * 2);
        const r = radius * scaleFactor;

        ctx.save();
        ctx.translate(targetX, targetY);
        
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 1.5);
        g.addColorStop(0, `${color}${Math.floor(alpha * 40).toString(16).padStart(2, '0')}`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.2})`;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        if (activeExplode > 0.4 && !isMobile) { // Hide labels on tiny screens for clarity
          ctx.fillStyle = `rgba(255, 255, 255, ${(activeExplode - 0.4) * 2})`;
          ctx.font = `500 ${Math.max(8, 10 * scaleFactor)}px Inter`;
          ctx.letterSpacing = '2px';
          ctx.fillText(label.toUpperCase(), r + 15, 4);
          ctx.beginPath();
          ctx.setLineDash([]);
          ctx.moveTo(r, 0);
          ctx.lineTo(r + 10, 0);
          ctx.stroke();
        }
        ctx.restore();
      };

      // Responsive Coordinates
      drawComponent(0, 0, "Sony QN2e Processor", "#0050FF", 60);
      drawComponent(-280, 0, "40mm Driver", "#00D6FF", 90);
      drawComponent(280, 0, "Acoustic Chamber", "#00D6FF", 90);
      drawComponent(0, -220, "Magnesium Band", "#FFFFFF", 40);
      drawComponent(-130, -130, "NC Mic", "#0050FF", 20);
      drawComponent(130, -130, "NC Mic", "#0050FF", 20);
      drawComponent(-130, 130, "Voice Array", "#00D6FF", 20);
      drawComponent(130, 130, "Voice Array", "#00D6FF", 20);

      if (activeExplode > 0.2) {
        ctx.save();
        ctx.strokeStyle = `rgba(0, 80, 255, ${activeExplode * 0.1})`;
        ctx.beginPath();
        ctx.moveTo(centerX - (280 * activeExplode * explodeScale * scaleFactor), centerY);
        ctx.lineTo(centerX + (280 * activeExplode * explodeScale * scaleFactor), centerY);
        ctx.moveTo(centerX, centerY - (220 * activeExplode * explodeScale * scaleFactor));
        ctx.lineTo(centerX, centerY + (130 * activeExplode * explodeScale * scaleFactor));
        ctx.stroke();
        ctx.restore();
      }
    }

    const speed = Math.abs(progress.getVelocity() / 1000);
    if (speed > 0.1) {
      ctx.save();
      ctx.strokeStyle = `rgba(0, 214, 255, ${Math.min(0.2, speed * 0.5)})`;
      ctx.beginPath();
      ctx.arc(centerX, centerY, (250 + speed * 100) * scaleFactor, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  });

  return (
    <div className="relative w-full h-full bg-[#050505] flex items-center justify-center pointer-events-none">
      <canvas ref={canvasRef} className="z-10 mix-blend-screen w-full h-full" />
    </div>
  );
};

export default ImageSequencePlayer;
