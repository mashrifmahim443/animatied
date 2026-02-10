
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b border-white/0 ${
        isScrolled 
          ? 'bg-[#050505]/80 backdrop-blur-xl py-3 border-white/5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tighter text-white">SONY</span>
          <span className="text-sm font-medium text-white/40 border-l border-white/10 pl-2">WH-1000XM6</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-[13px] font-medium tracking-wide">
          {['Overview', 'Technology', 'Noise Cancelling', 'Specs'].map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-white/60 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center space-x-6">
          <button className="hidden sm:block text-[13px] font-medium text-white/80 hover:text-white transition-colors">
            Pre-order
          </button>
          <button className="bg-gradient-to-br from-[#0050FF] to-[#00D6FF] p-[1px] rounded-full group">
            <div className="bg-[#050505] px-5 py-2 rounded-full group-hover:bg-transparent transition-all duration-300">
              <span className="text-[13px] font-semibold text-white">Experience Now</span>
            </div>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
