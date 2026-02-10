
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  progress: MotionValue<number>;
}

const Navbar: React.FC<NavbarProps> = ({ progress }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Transform for the 'Buy' button animation trigger at 85-100%
  const buyHighlight = useTransform(progress, [0.82, 0.88, 1], [0, 1, 1]);
  const buyScale = useTransform(progress, [0.82, 0.88, 0.92, 1], [1, 1.1, 1, 1]);
  const buyGlow = useTransform(progress, [0.82, 0.88, 1], ["0px 0px 0px rgba(0, 80, 255, 0)", "0px 0px 20px rgba(0, 214, 255, 0.5)", "0px 0px 10px rgba(0, 214, 255, 0.3)"]);

  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsub();
  }, [scrollY]);

  const navLinks = ['Overview', 'Technology', 'Noise Cancelling', 'Specs'];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-[#050505]/80 backdrop-blur-xl py-3 border-white/5' 
          : 'bg-transparent py-4 md:py-6 border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-lg md:text-xl font-bold tracking-tighter text-white">SONY</span>
          <span className="hidden xs:block text-xs font-medium text-white/40 border-l border-white/10 pl-2">WH-1000XM6</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8 text-[13px] font-medium tracking-wide">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-white/60 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
          
          <motion.a 
            href="#"
            style={{ 
              scale: buyScale,
              boxShadow: buyGlow,
              backgroundColor: useTransform(buyHighlight, [0, 1], ["rgba(255,255,255,0)", "rgba(0, 214, 255, 0.1)"]),
              color: useTransform(buyHighlight, [0, 1], ["rgba(255,255,255,0.6)", "rgba(255, 255, 255, 1)"]),
              borderColor: useTransform(buyHighlight, [0, 1], ["rgba(255,255,255,0)", "rgba(0, 214, 255, 0.4)"])
            }}
            whileHover={{
              boxShadow: [
                "0px 0px 10px rgba(0, 214, 255, 0.3)",
                "0px 0px 25px rgba(0, 214, 255, 0.7)",
                "0px 0px 10px rgba(0, 214, 255, 0.3)"
              ],
              transition: { boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }
            }}
            className="px-4 py-1.5 rounded-full border transition-all duration-200 font-bold"
          >
            Buy
          </motion.a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3 md:space-x-6">
          <button className="hidden sm:block text-[12px] md:text-[13px] font-medium text-white/80 hover:text-white transition-colors">
            Pre-order
          </button>
          <button className="bg-gradient-to-br from-[#0050FF] to-[#00D6FF] p-[1px] rounded-full group">
            <div className="bg-[#050505] px-4 md:px-5 py-1.5 md:py-2 rounded-full group-hover:bg-transparent transition-all duration-300">
              <span className="text-[12px] md:text-[13px] font-semibold text-white">Experience</span>
            </div>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden w-8 h-8 flex flex-col items-center justify-center space-y-1.5 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 7 : 0 }} className="w-6 h-0.5 bg-white rounded-full" />
            <motion.div animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} className="w-6 h-0.5 bg-white rounded-full" />
            <motion.div animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -7 : 0 }} className="w-6 h-0.5 bg-white rounded-full" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 py-10 px-6 flex flex-col items-center space-y-8 lg:hidden"
          >
            {navLinks.map((link) => (
              <a key={link} href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold tracking-tighter text-white/80 hover:text-white">
                {link}
              </a>
            ))}
            <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#00D6FF]">Buy Now</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
