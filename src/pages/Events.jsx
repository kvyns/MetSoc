import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSheetData } from '../hooks/useSheetData'
import { SHEET_NAMES } from '../services/sheets'
import Loader from '../components/Loader'
import useScrollToTop from '../hooks/useScrollToTop'

// date formatter 
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    return dateString || 'TBA';
  }
};

const Events = () => {
  useScrollToTop()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { data: events, loading, error } = useSheetData('events', 'events')

  
  useEffect(() => {
    if (events?.length > 0) {
      console.log('Available categories:', [...new Set(events.map(event => event.Category))]);
    }
  }, [events]);

  // unique categories events data - memoized
  const categories = useMemo(() => 
    ['all', ...(events ? [...new Set(events.map(event => event.Category))] : [])],
    [events]
  );

  const filteredEvents = useMemo(() => 
    selectedCategory === 'all' 
      ? events 
      : events?.filter(event => event.Category?.toLowerCase() === selectedCategory.toLowerCase()),
    [events, selectedCategory]
  );

  // Updated loading state
  if (loading) {
    return <Loader message="Loading events" />;
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <div className="text-red-400 mb-4">Error loading events</div>
        <div className="text-slate-400 text-sm">{error.message}</div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <div className="text-orange-400 mb-4">No events found</div>
        <div className="text-slate-400 text-sm">
          Data received: {JSON.stringify(events, null, 2)}
        </div>
      </div>
    );
  }

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
            className="inline-block mb-8 px-6 py-2 mt-8 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
          >
            <span className="text-orange-400">Stay Updated</span>
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold mb-8 py-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 h-auto">
            Upcoming Events
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join us in our upcoming events and be part of the metallurgical community
          </p>
        </motion.div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />
          <motion.div
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-violet-500/5"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category || 'all'}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border ${
                selectedCategory.toLowerCase() === (category || 'all').toLowerCase()
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 border-transparent text-white'
                  : 'border-orange-500/30 text-slate-300 hover:bg-orange-500/10'
              } transition-all capitalize`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category || 'All'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          layout
          className="grid md:grid-cols-3 lg:grid-cols-4 gap-6" // Changed grid and gap
        >
          <AnimatePresence mode="wait">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={`${event.Title}-${index}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-slate-900/80 rounded-xl border-2 border-orange-500/30 shadow-xl backdrop-blur-xl hover:border-orange-500/50 transition-all flex flex-col h-full overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Image Section */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img 
                    src={event.ImageUrl || '/event-placeholder.jpg'} 
                    alt={event.Title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/*gradient overlay*/}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30" />
                  
                  {/*category badge*/}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm ${
                      event.Category?.toLowerCase() === 'technical' ? 'bg-orange-500/30 text-orange-300 border border-orange-500/50' :
                      event.Category?.toLowerCase() === 'workshop' ? 'bg-violet-500/30 text-violet-300 border border-violet-500/50' :
                      'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                    }`}>
                      {event.Category || 'Uncategorized'}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-2 text-white group-hover:text-orange-400 transition-colors leading-tight text-center">
                    {event.Title || 'Untitled Event'}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4 text-orange-400">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-base">{formatDate(event.Date)}</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-4 flex-grow leading-relaxed text-center">
                    {event.Description || 'No description available'}
                  </p>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-orange-500/20 mt-auto">
                    <div className="flex items-center gap-2 text-slate-400">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{event.Location || 'TBA'}</span>
                    </div>
                    {event.RegisterLink && (
                      <a 
                        href={event.RegisterLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:text-orange-300 transition-colors whitespace-nowrap"
                      >
                        Register →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Events