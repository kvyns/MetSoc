import React from 'react'
import { motion } from 'framer-motion'
import { useSheetData } from '../hooks/useSheetData'
import { SHEET_NAMES } from '../services/sheets'
import Loader from '../components/Loader'
import useScrollToTop from '../hooks/useScrollToTop'

const Research = () => {
  useScrollToTop()
  const { data: research, loading, error } = useSheetData('research', 'research')

  if (loading) return <Loader message="Loading research" />

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
            className="inline-block mb-8 px-6 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
          >
            <span className="text-orange-400">Our Research</span>
          </motion.div>
          <h1 className="text-6xl md:text-7xl py-4 font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
            Research Projects
          </h1>
        </motion.div>
      </div>

      {/* Research Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {research.map((project, index) => (
            <motion.div
              key={project.Title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-slate-900/80 rounded-xl border-2 border-orange-500/30 shadow-xl overflow-hidden hover:border-orange-500/50 transition-all h-full flex flex-col"
              whileHover={{ y: -5 }}
            >
              <div className="p-4 flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-lg font-bold mb-4 text-white group-hover:text-orange-400 transition-colors text-center">
                    {project.Title}
                  </h3>
                  
                  <div className="flex flex-wrap justify-center gap-1 mb-4">
                    {project.Areas?.split(',').map(area => (
                      <span 
                        key={area}
                        className="px-2 py-1 rounded-full text-xs bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 backdrop-blur-sm border border-orange-500/30"
                      >
                        {area.trim()}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-slate-300 mb-4 leading-relaxed text-center">
                    {project.Description}
                  </p>
                </div>

                {/* Collaborators section */}
                {project.Collaborators && (
                  <div className="border-t border-orange-500/20 pt-6 mt-auto">
                    <h4 className="text-lg font-semibold text-white mb-4 text-center">Collaborators</h4>
                    <div className="flex flex-wrap justify-center gap-3">
                      {project.Collaborators.split(',').map(collab => {
                        const [name, link] = collab.split('|').map(s => s.trim());
                        return link ? (
                          <a
                            key={name}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-1.5 bg-slate-800/50 rounded-full text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2 text-sm backdrop-blur-sm hover:bg-slate-800/70"
                          >
                            {name}
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <span key={name} className="px-4 py-1.5 bg-slate-800/50 rounded-full text-slate-300 text-sm backdrop-blur-sm">
                            {name}
                          </span>
                        );
                      })}
                    </div>
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

export default Research
