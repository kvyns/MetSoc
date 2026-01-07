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
                'linear-gradient(to right, rgba(249,115,22,0.1), rgba(139,92,246,0.1))',
                'linear-gradient(to right, rgba(139,92,246,0.1), rgba(249,115,22,0.1))',
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
              className="text-6xl md:text-8xl p-2 font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"
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
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white"
                      : "border-2 border-orange-500 text-orange-400 hover:bg-orange-500/10"
                  } rounded-lg transition-all font-semibold`}
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
          <div className="w-6 h-10 border-2 border-orange-400 rounded-full relative">
            <div className="w-1 h-2 bg-orange-400 rounded-full absolute left-1/2 top-2 -translate-x-1/2" />
          </div>
        </motion.div>
      </motion.div>

      {/* EdVantage Section*/}
      <section className="py-24 mt-10 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 border border-orange-500/30 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              ✨ {homeContent.edvantage.badge}
            </motion.span>
            
            <motion.h2 
              className="text-5xl md:text-6xl py-4 font-black mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
                EdVantage
              </span>
              {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
                2026
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {homeContent.edvantage.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.div 
                className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-2 border-orange-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: 'rgba(249,115,22,0.5)' }}
              >
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Calendar className="w-6 h-6 text-orange-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-400 font-medium">Event Dates</p>
                  <p className="text-white font-bold text-lg">Jan 16-17, 2026</p>
                </div>
              </motion.div>
              
              <Link 
                to="/edvantage"
                className="group relative inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold text-lg overflow-hidden shadow-xl shadow-orange-500/30"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Explore EdVantage</span>
                <motion.span 
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
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
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from)_0%,_var(--tw-gradient-to)_100%)] from-violet-500/10 to-transparent" />
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
                  <h3 className="text-lg font-semibold text-white mb-1">Dr. Pratik Ray</h3>
                  <p className="text-orange-400 text-sm">Head of Department - MME</p>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="inline-block px-4 py-1 rounded-full text-sm bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 border border-orange-500/30 mb-4">
                Message from HOD
              </div>
              <h2 className="text-3xl py-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
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
                <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
                <span className="text-slate-400 italic">Head of Department</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Photo Carousel */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Gallery</h2>
          {images.length > 0 ? (
            <div className="relative bg-slate-900/50 rounded-xl overflow-hidden min-h-[400px]">
              {/* Navigation dots at top */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 p-2 bg-slate-900/50 rounded-full backdrop-blur-sm">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide 
                        ? 'bg-orange-400 w-6' 
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
                    <div className="bg-slate-900/95 border-t border-orange-500/20">
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
                              className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 text-sm rounded-full border border-orange-500/30"
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
          <h2 className="text-3xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
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
                  className="group bg-slate-900/80 rounded-xl border-2 border-orange-500/30 shadow-xl overflow-hidden flex flex-col h-full hover:border-orange-500/50 transition-colors"
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
                      <span className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 border border-orange-500/30">
                        {update.Category || 'News'}
                      </span>
                      <span className="text-slate-400 text-sm">
                        {new Date(update.Date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">
                      {update.Title}
                    </h3>
                    
                    <p className="text-slate-300 mb-6 line-clamp-3">
                      {update.Content}
                    </p>

                    {update.Link && (
                      <div className="pt-4 border-t border-orange-500/20">
                        <a 
                          href={update.Link}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-all group-hover:gap-3"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition-all font-semibold"
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
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">{stat.number}</h3>
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
