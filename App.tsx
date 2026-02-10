
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import ImageSequencePlayer from './components/ImageSequencePlayer';
import ScrollBeatOverlay from './components/ScrollBeatOverlay';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.0001
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensuring assets and context are ready
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative bg-[#050505] min-h-[600vh]">
      {!isLoaded && (
        <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-[9999]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-16 h-16 mb-8">
              <div className="absolute inset-0 border-[3px] border-[#0050FF]/20 rounded-full" />
              <div className="absolute inset-0 border-[3px] border-t-[#0050FF] rounded-full animate-spin" />
            </div>
            <h2 className="text-white font-bold tracking-[0.5em] text-[10px] uppercase">Sony Engineering</h2>
            <div className="mt-4 w-48 h-[1px] bg-white/5 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-[#0050FF]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      )}

      <Navbar />
      
      {/* Dynamic Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.6, 0.4]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.5])
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-[radial-gradient(circle_at_center,rgba(0,80,255,0.08)_0%,transparent_60%)]" 
        />
        
        {/* Subtle Scanlines/Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

      {/* Scrollytelling Core */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <ImageSequencePlayer progress={smoothProgress} />
        <ScrollBeatOverlay progress={smoothProgress} />
        
        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
        >
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Scroll to Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>

      {/* End Section */}
      <div className="relative h-screen bg-[#050505] z-10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,80,255,0.1),transparent_70%)]" />
        <div className="relative text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12">Silence, <br className="md:hidden"/> mastered.</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="w-full md:w-auto px-14 py-5 rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white font-bold text-lg hover:shadow-[0_0_40px_rgba(0,80,255,0.4)] transition-all">
                Order Your WH-1000XM6
              </button>
            </div>
            <p className="mt-12 text-white/20 text-sm font-medium tracking-wide">AVAILABLE STARTING FALL 2025</p>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default App;
