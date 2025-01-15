import React from 'react'
import { motion } from 'framer-motion'

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
      <div className="relative">
        {/* Gradient animation */}
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 blur-sm"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-1 rounded-full bg-slate-900"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-500"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>
      
      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center"
      >
        <div className="text-cyan-400 mb-2 font-medium text-lg">{message}</div>
        <div className="text-slate-400 text-sm">Please wait while we fetch the latest data</div>
      </motion.div>
    </div>
  )
}
export default Loader