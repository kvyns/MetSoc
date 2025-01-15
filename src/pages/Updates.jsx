import React from 'react'
import { motion } from 'framer-motion'
import { useSheetData } from '../hooks/useSheetData'
import { SHEET_NAMES } from '../services/sheets'
import Loader from '../components/Loader'

const Updates = () => {
  const { data: updates, loading, error } = useSheetData('updates', 'updates')

  if (loading) return <Loader message="Loading updates" />

  return (
    <div className="min-h-screen pt-24 px-4">
      {/* Hero Section */}
      <div className="relative mb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-block mb-8 px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20"
          >
            <span className="text-cyan-400">Stay Informed</span>
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">
            Latest Updates
          </h1>
        </motion.div>
      </div>

      {/* Updates Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updates.map((update, index) => (
            <motion.div 
              key={update.Title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-slate-900/80 rounded-xl border border-cyan-500/20 shadow-xl overflow-hidden"
            >
              {update.ImageUrl && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={update.ImageUrl}
                    alt={update.Title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-400">
                    {update.Category || 'News'}
                  </span>
                  <span className="text-slate-400 text-sm">
                    {new Date(update.Date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  {update.Title}
                </h3>
                
                <p className="text-slate-300 mb-6">
                  {update.Content}
                </p>

                {update.Link && (
                  <div className="pt-4 border-t border-cyan-500/10">
                    <a 
                      href={update.Link}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all group-hover:gap-3"
                    >
                      Read full article
                      <svg 
                        className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Updates
