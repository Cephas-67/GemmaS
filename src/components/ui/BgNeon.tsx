import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const BgNeon: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const darkMode = mounted && resolvedTheme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ size: 1316.85 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const size = containerRef.current.offsetWidth;
        setDimensions({ size });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { size } = dimensions;

  // Calculate proportional values based on container size
  const borderSize = Math.max(10, size * 0.068); // 6.8% of container
  const radius100 = Math.max(20, size * 0.076); // 7.6% of container
  const radius76 = Math.max(15, size * 0.068); // 5.8% of container

  // Layer configuration (Rendered from back to front)
  const layers = [
    {
      id: 'rectangle-9',
      width: '90%',
      color: darkMode ? 'rgba(49, 230, 57, 0.3)' : 'rgba(49, 230, 57, 0)',
      blur: '50px',
      radius: radius100,
      mixBlend: 'plus-lighter',
      transitionDelay: 0.2, // Slowest glow
    },
    {
      id: 'rectangle-10',
      width: '83.3%',
      color: darkMode ? 'rgba(61, 113, 232, 0.5)' : 'rgba(61, 113, 232, 0)',
      blur: '45px',
      radius: radius100,
      mixBlend: 'plus-lighter',
      transitionDelay: 0.15,
    },
    {
      id: 'rectangle-12',
      width: '67.5%',
      color: darkMode ? 'white' : 'rgba(255, 255, 255, 0)',
      blur: '35px',
      radius: radius100,
      mixBlend: 'plus-lighter',
      transitionDelay: 0.1,
    },
    {
      id: 'rectangle-14',
      width: '67.5%',
      color: darkMode ? 'rgba(255, 217, 105, 0.8)' : 'rgba(255, 217, 105, 0)',
      blur: '25px',
      radius: radius76,
      mixBlend: 'plus-lighter',
      transitionDelay: 0.0, // Closest to tube, lights up first
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center aspect-square"
    >
      {/* Render the back glow halos (Only visible in Dark Mode) */}
      <AnimatePresence>
        {layers.map((layer) => (
          <motion.div
            key={layer.id}
            className={`absolute aspect-square ${darkMode ? layer.mixBlend : ''}`}
            style={{
              width: layer.width,
              border: `${borderSize}px solid ${layer.color}`,
              borderRadius: `${layer.radius}px`,
              filter: `blur(${layer.blur})`,
              rotate: -45, // STATIC - applied instantly, not animated
            }}
            // START FROM 0 opacity and 0.8 scale on mount
            initial={{ opacity: 0 }}
            animate={{
              opacity: darkMode ? 1 : 0,
              scale: darkMode ? 1 : 0.95,
            }}
            // When darkMode turns off, we want 0 opacity/scale
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: {
                duration: 1.8,
                ease: 'easeInOut',
                delay: layer.transitionDelay,
              },
              scale: {
                duration: 1.8,
                ease: 'easeInOut',
                delay: layer.transitionDelay,
              },
            }}
          />
        ))}
      </AnimatePresence>

      {/* 
        Rectangle 13 - The Actual Neon Tube 
      */}
      <motion.div
        className="absolute w-[67.5%] aspect-square z-10"
        style={{
          borderRadius: `${radius76}px`,
          borderWidth: `${borderSize}px`,
          borderStyle: 'solid',
          rotate: -45, // STATIC - applied instantly, not animated
        }}
        // START FROM 0 opacity and slightly smaller on mount
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1, // Always visible once mounted
          borderColor: `${darkMode ? '#ffffff' : '#efefef'}`,
          boxShadow: darkMode
            ? '0 0 30px rgba(255, 217, 105, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.3)'
            : 'inset 6px 6px 10px rgba(0,0,0,0.12), inset 2px 2px 10px rgba(255,255,255,1), 0 8px 25px rgba(0,0,0,0.12)',
          backgroundColor: darkMode ? 'transparent' : 'rgba(255, 255, 255, 0.4)',
          filter: darkMode ? 'blur(1px)' : 'blur(0px)',
        }}
        transition={{
          duration: 1.2,
          ease: 'easeInOut',
          // Slight delay so the tube appears before the outermost halos
          delay: 0.1,
        }}
      />

      {/* Here another rectangle to mimic 3d effect */}
      <motion.div
        className="absolute w-[67.5%] aspect-square z-10"
        style={{
          borderRadius: `${radius76}px`,
          rotate: -45, // STATIC - applied instantly, not animated
        }}
        // START FROM 0 opacity and slightly smaller on mount
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1, // Always visible once mounted
          borderColor: `${darkMode ? '#ffffff' : '#e5e7eb'}`,
          boxShadow: darkMode
            ? '0 0 30px rgba(255, 217, 105, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.3)'
            : 'inset 6px 6px 6px rgba(0,0,0,0.05), inset 2px 2px 10px rgba(255,255,255,1), 0 8px 25px rgba(0,0,0,0.12)',
          backgroundColor: darkMode ? 'transparent' : 'rgba(255, 255, 255, 0.4)',
          filter: darkMode ? 'blur(1px)' : 'blur(0px)',
        }}
        transition={{
          duration: 1.2,
          ease: 'easeInOut',
          // Slight delay so the tube appears before the outermost halos
          delay: 0.1,
        }}
      />
    </div>

  );
};

export default BgNeon;