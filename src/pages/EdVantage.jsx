import React, { useMemo, useState } from 'react' // Add useState
import { motion, AnimatePresence } from 'framer-motion' // Add AnimatePresence
import { useSheetData } from '../hooks/useSheetData'
import { edvantageContent } from '../data/pageContent'
import Loader from '../components/Loader'
import { Calendar, Clock, MapPin, Users, CheckCircle, ArrowRight, Coffee, Download, Sparkles } from 'lucide-react'
import { formatTime, formatDate, formatEventDates, formatRegistrationDeadline } from '../utils/formatters'
import useScrollToTop from '../hooks/useScrollToTop'
import Speakers from '../components/Speakers'
import Sponsors from '../components/Sponsors'

const EventTypes = {
  MAIN: 'main',
  WORKSHOP: 'workshop',
  PANEL: 'panel',
  BREAK: '-'
};

const EventTypeColors = {
  [EventTypes.MAIN]: 'bg-cyan-500/20 text-cyan-400',
  [EventTypes.WORKSHOP]: 'bg-emerald-500/20 text-emerald-400',
  [EventTypes.PANEL]: 'bg-purple-500/20 text-purple-400',
  [EventTypes.BREAK]: 'bg-slate-500/20 text-slate-400'
};

const EventIcons = {
  [EventTypes.MAIN]: Calendar,
  [EventTypes.WORKSHOP]: Users,
  [EventTypes.PANEL]: Users,
  [EventTypes.BREAK]: Coffee
};

