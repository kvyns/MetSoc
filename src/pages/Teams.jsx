import React from 'react'
import { motion } from 'framer-motion'
import { useSheetData } from '../hooks/useSheetData'
import Loader from '../components/Loader'

const ROLE_ORDER = ['Faculty Advisor', 'Head', 'Coordinator', 'Developer'];

// SVG components to avoid duplication
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Teams = () => {
  const { data: teams, loading } = useSheetData('teams', 'teams');

  if (loading) return <Loader message="Loading team" />;

  const groupedTeams = teams.reduce((acc, member) => {
    const role = member.Role?.trim();
    if (!acc[role]) {
      acc[role] = [];
    }
    const existingMember = acc[role].find(m => m.Name === member.Name);
    if (!existingMember) {
      acc[role].push(member);
    }
    return acc;
  }, {});

  // Debug logging
  console.log('Grouped teams:', groupedTeams);

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
            <span className="text-cyan-400">Our Team</span>
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">
            Meet The Team
          </h1>
        </motion.div>
      </div>

      {/* Faculty Advisor Section */}
      {groupedTeams['Faculty Advisor'] && (
        <div className="max-w-4xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-slate-900/90 to-cyan-900/20 rounded-2xl border border-cyan-500/30 p-8 md:p-12 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="relative">
                <div className="w-64 h-80 rounded-3xl overflow-hidden border-4 border-cyan-500/20">
                  <img
                    src={groupedTeams['Faculty Advisor'][0].ImageUrl || '/default-avatar.jpg'}
                    alt="Faculty Advisor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(34,211,238,0.2)',
                      '0 0 40px rgba(34,211,238,0.4)',
                      '0 0 20px rgba(34,211,238,0.2)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm mb-4">
                  Faculty Advisor
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {groupedTeams['Faculty Advisor'][0].Name}
                </h2>
                {groupedTeams['Faculty Advisor'][0].Position && (
                  <p className="text-cyan-400 mb-2">
                    {groupedTeams['Faculty Advisor'][0].Position}
                  </p>
                )}
                <p className="text-xl text-cyan-300 mb-6">
                  {groupedTeams['Faculty Advisor'][0].Department}
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  {groupedTeams['Faculty Advisor'][0].LinkedIn && (
                    <a
                      href={groupedTeams['Faculty Advisor'][0].LinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-cyan-500/20 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                  {groupedTeams['Faculty Advisor'][0].Email && (
                    <a
                      href={`mailto:${groupedTeams['Faculty Advisor'][0].Email}`}
                      className="p-2 bg-cyan-500/20 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                    >
                      <EmailIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Other Team Sections */}
      <div className="max-w-7xl mx-auto">
        {ROLE_ORDER.filter(role => role !== 'Faculty Advisor').map(role => {
          // Debug logging
          console.log(`Checking role: ${role}`, groupedTeams[role]);
          
          return groupedTeams[role] && groupedTeams[role].length > 0 ? (
            <div key={role} className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">
                {role === 'Head' ? 'Heads' : 
                 role === 'Coordinator' ? 'Coordinators' :
                 role === 'Developer' ? 'Developers' : role}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedTeams[role].map((member, index) => (
                  <motion.div
                    key={member.Name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-slate-900/80 rounded-xl border border-cyan-500/20 p-6 flex flex-col items-center text-center group hover:border-cyan-500/40 transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative w-48 h-60 mb-6">
                      <img
                        src={member.ImageUrl || '/default-avatar.jpg'}
                        alt={member.Name}
                        className="rounded-3xl object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 rounded-3xl border-2 border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      {member.Name}
                    </h3>
                    {member.Position && (
                      <p className="text-cyan-400 mb-2">{member.Position}</p>
                    )}
                    <p className="text-slate-300 mb-4">{member.Department}</p>
                    
                    {/* Social Links */}
                    <div className="flex gap-4 mt-auto">
                      {member.LinkedIn && (
                        <a
                          href={member.LinkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <LinkedInIcon />
                        </a>
                      )}
                      {member.Email && (
                        <a
                          href={`mailto:${member.Email}`}
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <EmailIcon />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tech stack section*/}
              {role === 'Developer' && (
                <div className="mt-12 text-center">
                  <div className="inline-flex flex-wrap justify-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-cyan-500/20">
                    {['React', 'TailwindCSS', 'Framer Motion', 'Google Sheets', 'Vite'].map(tech => (
                      <span key={tech} className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-400 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Teams;
