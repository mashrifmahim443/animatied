
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
    return useTransform(progress, [start, start + 0.05, end - 0.05, end], [40, 0, 0, -40]);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-center items-center px-10 md:px-32 overflow-hidden">
      
      {/* 0-15%: HERO */}
      <motion.div 
        style={{ opacity: createFade(0, 0.18), y: createTranslateY(0, 0.18) }}
        className="text-center max-w-5xl"
      >
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.5 }}
          className="inline-block text-[#0050FF] font-bold text-[10px] uppercase mb-8"
        >
          Engineered for Absolute Silence
        </motion.span>
        <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter mb-6 text-white leading-[0.75] drop-shadow-2xl">
          1000XM6
        </h1>
        <p className="text-xl md:text-2xl font-light text-white/40 tracking-widest uppercase">The Sound of Perfection</p>
      </motion.div>

      {/* 20-45%: EXPLODED ENGINEERING (Matching the mid-point of your sequence) */}
      <motion.div 
        style={{ 
          opacity: createFade(0.2, 0.48), 
          x: useTransform(progress, [0.2, 0.3], [-60, 0])
        }}
        className="absolute left-16 md:left-40 top-1/2 -translate-y-1/2 max-w-xl text-left"
      >
        <div className="bg-[#0050FF] w-16 h-1 mb-10" />
        <h3 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.85] text-white">
          Beyond <br/> Parts.
        </h3>
        <p className="text-lg md:text-2xl text-white/60 leading-relaxed font-light mb-8">
          31 custom-machined components working in millisecond synchronicity. 
          The largest driver ever fitted to a Sony flagship.
        </p>
        <div className="flex space-x-4">
          <span className="px-3 py-1 border border-white/10 rounded text-[10px] text-white/40 font-bold uppercase tracking-widest">Titanium Coils</span>
          <span className="px-3 py-1 border border-white/10 rounded text-[10px] text-white/40 font-bold uppercase tracking-widest">Liquid Crystal Polymer</span>
        </div>
      </motion.div>

      {/* 50-75%: INTELLIGENT NOISE CANCELLING */}
      <motion.div 
        style={{ 
          opacity: createFade(0.52, 0.78), 
          x: useTransform(progress, [0.52, 0.62], [60, 0])
        }}
        className="absolute right-16 md:right-40 top-1/2 -translate-y-1/2 max-w-xl text-right flex flex-col items-end"
      >
        <div className="bg-[#00D6FF] w-16 h-1 mb-10" />
        <h3 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.85] text-white">
          Active <br/> Intelligence.
        </h3>
        <p className="text-lg md:text-2xl text-white/60 leading-relaxed font-light mb-8">
          The QN2e Processor. Redefining what it means to be truly alone with your music.
        </p>
        <p className="text-[#00D6FF] text-sm font-bold tracking-[0.3em] uppercase">8 Microphones. 1 Goal.</p>
      </motion.div>

      {/* 80-100%: REASSEMBLY & CALL TO ACTION */}
      <motion.div 
        style={{ 
          opacity: createFade(0.82, 1.0),
          scale: useTransform(progress, [0.82, 1], [0.9, 1])
        }}
        className="text-center max-w-4xl"
      >
        <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-10 leading-[0.8] text-gradient-blue">
          Absolute <br/> Focus.
        </h2>
        <p className="text-xl md:text-3xl text-white/50 mb-16 font-light">The next generation of sound is here.</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(0, 80, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-6 rounded-full bg-white text-black font-black text-xl tracking-tight transition-all"
          >
            Experience XM6
          </motion.button>
          <button className="text-white/40 hover:text-white transition-all text-sm font-bold tracking-[0.4em] uppercase border-b border-white/10 pb-2">
            Explore All Specs
          </button>
        </div>
      </motion.div>

    </div>
  );
};

export default ScrollBeatOverlay;
