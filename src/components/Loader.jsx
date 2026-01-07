import React from 'react'
import { motion } from 'framer-motion'

const Loader = ({ message = "Loading..." }) => {
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
        className="mt-12 text-center"
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