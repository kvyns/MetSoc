import React from 'react';
import { motion } from 'framer-motion';
import { useSheetData } from '../hooks/useSheetData';
import { formatTime, formatDate } from '../utils/formatters';
import Loader from './Loader';
import { Calendar, Clock, MapPin } from 'lucide-react';

const SpeakerPlaceholder = () => (
  <motion.div 
    className="bg-slate-900/80 p-6 rounded-xl border border-cyan-500/20 animate-pulse"
  >
    <div className="aspect-square bg-slate-800 rounded-full mb-4 w-48 h-48 mx-auto" />
    <div className="h-4 bg-slate-800 rounded w-3/4 mx-auto mb-2" />
    <div className="h-3 bg-slate-800 rounded w-1/2 mx-auto mb-4" />
    <div className="space-y-2">
      <div className="h-3 bg-slate-800 rounded w-3/4 mx-auto" />
      <div className="h-3 bg-slate-800 rounded w-2/3 mx-auto" />
      <div className="h-3 bg-slate-800 rounded w-3/4 mx-auto" />
    </div>
  </motion.div>
);

const Speakers = () => {
  const { data: speakers, loading, error } = useSheetData('speakers');  // Make sure the key matches SHEET_NAMES
  
  // Debug logging
  console.log('Speakers component:', { speakers, loading, error });

  if (loading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!speakers?.length) return <div>No speakers found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {speakers.map((speaker, index) => (
          <motion.div 
              key={speaker.Name || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/80 p-6 rounded-xl border border-cyan-500/20 text-center group"
            >
              <div className="mb-4 relative">
                <div className="aspect-square w-48 h-48 mx-auto overflow-hidden rounded-full">
                  {speaker.Photo ? (
                    <img 
                      src={speaker.Photo} 
                      alt={speaker.Name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/assets/speakers/placeholder-avatar.png';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600 text-4xl font-bold">
                      {speaker.Name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {speaker.Name}
              </h3>
              <p className="text-sm text-slate-300 mb-2">
                {speaker.Position}
              </p>
              
              {speaker.Topic && (
                <p className="text-cyan-400 text-sm font-medium mb-4">
                  {speaker.Topic}
                </p>
              )}

              <div className="space-y-2 mt-4 text-sm">
                <div className="flex items-center justify-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>{formatDate(speaker.Date)}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{formatTime(speaker.Time)}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{speaker.Venue}</span>
                </div>
              </div>

              {speaker.LinkedIn && (
                <a 
                  href={speaker.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Speakers;