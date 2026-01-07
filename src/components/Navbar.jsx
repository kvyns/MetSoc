import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { siteConfig, navLinks } from '../data/pageContent'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 border-b border-orange-500/20 backdrop-blur-xl z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img 
              src={siteConfig.logo}
              alt={siteConfig.name}
              className="h-10 w-auto rounded-full"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              {siteConfig.name}
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-white transition-all hover:scale-105"
              >
                {link.name}
              </Link>
            ))}
            <a
              href={siteConfig.departmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-all hover:scale-105"
            >
              Department
            </a>
            <Link
              to="/edvantage"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full
                bg-gradient-to-r from-orange-500 to-amber-500 
                hover:from-orange-400 hover:to-amber-400
                text-white font-medium transition-all
                hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>EdVantage</span>
              <motion.span 
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-20 blur transition-opacity"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300 hover:text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-slate-900/95 border-b border-orange-500/20 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="w-full text-center px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href={siteConfig.departmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
              >
                Department
              </a>
              <Link
                to="/edvantage"
                className="w-full text-center px-3 py-2 mt-2 rounded-lg
                  bg-gradient-to-r from-orange-500 to-amber-500 
                  text-white font-medium
                  flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                EdVantage
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