const EdVantage = () => {
  useScrollToTop()
  const [activeTab, setActiveTab] = useState('speakers') // Add tab state
  const [activeDay, setActiveDay] = useState('day1') // Add this new state
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

  // Add this helper function to get events for a specific day
  const getEventsByDay = (dayNumber) => {
    const dates = Object.keys(scheduleByDay);
    return dates[dayNumber - 1] ? scheduleByDay[dates[dayNumber - 1]] : [];
  };

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
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden py-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/metallurgy-pattern.jpg')] opacity-10 bg-cover bg-center" />
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(to right, rgba(6,182,212,0.05), rgba(16,185,129,0.05))',
                'linear-gradient(to right, rgba(16,185,129,0.05), rgba(6,182,212,0.05))',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side Event Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <motion.div 
                  className="inline-block px-4 py-1 rounded-full text-sm bg-cyan-500/20 text-cyan-400 mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Premier Career Workshop
                </motion.div>
                <h1 className="text-5xl md:text-6xl py-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 mb-6">
                  EdVantage 2025
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Join us for an immersive two-day journey into the future of metallurgical engineering. 
                  Connect with industry leaders, explore cutting-edge research, and shape your career path.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    'Industry Expert Talks',
                    'Hands-on Workshops',
                    'Networking Sessions',
                    'Career Guidance',
                    'Research Showcase',
                    'Technical Competitions'
                  ].map((highlight, index) => (
                    <motion.div
                      key={highlight}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span>{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right side*/}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-slate-800/80 via-slate-800/50 to-transparent backdrop-blur-sm rounded-xl border border-cyan-500/20 p-8 shadow-2xl"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Register Now</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    <span>
                      {formatEventDates(mainEvent.StartDate, mainEvent.EndDate) || 'Jan 24-25, 2025'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span>{mainEvent.Venue || 'IIT Ropar'}</span>
                  </div>
                </div>
                
                {mainEvent.RegistrationDeadline && (
                  <div className="bg-cyan-500/10 rounded-lg p-4">
                    <p className="text-cyan-400 text-sm">Registration Deadline</p>
                    <p className="text-white">
                      {formatRegistrationDeadline(mainEvent.RegistrationDeadline)}
                    </p>
                  </div>
                )}

                <a
                  href={mainEvent.RegistrationLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:opacity-90 transition-all"
                >
                  Register for EdVantage
                  <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </a>

                {mainEvent.RegistrationFee && (
                  <p className="text-center text-sm text-slate-400">
                    Registration Fee: {mainEvent.RegistrationFee}
                  </p>
                )}

                {/* Brochure*/}
                {mainEvent.EventBrochureLink && (
                  <a
                    href={mainEvent.EventBrochureLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 bg-slate-800/50 border border-cyan-500/20 text-cyan-400 rounded-lg hover:bg-slate-800 transition-all mt-4"
                  >
                    <Download className="inline-block w-4 h-4 mr-2" />
                    Download Event Brochure
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section - Add this right after hero section */}
      <section className="py-12 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['speakers', 'schedule'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full border ${
                  activeTab === tab
                    ? 'bg-cyan-500 border-transparent text-white'
                    : 'border-cyan-500/20 text-slate-300 hover:bg-cyan-500/10'
                } transition-all capitalize`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'speakers' ? (
              <motion.div
                key="speakers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Speakers />
              </motion.div>
            ) : (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-5xl mx-auto"
              >
                <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  Event Schedule
                </h2>
                
                {/* Day Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                  {['day1', 'day2'].map((day) => (
                    <motion.button
                      key={day}
                      onClick={() => setActiveDay(day)}
                      className={`px-6 py-2 rounded-full border ${
                        activeDay === day
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                          : 'border-cyan-500/20 text-slate-300 hover:bg-cyan-500/10'
                      } transition-all capitalize`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Day {day.slice(-1)}
                    </motion.button>
                  ))}
                </div>

                {/* Day Schedule Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDay}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Display events for selected day */}
                    {(() => {
                      const dayNumber = parseInt(activeDay.slice(-1));
                      const events = getEventsByDay(dayNumber);
                      const date = Object.keys(scheduleByDay)[dayNumber - 1];

                      return events.length > 0 ? (
                        <div className="relative">
                          {/* Date Header */}
                          <div className="sticky top-0 z-10 mb-3">
                            <div className="bg-slate-900/95 backdrop-blur-sm rounded-lg border border-cyan-500/20 p-3">
                              <h3 className="text-lg font-bold flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-cyan-400" />
                                  <span className="text-cyan-400">Day {dayNumber}</span>
                                </div>
                                <span className="text-slate-500">|</span>
                                <span className="text-white">{date}</span>
                              </h3>
                            </div>
                          </div>

                          {/* Events Grid */}
                          <div className="grid gap-2 md:grid-cols-2">
                            {/* Keep existing event mapping code */}
                            {events.map((event) => {
                              const typeColor = EventTypeColors[event.Type?.toLowerCase()] || EventTypeColors[EventTypes.MAIN];
                              const isBreak = event.Type?.toLowerCase() === EventTypes.BREAK;
                              const EventIcon = EventIcons[event.Type?.toLowerCase()] || Calendar;

                              return (
                                <div
                                  key={event.Title}
                                  className={`bg-slate-800/50 backdrop-blur-sm rounded-lg border 
                                    ${isBreak ? 'border-slate-700/20 md:col-span-2' : 'border-cyan-500/20'} 
                                    p-3 hover:bg-slate-800/70 transition-colors group`}
                                >
                                  <div className="flex items-center justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                      <div className="flex items-center gap-1.5 bg-slate-900/50 px-2 py-1 rounded-md">
                                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                        <span className="text-cyan-400 text-xs font-medium">{formatTime(event.Time)}</span>
                                      </div>
                                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColor}`}>
                                        {event.Type}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex flex-col gap-2">
                                    <div>
                                      <h4 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                        {event.Title}
                                      </h4>
                                      {event.Description && (
                                        <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                                          {event.Description}
                                        </p>
                                      )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 text-xs mt-1">
                                      {event.Venue && (
                                        <div className="flex items-center gap-1 text-slate-400">
                                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                                          <span>{event.Venue}</span>
                                        </div>
                                      )}
                                      {event.Speakers && (
                                        <div className="flex items-center gap-1 text-slate-400">
                                          <Users className="w-3.5 h-3.5 text-cyan-400" />
                                          <span>{event.Speakers}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-slate-400">
                          No events scheduled for Day {dayNumber}
                        </div>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-4">
              {edvantageContent.sponsor.title}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8">
              {edvantageContent.sponsor.description}
            </p>
            {mainEvent.SponsorBrochureLink && (
              <a
                href={mainEvent.SponsorBrochureLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:opacity-90 transition-all group"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {edvantageContent.sponsor.buttonText}
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </a>
            )}
          </motion.div>
        </div>
      </section>
      <Sponsors/>
    </div>
  );
};

export default EdVantage;