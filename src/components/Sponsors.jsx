import React from 'react';
import { motion } from 'framer-motion';
import { useSheetData } from '../hooks/useSheetData';

const SponsorPlaceholder = () => (
  <motion.div className="bg-slate-900/80 p-4 rounded-lg border border-cyan-500/20 animate-pulse">
    <div className="h-12 bg-slate-800 rounded mb-2" />
    <div className="h-3 bg-slate-800 rounded w-1/2 mx-auto" />
  </motion.div>
);

const Sponsors = () => {
  const { data: sponsors, loading, error } = useSheetData('sponsors');
  
  if (loading) {
    return (
      <section className="py-12 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            Our Sponsors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <SponsorPlaceholder key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return <div>Error loading sponsors: {error.message}</div>;
  if (!sponsors?.length) return null;

  return (
    <section className="py-12 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
          Our Sponsors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sponsors.map((sponsor, index) => (
            <motion.div 
              key={sponsor.Name || index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/80 p-4 rounded-lg border border-cyan-500/20 flex flex-col items-center justify-center"
            >
              <div className="h-12 mb-2 flex items-center justify-center">
                {sponsor.Logo ? (
                  <img 
                    src={sponsor.Logo} 
                    alt={sponsor.Name}
                    className="h-full w-auto object-contain"
                    onError={(e) => {
                      e.target.src = '/assets/logo/placeholder-logo.png';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-800 text-slate-600 text-xl font-bold rounded">
                    {sponsor.Name.charAt(0)}
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-300 text-center">
                {sponsor.Name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;