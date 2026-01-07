import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSheetData } from '../hooks/useSheetData'
import { edvantageContent } from '../data/pageContent'
import Loader from '../components/Loader'
import { Calendar, Clock, MapPin, Users, CheckCircle, ArrowRight, Coffee, Download, Sparkles, Star, Zap, Award, Target } from 'lucide-react'
import { formatTime, formatDate, formatEventDates, formatRegistrationDeadline } from '../utils/formatters'
import useScrollToTop from '../hooks/useScrollToTop'

const EventTypes = {
  MAIN: 'main',
  WORKSHOP: 'workshop',
  PANEL: 'panel',
  BREAK: '-'
};

const EventTypeColors = {
  [EventTypes.MAIN]: 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 border-orange-500/30',
  [EventTypes.WORKSHOP]: 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30',
  [EventTypes.PANEL]: 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30',
  [EventTypes.BREAK]: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
};

const EventIcons = {
  [EventTypes.MAIN]: Star,
  [EventTypes.WORKSHOP]: Users,
  [EventTypes.PANEL]: Target,
  [EventTypes.BREAK]: Coffee
};

const EdVantage = () => {
  useScrollToTop()
  const [hoveredEvent, setHoveredEvent] = useState(null)
  const { data: edvantageEvents, loading } = useSheetData('edvantage')
  
  const { mainEvent, scheduleByDay } = useMemo(() => {
    if (!edvantageEvents?.length) return { mainEvent: {}, scheduleByDay: {} };

    // Sort events by Order field
    const sortedEvents = [...edvantageEvents].sort((a, b) => a.Order - b.Order);
    
    // Get the main event info
    const mainEvent = sortedEvents.find(event => 
      event.Type?.toLowerCase() === 'main'
    ) || sortedEvents[0] || {};

    // Remove the main event from schedule display if it exists
    const scheduleEvents = sortedEvents.filter(event => 
      event.Type?.toLowerCase() !== 'main'
    );

    // Group events by date
    const scheduleByDay = scheduleEvents.reduce((acc, event) => {
      const date = formatDate(event.Date);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});

    return { mainEvent, scheduleByDay };
  }, [edvantageEvents]);

  if (loading) {
    return <Loader message="Loading EdVantage details..." />
  }

  if (!Object.keys(scheduleByDay).length) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl text-cyan-400">No EdVantage events found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(249,115,22,0.1), transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(139,92,246,0.1), transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(249,115,22,0.1), transparent 50%)',
              ],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side Event Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div>
                <motion.div 
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 border border-orange-500/30 mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4" />
                  Premier Career Workshop
                </motion.div>
                <motion.h1 
                  className="text-6xl md:text-7xl py-4 font-black mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 drop-shadow-lg">
                    EdVantage
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
                    2026
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-slate-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Join us for an immersive two-day journey into the future of metallurgical engineering. 
                  Connect with industry leaders, explore cutting-edge research, and shape your career path.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { text: 'Industry Expert Talks', icon: Star },
                  { text: 'Hands-on Workshops', icon: Award },
                  { text: 'Networking Sessions', icon: Users },
                  { text: 'Career Guidance', icon: Target },
                  { text: 'Research Showcase', icon: Sparkles },
                  { text: 'Technical Competitions', icon: Zap }
                ].map((highlight, index) => (
                  <motion.div
                    key={highlight.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm group cursor-pointer"
                  >
                    <motion.div
                      className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-violet-500/20 group-hover:from-orange-500/30 group-hover:to-violet-500/30 transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <highlight.icon className="w-5 h-5 text-orange-400" />
                    </motion.div>
                    <span className="text-slate-200 font-medium">{highlight.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side - Registration Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-violet-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-10 shadow-2xl">
                <motion.div 
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/30 to-transparent rounded-bl-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                      Register Now
                    </h3>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-8 h-8 text-amber-400" />
                    </motion.div>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-orange-500/20"
                      whileHover={{ scale: 1.02, borderColor: 'rgba(249,115,22,0.5)' }}
                    >
                      <div className="p-2 rounded-lg bg-orange-500/20">
                        <Calendar className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Event Dates</p>
                        <p className="text-white font-semibold">
                          {formatEventDates(mainEvent.StartDate, mainEvent.EndDate) || 'Jan 16-17, 2026'}
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-violet-500/20"
                      whileHover={{ scale: 1.02, borderColor: 'rgba(139,92,246,0.5)' }}
                    >
                      <div className="p-2 rounded-lg bg-violet-500/20">
                        <MapPin className="w-6 h-6 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Venue</p>
                        <p className="text-white font-semibold">{mainEvent.Venue || 'IIT Ropar'}</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {mainEvent.RegistrationDeadline && (
                    <motion.div 
                      className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-5 border border-orange-500/30"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <p className="text-orange-400 text-sm font-semibold mb-1">⏰ Registration Deadline</p>
                      <p className="text-white font-bold text-lg">
                        {formatRegistrationDeadline(mainEvent.RegistrationDeadline)}
                      </p>
                    </motion.div>
                  )}

                  <motion.a
                    href={mainEvent.RegistrationLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block w-full text-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold text-lg overflow-hidden shadow-lg shadow-orange-500/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Register for EdVantage
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.a>

                  {mainEvent.RegistrationFee && (
                    <p className="text-center text-sm text-slate-400">
                      💰 Registration Fee: <span className="text-orange-400 font-semibold">{mainEvent.RegistrationFee}</span>
                    </p>
                  )}

                  {mainEvent.EventBrochureLink && (
                    <motion.a
                      href={mainEvent.EventBrochureLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-slate-800/80 border-2 border-violet-500/30 text-violet-400 rounded-xl hover:bg-slate-800 hover:border-violet-500/50 transition-all font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-5 h-5" />
                      Download Event Brochure
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Schedule*/}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400 border border-violet-500/30 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Detailed Agenda
            </motion.div>
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-violet-400 to-pink-400 mb-4">
              Event Schedule
            </h2>
            <p className="text-slate-400 text-lg">Experience two days of innovation and learning</p>
          </motion.div>

          <div className="space-y-8">
            {Object.entries(scheduleByDay).map(([date, events], dayIndex) => (
              <motion.div 
                key={date} 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: dayIndex * 0.2 }}
              >
                {/* Date Header */}
                <motion.div 
                  className="sticky top-20 z-10 mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl border-2 border-orange-500/30 p-5 shadow-lg shadow-orange-500/10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold flex items-center gap-4">
                        <motion.div 
                          className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Calendar className="w-6 h-6 text-orange-400" />
                          <span className="text-orange-400 font-black">Day {dayIndex + 1}</span>
                        </motion.div>
                        <span className="text-slate-600">•</span>
                        <span className="text-white">{date}</span>
                      </h3>
                      <div className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/30">
                        <span className="text-violet-400 font-semibold">{events.length} Events</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Events Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  {events.map((event, eventIndex) => {
                    const typeColor = EventTypeColors[event.Type?.toLowerCase()] || EventTypeColors[EventTypes.MAIN];
                    const isBreak = event.Type?.toLowerCase() === EventTypes.BREAK;
                    const EventIcon = EventIcons[event.Type?.toLowerCase()] || Star;

                    return (
                      <motion.div
                        key={event.Title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: eventIndex * 0.05 }}
                        onMouseEnter={() => setHoveredEvent(event.Title)}
                        onMouseLeave={() => setHoveredEvent(null)}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className={`relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border-2 overflow-hidden
                          ${isBreak ? 'border-slate-700/30 md:col-span-2' : 'border-slate-700/50'} 
                          p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group`}
                      >
                        <AnimatePresence>
                          {hoveredEvent === event.Title && !isBreak && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-violet-500/10 to-pink-500/10"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
                        </AnimatePresence>

                        <div className="relative z-10">
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3 flex-wrap">
                              <motion.div 
                                className="flex items-center gap-2 bg-slate-900/70 px-4 py-2 rounded-xl border border-slate-700/50"
                                whileHover={{ scale: 1.05 }}
                              >
                                <Clock className="w-4 h-4 text-orange-400" />
                                <span className="text-orange-400 text-sm font-bold">{formatTime(event.Time)}</span>
                              </motion.div>
                              <motion.span 
                                className={`px-4 py-2 rounded-xl text-sm font-bold border ${typeColor}`}
                                whileHover={{ scale: 1.05 }}
                              >
                                <EventIcon className="inline-block w-4 h-4 mr-1.5" />
                                {event.Type}
                              </motion.span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors leading-tight">
                              {event.Title}
                            </h4>
                            {event.Description && (
                              <p className="text-slate-300 text-sm leading-relaxed">
                                {event.Description}
                              </p>
                            )}

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                              {event.Venue && (
                                <motion.div 
                                  className="flex items-center gap-2 text-slate-400 text-sm"
                                  whileHover={{ x: 5 }}
                                >
                                  <div className="p-1.5 rounded-lg bg-violet-500/20">
                                    <MapPin className="w-4 h-4 text-violet-400" />
                                  </div>
                                  <span className="font-medium">{event.Venue}</span>
                                </motion.div>
                              )}
                              {event.Speakers && (
                                <motion.div 
                                  className="flex items-center gap-2 text-slate-400 text-sm"
                                  whileHover={{ x: 5 }}
                                >
                                  <div className="p-1.5 rounded-lg bg-pink-500/20">
                                    <Users className="w-4 h-4 text-pink-400" />
                                  </div>
                                  <span className="font-medium">{event.Speakers}</span>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>

                        {!isBreak && (
                          <motion.div
                            className="absolute top-4 right-4 w-2 h-2 rounded-full bg-orange-400"
                            animate={{
                              scale: hoveredEvent === event.Title ? [1, 1.5, 1] : 1,
                              opacity: hoveredEvent === event.Title ? [1, 0.5, 1] : 0.5,
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              className="inline-block mb-16"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-violet-500/20 blur-2xl rounded-full" />
                <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border-2 border-orange-500/30 p-12 shadow-2xl">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-8 h-8 text-amber-400" />
                  </motion.div>

                  <motion.h2 
                    className="text-4xl md:text-5xl font-black mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
                      {edvantageContent.sponsor.title}
                    </span>
                  </motion.h2>
                  
                  <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                    {edvantageContent.sponsor.description}
                  </p>
                  
                  {mainEvent.SponsorBrochureLink && (
                    <motion.a
                      href={mainEvent.SponsorBrochureLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-orange-500/30 group overflow-hidden relative"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <Sparkles className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">{edvantageContent.sponsor.buttonText}</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="relative z-10"
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </motion.a>
                  )}
                  
                  <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-700/50">
                    {[
                      { icon: Star, label: 'Premium Visibility', color: 'from-orange-500 to-amber-500' },
                      { icon: Users, label: 'Direct Engagement', color: 'from-violet-500 to-purple-500' },
                      { icon: Award, label: 'Brand Recognition', color: 'from-pink-500 to-rose-500' }
                    ].map((benefit, index) => (
                      <motion.div
                        key={benefit.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50"
                      >
                        <motion.div
                          className={`p-3 rounded-xl bg-gradient-to-br ${benefit.color} bg-opacity-20`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <benefit.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <span className="text-slate-300 text-sm font-semibold text-center">
                          {benefit.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EdVantage;
