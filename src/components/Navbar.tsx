'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const navbarBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(17, 24, 39, 0.2)', 'rgba(17, 24, 39, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '/', label: 'หน้าแรก' },
    { href: '/about', label: 'เกี่ยวกับ' },
    { href: '/portfolio', label: 'ผลงาน' },
    { href: '/skills', label: 'ทักษะ' },
    { href: '/contact', label: 'ติดต่อ' }
  ];

  return (
    <motion.nav
      style={{ backgroundColor: navbarBackground }}
      className={`sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 transition-all duration-500 ${
        scrolled ? 'px-4 py-2 shadow-2xl shadow-blue-500/10' : 'px-8 py-4'
      }`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        {/* Logo/Brand */}
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className={`bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center relative overflow-hidden ${
              scrolled ? 'w-8 h-8' : 'w-12 h-12'
            }`}
            whileHover={{ 
              rotate: 360,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className={`text-white font-bold relative z-10 transition-all duration-300 ${
                scrolled ? 'text-base' : 'text-xl'
              }`}
              animate={{ 
                scale: scrolled ? 0.8 : 1,
                transition: { duration: 0.3 }
              }}
            >
              P
            </motion.span>
          </motion.div>
          <motion.span 
            className={`text-white font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent transition-all duration-500 ${
              scrolled ? 'text-lg' : 'text-2xl'
            }`}
            animate={{ 
              fontSize: scrolled ? '1.125rem' : '1.5rem',
              transition: { duration: 0.3 }
            }}
          >
            Portfolio
          </motion.span>
        </motion.div>

        {/* Desktop Menu */}
        <motion.div 
          className="hidden md:flex items-center space-x-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {menuItems.map((item, index) => (
            <motion.div 
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <Link href={item.href}>
                <motion.div
                  className="relative px-4 py-2 text-gray-300 font-medium cursor-pointer group"
                  whileHover={{ 
                    color: '#ffffff',
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-20">{item.label}</span>
                  
                  {/* Hover background with glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg shadow-lg shadow-blue-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { duration: 0.2 }
                    }}
                  />
                  
                  {/* Top highlight bar */}
                  <motion.div
                    className="absolute top-0 left-1/2 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0, x: '-50%' }}
                    whileHover={{ 
                      width: '80%',
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  />
                  
                  {/* Bottom underline */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                    initial={{ width: 0, x: '-50%' }}
                    whileHover={{ 
                      width: '100%',
                      transition: { duration: 0.3, ease: "easeOut", delay: 0.1 }
                    }}
                  />
                  
                  {/* Side indicators */}
                  <motion.div
                    className="absolute left-0 top-1/2 w-1 h-0 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"
                    initial={{ height: 0, y: '-50%' }}
                    whileHover={{ 
                      height: '60%',
                      transition: { duration: 0.2, delay: 0.1 }
                    }}
                  />
                  
                  <motion.div
                    className="absolute right-0 top-1/2 w-1 h-0 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
                    initial={{ height: 0, y: '-50%' }}
                    whileHover={{ 
                      height: '60%',
                      transition: { duration: 0.2, delay: 0.15 }
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="hidden md:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <motion.button
            className="relative px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ 
                x: '100%',
                transition: { duration: 0.6 }
              }}
            />
            <span className="relative z-10 flex items-center space-x-2">
              <span>ดาวน์โหลด CV</span>
              <motion.svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-white p-2 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            scale: 1.1
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="w-6 h-6 relative">
            <motion.span 
              className="absolute top-0 left-0 w-full h-0.5 bg-white"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 10 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className="absolute top-2.5 left-0 w-full h-0.5 bg-white"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className="absolute top-5 left-0 w-full h-0.5 bg-white"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -10 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="mt-4 p-4 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/10"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col space-y-1">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={item.href}>
                      <motion.div
                        className="relative px-4 py-3 text-gray-300 font-medium rounded-xl cursor-pointer overflow-hidden"
                        onClick={() => setIsMenuOpen(false)}
                        whileHover={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          x: 8,
                          boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center space-x-3 relative z-10">
                          <motion.div 
                            className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                            initial={{ scale: 0 }}
                            whileHover={{ 
                              scale: 1.5,
                              boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)"
                            }}
                            transition={{ duration: 0.2 }}
                          />
                          <span>{item.label}</span>
                        </div>
                        
                        {/* Mobile highlight bar */}
                        <motion.div
                          className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500"
                          initial={{ scaleY: 0 }}
                          whileHover={{ 
                            scaleY: 1,
                            transition: { duration: 0.2 }
                          }}
                          style={{ originY: 0 }}
                        />
                        
                        {/* Mobile shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ 
                            x: '100%',
                            transition: { duration: 0.6 }
                          }}
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
                <motion.button 
                  className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: menuItems.length * 0.05 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  ดาวน์โหลด CV
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}