import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  const activities = [
    { title: "Technical Workshops", description: "Hands-on learning experiences with industry experts" },
    { title: "Research Projects", description: "Collaborative research opportunities for students" },
    { title: "Industry Talks", description: "Regular seminars by leading professionals" },
    { title: "Student Initiatives", description: "Leadership and project management opportunities" }
  ]

  return (
    <div className="min-h-screen pt-24 px-4">
      {/* Hero Section */}
      <div className="relative mb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-block px-6 mt-8 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20"
          >
            <span className="text-cyan-400">Established 2021</span>
          </motion.div>
          {/* Logo Section*/}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center items-center mt-8"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40"> {/* reduced size */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34,211,238,0.2)',
                    '0 0 40px rgba(34,211,238,0.4)',
                    '0 0 20px rgba(34,211,238,0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-cyan-500/20">
                <img 
                  src="/assets/logo/metsoc-logo.png"
                  alt="MetSoc Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
          <h1 className="text-6xl md:text-7xl p-2 font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">
            About MetSoc
          </h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            The Metallurgical and Materials Society at IIT Ropar serves as a platform for students 
            and faculty members interested in the field of materials science and engineering.
          </motion.p>
        </motion.div>
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
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
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5"
          />
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          <div className="bg-slate-900/80 p-8 rounded-xl border border-cyan-500/20 shadow-xl backdrop-blur-xl flex flex-col items-center text-center h-full">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="mb-8">
                <span className="inline-block p-3 rounded-lg bg-cyan-500/10 mb-4">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <h2 className="text-2xl font-bold text-cyan-400">Our Vision</h2>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                To become a leading student organization in the field of metallurgy and materials 
                science, fostering innovation and research excellence.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 p-8 rounded-xl border border-cyan-500/20 shadow-xl backdrop-blur-xl flex flex-col items-center text-center h-full">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="mb-8">
                <span className="inline-block p-3 rounded-lg bg-emerald-500/10 mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <h2 className="text-2xl font-bold text-emerald-400">Our Mission</h2>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                To create a vibrant community of future metallurgists and materials scientists through 
                hands-on learning, research, and industry collaboration.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Activities Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
          What We Do
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/80 p-6 rounded-xl border border-cyan-500/20 shadow-xl backdrop-blur-xl"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold mb-3 text-cyan-400">{activity.title}</h3>
              <p className="text-slate-300">{activity.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default About