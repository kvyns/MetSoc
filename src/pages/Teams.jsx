import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSheetData } from '../hooks/useSheetData'
import Loader from '../components/Loader'
import useScrollToTop from '../hooks/useScrollToTop'

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


// Data for MetSoc Team 2022-23 (update image paths and add LinkedIn later)
const team2022 = {
  FacultyAdvisor: {
    role: 'Faculty Advisor',
    name: 'Dr. Khusboo Rakha', // Update with actual name
    image: '/public/assets/2022/facultyadvisor.jpg',
    position: 'Faculty Advisor, MetSoc 2022-23',
    department: 'Assistant Professor, IIT Ropar', // Update with actual department
    linkedIn: 'https://www.linkedin.com/in/krakha/',
    email: 'krakha@iitrpr.ac.in',
  },
  President: {
    role: 'President',
    name: 'Harshvardhan Shewakramani',
    image: '/public/assets/2022/president.jpg',
    linkedIn: 'https://www.linkedin.com/in/harshvardhan-shewakramani/',
    children: [
      {
        role: 'Chair, Research and Technical Content',
        name: 'Atul Pandey',
        image: '/public/assets/2022/chair.png',
        linkedIn: 'https://www.linkedin.com/in/atul-pandey-173722161/',
        children: [
          {
            role: 'Secretary',
            name: 'Suyash Varshney',
            image: '/public/assets/2022/secretary.jpg',
            linkedIn: 'https://www.linkedin.com/in/suyash-varshney-0a2428234/',
            children: [
              {
                role: 'Treasurer',
                name: 'Srivatsa Kaustubh Dussa',
                image: '/public/assets/2022/treasurer.jpg',
                linkedIn: 'https://www.linkedin.com/in/kaustubh1010',
                children: [
                  {
                    role: 'Joint Secretary',
                    name: 'Anshul Chamoli',
                    image: '/public/assets/2022/jointsec2.jpg',
                    linkedIn: 'https://www.linkedin.com/in/anshul-chamoli-32614a227',
                    children: [
                      {
                        role: 'Joint Secretary',
                        name: 'Tanvi Singhal',
                        image: 'public/avatar.jpg',
                        linkedIn: '',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

// Helper to flatten the previous team tree into an array of members for card rendering
function flattenTeam(node, arr = []) {
  if (!node) return arr;
  arr.push({
    role: node.role,
    name: node.name,
    image: node.image,
    linkedIn: node.linkedIn,
  });
  if (node.children) {
    node.children.forEach(child => flattenTeam(child, arr));
  }
  if (node.members) {
    node.members.forEach(m => arr.push({
      role: 'Student Volunteer',
      name: m.name,
      image: m.image,
      linkedIn: m.linkedIn,
    }));
  }
  return arr;
}

const Teams = () => {
  useScrollToTop();
  const [tab, setTab] = useState('current');
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

  return (
    <div className="min-h-screen pt-24 px-4">
      {/* Tabs */}
      <div className="flex justify-center mb-12 gap-4">
        <button
          className={`px-6 py-2 rounded-full font-semibold border transition-colors ${tab === 'current' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900/40 border-slate-700 text-white'}`}
          onClick={() => setTab('current')}
        >
          Current Team
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold border transition-colors ${tab === '2022' ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900/40 border-slate-700 text-white'}`}
          onClick={() => setTab('2022')}
        >
          MetSoc Team 2022-23
        </button>
      </div>

      {tab === 'current' ? (
        <>
          {/* ...existing code... (current team UI) */}
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
          {/* ...existing code... (current team UI) */}
          {/* Faculty Advisor Section */}
          {groupedTeams['Faculty Advisor'] && (
            <div className="max-w-3xl mx-auto mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-900/90 to-cyan-900/20 rounded-2xl border border-cyan-500/30 p-8 md:p-12 backdrop-blur-xl shadow-2xl"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-48 h-64 rounded-2xl overflow-hidden border-4 border-cyan-500/20">
                      <img
                        src={groupedTeams['Faculty Advisor'][0].ImageUrl || '/avatar.jpg'}
                        alt="Faculty Advisor"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
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
                      Faculty Advisor, MetSoc
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
          {/* ...existing code... (current team UI) */}
          {/* Other Team Sections */}
          <div className="max-w-7xl mx-auto">
            {ROLE_ORDER.filter(role => role !== 'Faculty Advisor').map(role => {
              // Debug logging
              // console.log(`Checking role: ${role}`, groupedTeams[role]);
              return groupedTeams[role] && groupedTeams[role].length > 0 ? (
                <div key={role} className="mb-20">
                  <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">
                    {role === 'Head' ? 'Heads' : 
                     role === 'Coordinator' ? 'Coordinators' :
                     role === 'Developer' ? 'Developers' : role}
                  </h2>
                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {groupedTeams[role].map((member, index) => (
                      <motion.div
                        key={member.Name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.04 }}
                        className="bg-slate-900/80 rounded-xl border border-cyan-500/20 p-4 flex flex-col items-center text-center group hover:border-cyan-500/40 transition-all"
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative w-32 h-40 mb-4">
                          <img
                            src={member.ImageUrl || '/avatar.jpg'}
                            alt={member.Name}
                            className="rounded-2xl object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {member.Name}
                        </h3>
                        {member.Position && (
                          <p className="text-sm text-cyan-400 mb-1">{member.Position}</p>
                        )}
                        <p className="text-sm text-slate-300 mb-3">{member.Department}</p>
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
        </>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-cyan-400">MetSoc Team 2022-23</h2>
          {/* Faculty Advisor Card for old team */}
          <div className="max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-900/90 to-cyan-900/20 rounded-2xl border border-cyan-500/30 p-8 md:p-12 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-48 h-64 rounded-2xl overflow-hidden border-4 border-cyan-500/20">
                    <img
                      src={team2022.FacultyAdvisor.image || '/avatar.jpg'}
                      alt="Faculty Advisor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
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
                    Faculty Advisor, MetSoc
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {team2022.FacultyAdvisor.name}
                  </h2>
                  {team2022.FacultyAdvisor.position && (
                    <p className="text-cyan-400 mb-2">
                      {team2022.FacultyAdvisor.position}
                    </p>
                  )}
                  <p className="text-xl text-cyan-300 mb-6">
                    {team2022.FacultyAdvisor.department}
                  </p>
                  <div className="flex gap-4 justify-center md:justify-start">
                    {team2022.FacultyAdvisor.linkedIn && (
                      <a
                        href={team2022.FacultyAdvisor.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-cyan-500/20 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                      >
                        <LinkedInIcon />
                      </a>
                    )}
                    {team2022.FacultyAdvisor.email && (
                      <a
                        href={`mailto:${team2022.FacultyAdvisor.email}`}
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
          {/* Old team cards with hierarchy */}
          <div className="flex flex-col items-center gap-8">
            {/* President */}
            <div className="w-full flex flex-col items-center">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">President</h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/80 rounded-xl border border-cyan-500/20 p-4 flex flex-col items-center text-center group hover:border-cyan-500/40 transition-all w-64"
                whileHover={{ y: -5 }}
              >
                <div className="relative w-32 h-40 mb-4">
                  <img
                    src={team2022.President.image || '/avatar.jpg'}
                    alt={team2022.President.name}
                    className="rounded-2xl object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{team2022.President.name}</h3>
                <div className="flex gap-4 mt-auto">
                  {team2022.President.linkedIn && (
                    <a
                      href={team2022.President.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Chair */}
            <div className="w-full flex flex-col items-center">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Chair, Research and Technical Content</h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/80 rounded-xl border border-cyan-500/20 p-4 flex flex-col items-center text-center group hover:border-cyan-500/40 transition-all w-56"
                whileHover={{ y: -5 }}
              >
                <div className="relative w-28 h-36 mb-4">
                  <img
                    src={team2022.President.children[0].image || '/avatar.jpg'}
                    alt={team2022.President.children[0].name}
                    className="rounded-2xl object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{team2022.President.children[0].name}</h3>
                <div className="flex gap-4 mt-auto">
                  {team2022.President.children[0].linkedIn && (
                    <a
                      href={team2022.President.children[0].linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Secretary */}
            <div className="w-full flex flex-col items-center">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Secretary</h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/80 rounded-xl border border-cyan-500/20 p-4 flex flex-col items-center text-center group hover:border-cyan-500/40 transition-all w-56"
                whileHover={{ y: -5 }}
              >
                <div className="relative w-28 h-36 mb-4">
                  <img
                    src={team2022.President.children[0].children[0].image || '/avatar.jpg'}
                    alt={team2022.President.children[0].children[0].name}
                    className="rounded-2xl object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{team2022.President.children[0].children[0].name}</h3>
                <div className="flex gap-4 mt-auto">
                  {team2022.President.children[0].children[0].linkedIn && (
                    <a
                      href={team2022.President.children[0].children[0].linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Treasurer */}
            <div className="w-full flex flex-col items-center">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Treasurer</h3>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900/80 rounded-xl border border-cyan-500/20 p-4 flex flex-col items-center text-center group hover:border-cyan-500/40 transition-all w-56"
                whileHover={{ y: -5 }}
              >
                <div className="relative w-28 h-36 mb-4">
                  <img
                    src={team2022.President.children[0].children[0].children[0].image || '/avatar.jpg'}
                    alt={team2022.President.children[0].children[0].children[0].name}
                    className="rounded-2xl object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{team2022.President.children[0].children[0].children[0].name}</h3>
                <div className="flex gap-4 mt-auto">
                  {team2022.President.children[0].children[0].children[0].linkedIn && (
                    <a
                      href={team2022.President.children[0].children[0].children[0].linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Joint Secretaries */}
            <div className="w-full flex flex-col items-center gap-4">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Joint Secretaries</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {[team2022.President.children[0].children[0].children[0].children[0], team2022.President.children[0].children[0].children[0].children[0].children[0]].map((jointSec, idx) => (
                  jointSec && (
                    <motion.div
                      key={jointSec.name + jointSec.role}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-slate-900/80 rounded-xl border border-cyan-500/20 p-4 flex flex-col items-center text-center group hover:border-cyan-500/40 transition-all w-56"
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative w-28 h-36 mb-4">
                        <img
                          src={jointSec.image || '/avatar.jpg'}
                          alt={jointSec.name}
                          className="rounded-2xl object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{jointSec.name}</h3>
                      <div className="flex gap-4 mt-auto">
                        {jointSec.linkedIn && (
                          <a
                            href={jointSec.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <LinkedInIcon />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
