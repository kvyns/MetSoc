import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import { useSheetData } from '../hooks/useSheetData'
import { SHEET_NAMES } from '../services/sheets'
import Loader from '../components/Loader'
import { useData } from '../context/DataContext'
import { homeContent } from '../data/pageContent'
import useScrollToTop from '../hooks/useScrollToTop'
// import ParticlesBackground from '../components/ParticlesBackground'

const Home = () => {
  useScrollToTop()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [failedImages, setFailedImages] = useState(new Set())
  
  // Add refs to prevent multiple error logs
  const errorLogsRef = useRef(new Set())

  const { data: updates, loading: updatesLoading } = useSheetData('updates', 'updates', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    staleTime: 300000, // 5 minutes
    cacheTime: 3600000 // 1 hour
  })
  
  const { data: galleryImages, loading: galleryLoading } = useSheetData('gallery', 'gallery', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    staleTime: 300000,
    cacheTime: 3600000
  })
  
  const { data: events, loading: eventsLoading } = useSheetData('events', 'events', {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    staleTime: 300000,
    cacheTime: 3600000
  })

  const { fetchData } = useData();

  // Process images once when galleryImages changes
  const images = React.useMemo(() => {
    return galleryImages
      ?.filter(item => {
        const isActive = String(item.active || '').toLowerCase();
        return isActive === 'true' || isActive === '1' || isActive === 'yes';
      })
      ?.sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
      ?.map(item => ({
        url: item.imageUrl || item.url || '',
        title: item.title || '',
        description: item.description || '',
        category: item.category || 'general',
        date: item.date ? new Date(item.date) : new Date()
      }))
      .filter(item => item.url && item.url.trim() !== '' && !failedImages.has(item.url))
      || [];
  }, [galleryImages, failedImages]);

  // Handle image errors with debouncing
  const handleImageError = useCallback((url) => {
    if (!errorLogsRef.current.has(url)) {
      errorLogsRef.current.add(url);
      console.error(`Failed to load image: ${url}`);
      setFailedImages(prev => new Set(prev).add(url));
    }
  }, []);

  // Add debug logging to check the data structure
  // console.log('Raw Gallery Data:', galleryImages);
  // console.log('Processed Images:', images);

  // Filter EdVantage events from all events
  const edvantageEvent = events?.find(event => event.Category?.toLowerCase() === 'edvantage') || {}

  useEffect(() => {
    if (images.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [images.length])

  // Prefetch other data
  useEffect(() => {
    const prefetchData = async () => {
      const sheets = ['research', 'teams'];
      sheets.forEach(sheet => {
        fetchData(sheet).catch(() => {
          console.log(`Background prefetch failed for ${sheet}`);
        });
      });
    };
    
    prefetchData();
  }, [fetchData]);

  // Show loading state only during initial load
  if (updatesLoading || galleryLoading || eventsLoading) {
    return <Loader message="Hold tight as we mold the materials into a masterpiece!" />
  }

  // Show placeholder content if any data is missing
  if (!updates || !galleryImages || !events) {
    return <Loader message="Preparing content" />
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[80vh] bg-slate-900 overflow-hidden"
      >
        {/* Interactive background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/50" />
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(to right, rgba(6,182,212,0.1), rgba(16,185,129,0.1))',
                'linear-gradient(to right, rgba(16,185,129,0.1), rgba(6,182,212,0.1))',
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center h-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl md:text-8xl p-2 font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400"
            >
              {homeContent.hero.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-3xl text-slate-300 text-center max-w-3xl mx-auto leading-relaxed"
            >
              {homeContent.hero.subtitle}
            </motion.p>
            
            {/* CTA buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-4 justify-center mt-8"
            >
              {homeContent.hero.buttons.map(button => (
                <Link
                  key={button.link}
                  to={button.link}
                  className={`px-6 py-3 ${
                    button.link === "/about"
                      ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                      : "border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  } rounded-lg transition-colors`}
                >
                  {button.text}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full relative">
            <div className="w-1 h-2 bg-cyan-400 rounded-full absolute left-1/2 top-2 -translate-x-1/2" />
          </div>
        </motion.div>
      </motion.div>

      {/* EdVantage Section*/}
      <section className="py-24 mt-10 bg-slate-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <span className="inline-block px-4 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-400 mb-6">
              {homeContent.edvantage.badge}
            </span>
            <h2 className="text-4xl py-4 md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-6">
              {homeContent.edvantage.title}
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
              {homeContent.edvantage.description}
            </p>
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="flex items-center gap-3 text-slate-300">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>Jan 24-25, 2025</span>
              </div>
              <Link 
                to="/edvantage"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:opacity-90 transition-all"
              >
                Learn More
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOD Message */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-slate-900/30 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from)_0%,_var(--tw-gradient-to)_100%)] from-cyan-500/10 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="col-span-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative max-w-[280px] mx-auto md:max-w-[280px] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <img 
                  src="/assets/hod/hod.png" 
                  alt="HOD" 
                  className="w-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">Dr. Neha Sardana</h3>
                  <p className="text-cyan-400 text-sm">Head of Department - MME</p>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="inline-block px-4 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-400 mb-4">
                Message from HOD
              </div>
              <h2 className="text-3xl py-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Shaping the Future of Materials Science
              </h2>
              <div className="space-y-4">
                <p className="text-slate-300 text-lg leading-relaxed">
                  Welcome to the Department of Metallurgical and Materials Engineering at IIT Ropar. 
                  Our department is committed to excellence in education and research, fostering an 
                  environment where innovation thrives and future leaders are shaped.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Through MetSoc, we aim to bridge the gap between academic learning and industrial 
                  applications, providing our students with hands-on experience and exposure to 
                  cutting-edge developments in the field.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-4">
                <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full" />
                <span className="text-slate-400 italic">Head of Department</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Photo Carousel */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center text-cyan-400">Gallery</h2>
          {images.length > 0 ? (
            <div className="relative bg-slate-900/50 rounded-xl overflow-hidden min-h-[400px]">
              {/* Navigation dots at top */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 p-2 bg-slate-900/50 rounded-full backdrop-blur-sm">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide 
                        ? 'bg-cyan-400 w-6' 
                        : 'bg-slate-400/50 hover:bg-slate-400/80'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>

              {/* Images and Captions */}
              <div className="flex flex-col">
                {images.map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentSlide ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 ${index === currentSlide ? 'relative' : ''}`}
                  >
                    <div className="flex items-center justify-center p-2 min-h-[400px] bg-slate-950/20">
                      <img 
                        src={img.url} 
                        alt={img.title} 
                        className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg"
                        onError={() => handleImageError(img.url)}
                        loading="lazy" // Add lazy loading
                      />
                    </div>

                    {/* Caption Section*/}
                    <div className="bg-slate-900/95 border-t border-cyan-500/20">
                      <div className="py-3 px-6">
                        <div className="max-w-3xl mx-auto text-center">
                          <motion.h3 
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl font-semibold text-white mb-1"
                          >
                            {img.title}
                          </motion.h3>
                          <motion.p 
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-slate-300 text-sm"
                          >
                            {img.description}
                          </motion.p>
                          {img.category && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                              className="inline-block mt-2 px-3 py-1 bg-cyan-500/10 text-cyan-400 text-sm rounded-full"
                            >
                              {img.category}
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[600px] rounded-xl bg-slate-800/50 flex items-center justify-center">
              <p className="text-slate-400">No gallery images available</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Latest Updates
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/*Top 3 updates*/}
            {updates
              .sort((a, b) => new Date(b.Date) - new Date(a.Date))
              .slice(0, 3)
              .map((update, index) => (
                <motion.div 
                  key={update.Title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-slate-900/80 rounded-xl border border-cyan-500/20 shadow-xl overflow-hidden flex flex-col h-full"
                >
                  {update.ImageUrl && (
                    <div className="relative w-full h-48 overflow-hidden bg-slate-800">
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <img 
                          src={update.ImageUrl}
                          alt={update.Title}
                          className="absolute w-full h-full object-cover object-center scale-[1.01] transition-transform duration-500 group-hover:scale-110 origin-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-400">
                        {update.Category || 'News'}
                      </span>
                      <span className="text-slate-400 text-sm">
                        {new Date(update.Date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {update.Title}
                    </h3>
                    
                    <p className="text-slate-300 mb-6 line-clamp-3">
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
          
          {/* View All Updates Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link
              to="/updates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              View All Updates
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Statistics/Numbers - Updated to use homeContent */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {homeContent.stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-cyan-400">{stat.number}</h3>
                <p className="text-slate-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default React.memo(Home) // Add memo to prevent unnecessary re-renders
