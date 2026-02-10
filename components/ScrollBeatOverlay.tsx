
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ScrollBeatOverlayProps {
  progress: MotionValue<number>;
}

const ScrollBeatOverlay: React.FC<ScrollBeatOverlayProps> = ({ progress }) => {
  const createFade = (start: number, end: number) => {
    return useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  };
  
  const createTranslateY = (start: number, end: number) => {
    return useTransform(progress, [start, start + 0.05, end - 0.05, end], [30, 0, 0, -30]);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-center items-center px-6 md:px-12 lg:px-32 overflow-hidden">
      
      {/* 0-18%: HERO INTRO */}
      <motion.div 
        style={{ opacity: createFade(0, 0.2), y: createTranslateY(0, 0.2) }}
        className="text-center w-full max-w-6xl"
      >
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="inline-block text-[#00D6FF] font-bold text-[9px] md:text-[10px] uppercase mb-4 md:mb-10 tracking-[0.2em]"
        >
          Flagship Engineering
        </motion.span>
        <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[14rem] font-black tracking-tighter mb-4 md:mb-8 text-white leading-[0.85] md:leading-[0.7] drop-shadow-2xl">
          1000XM6
        </h1>
        <p className="text-sm md:text-2xl lg:text-3xl font-light text-white/30 tracking-[0.2em] md:tracking-widest uppercase">Hear Only What Matters.</p>
      </motion.div>

      {/* 20-48%: ENGINEERING STAGE */}
      <motion.div 
        style={{ 
          opacity: createFade(0.25, 0.48), 
          x: useTransform(progress, [0.25, 0.35], [-40, 0]),
          filter: useTransform(progress, [0.25, 0.3], ["blur(10px)", "blur(0px)"])
        }}
        className="absolute w-full px-6 md:px-20 lg:px-48 text-center md:text-left top-1/2 -translate-y-1/2 max-w-2xl md:left-0"
      >
        <div className="bg-[#0050FF] w-12 md:w-20 h-1 mb-6 md:mb-12 shadow-[0_0_20px_#0050FF] mx-auto md:mx-0" />
        <h3 className="text-4xl sm:text-6xl lg:text-9xl font-bold tracking-tighter mb-4 md:mb-10 leading-[0.9] md:leading-[0.8] text-white">
          Precision <br className="hidden md:block" /> Re-imagined.
        </h3>
        <p className="text-base md:text-xl lg:text-2xl text-white/50 leading-relaxed font-light mb-6 md:mb-10">
          Redesigned from the molecular level. Custom bio-cellulose drivers deliver unparalleled transient response.
        </p>
        <div className="flex justify-center md:justify-start gap-2 md:gap-4">
          <div className="px-3 py-1.5 bg-white/5 rounded text-[9px] md:text-[11px] font-bold text-white/40 tracking-widest uppercase">Bio-C Tech</div>
          <div className="px-3 py-1.5 bg-white/5 rounded text-[9px] md:text-[11px] font-bold text-white/40 tracking-widest uppercase">QN2e Chip</div>
        </div>
      </motion.div>

      {/* 50-78%: NOISE CANCELLING STAGE */}
      <motion.div 
        style={{ 
          opacity: createFade(0.52, 0.78), 
          x: useTransform(progress, [0.52, 0.62], [40, 0]),
          filter: useTransform(progress, [0.52, 0.57], ["blur(10px)", "blur(0px)"])
        }}
        className="absolute w-full px-6 md:px-20 lg:px-48 text-center md:text-right top-1/2 -translate-y-1/2 max-w-2xl md:right-0 flex flex-col items-center md:items-end"
      >
        <div className="bg-[#00D6FF] w-12 md:w-20 h-1 mb-6 md:mb-12 shadow-[0_0_20px_#00D6FF] mx-auto md:mr-0" />
        <h3 className="text-4xl sm:text-6xl lg:text-9xl font-bold tracking-tighter mb-4 md:mb-10 leading-[0.9] md:leading-[0.8] text-white">
          Digital <br className="hidden md:block" /> Sanctuary.
        </h3>
        <p className="text-base md:text-xl lg:text-2xl text-white/50 leading-relaxed font-light mb-6 md:mb-10">
          The world is loud. Your sanctuary shouldn't be. 8 discrete microphones analyze ambient noise 700 times per second.
        </p>
        <p className="text-[#00D6FF] text-[10px] md:text-sm font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase">Silence, Evolved.</p>
      </motion.div>

      {/* 80-100%: FINAL REASSEMBLY */}
      <motion.div 
        style={{ 
          opacity: createFade(0.82, 1.0),
          scale: useTransform(progress, [0.82, 0.95], [0.95, 1])
        }}
        className="text-center w-full max-w-5xl"
      >
        <h2 className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[12rem] font-black tracking-tighter mb-6 md:mb-12 leading-[0.9] md:leading-[0.75] text-gradient-blue">
          Total <br className="xs:hidden" /> Harmony.
        </h2>
        <p className="text-lg md:text-2xl lg:text-4xl text-white/40 mb-10 md:mb-20 font-light px-4">Crafted for your focus.</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-6">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0, 80, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto px-10 md:px-20 py-4 md:py-8 rounded-full bg-white text-black font-black text-lg md:text-2xl tracking-tight transition-all"
          >
            Pre-order Now
          </motion.button>
          <button className="text-white/20 hover:text-white transition-all text-[9px] md:text-xs font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase border-b border-white/5 hover:border-white/20 pb-2 md:pb-4">
            Technical Specs
          </button>
        </div>
      </motion.div>

    </div>
  );
};

export default ScrollBeatOverlay;
