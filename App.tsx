
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
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
              <div className="absolute inset-0 border-[3px] border-t-[#00D6FF] rounded-full animate-spin" />
            </div>
            <p className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">Initializing Sequence</p>
          </motion.div>
        </div>
      )}
      
      <Navbar progress={smoothProgress} />
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ImageSequencePlayer progress={smoothProgress} />
        <ScrollBeatOverlay progress={smoothProgress} />
      </div>
      
      {/* Scroll Spacer to handle the 600vh height */}
      <div className="h-[500vh]" />
    </main>
  );
};

export default App;
