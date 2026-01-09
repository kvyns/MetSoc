import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tips = [
  "MetSoc bridges academia and industry in metallurgy",
  "We organize workshops, seminars, and technical events",
  "Join us to explore cutting-edge research in materials science",
  "Connect with leading professionals and researchers",
  "Participate in hands-on workshops and competitions",
  "Stay updated with the latest metallurgical innovations",
  "Be part of India's premier metallurgy student chapter",
  "Network with industry leaders and alumni"
];

const Loader = ({ message = "Loading...", showTips = true }) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Rotate tips every 3 seconds
    if (showTips) {
      const tipInterval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 3000);
      return () => clearInterval(tipInterval);
    }
  }, [showTips]);

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 300);
    return () => clearInterval(progressInterval);
  }, []);
  return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated floating orbs */}
        <div className="relative w-24 h-24">
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Rotating rings */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-orange-500/50"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-amber-400/50"
            animate={{ rotate: -360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Center pulsing dot */}
          <motion.div
            className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Orbiting particles */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-4px',
                marginTop: '-4px',
              }}
              animate={{
                x: [
                  Math.cos((angle * Math.PI) / 180) * 30,
                  Math.cos(((angle + 360) * Math.PI) / 180) * 30,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 30,
                  Math.sin(((angle + 360) * Math.PI) / 180) * 30,
                ],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Loading text with animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 text-center max-w-md"
      >
        <motion.div 
          className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 mb-3 font-bold text-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {message}
        </motion.div>
        
        {/* Progress bar */}
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Rotating tips */}
        {showTips && (
          <div className="min-h-[60px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTip}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-slate-400 text-sm px-4 text-center"
              >
                💡 {tips[currentTip]}
              </motion.p>
            </AnimatePresence>
          </div>
        )}
        <div className="text-slate-400 text-sm">Please wait while we fetch the latest data</div>
        
        {/* Loading dots */}
        <div className="flex gap-2 justify-center mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-orange-400"
              animate={{
                y: [-4, 0, -4],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
export default Loader