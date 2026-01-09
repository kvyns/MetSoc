import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, ChevronRight, Linkedin, Instagram, Twitter } from 'lucide-react'
import { siteConfig, socialLinks, navLinks } from '../data/pageContent'

const SocialIcons = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Twitter: Twitter
};

const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/10 to-slate-950/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from)_0%,_var(--tw-gradient-to)_100%)] from-orange-500/10 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-8">
        {/* Top Grid Section*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          {/* MetSoc Section*/}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-4 mb-6">
              <motion.img 
                src={`${import.meta.env.BASE_URL}assets/logo/metsoc-logo.png`}
                alt="MetSoc Logo" 
                className="h-12 w-auto rounded-full"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              />
              <h3 className="text-2xl font-bold text-white">
                MetSoc <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">IIT Ropar</span>
              </h3>
            </div>
            <p className="text-slate-400 text-base leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = SocialIcons[social.name];
                if (!Icon) return null;

                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center group 
                             hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-amber-500/20 transition-all hover:scale-110 text-orange-400 
                             hover:text-orange-300 border border-orange-500/20 hover:border-orange-500/40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ rotate: 360 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Updated Quick Links */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold text-white mb-6 border-b border-slate-800 pb-2 text-center md:text-left w-full">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full max-w-xs md:max-w-none">
              {[...navLinks, { name: 'Department', path: siteConfig.departmentUrl }].map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.name === 'Department' ? (
                    <a 
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 group py-1"
                    >
                      <ChevronRight className="w-4 h-4 text-orange-400/50 group-hover:text-orange-400" />
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.path}
                      className="text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 group py-1"
                    >
                      <ChevronRight className="w-4 h-4 text-orange-400/50 group-hover:text-orange-400" />
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold text-white mb-6 border-b border-slate-800 pb-2 text-center md:text-left w-full">
              Contact Us
            </h4>
            <div className="flex flex-col items-center md:items-start gap-4 w-full">
              {[
                { 
                  icon: MapPin,
                  text: 'IIT Ropar, Punjab, India',
                  subtext: '140001, Main Campus' 
                },
                { 
                  icon: Mail,
                  text: 'metsoc@iitrpr.ac.in',
                  subtext: 'Email us your queries' 
                },
                { 
                  icon: Phone,
                  text: '+91 8619585751',
                  subtext: 'Mon-Fri 9am to 6pm' 
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-lg flex items-center justify-center border-2 border-orange-500/30 group-hover:border-orange-500/50 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-5 h-5 text-orange-400" />
                  </motion.div>
                  <div className="flex flex-col text-left">
                    <p className="text-slate-300">{item.text}</p>
                    <p className="text-sm text-slate-500">{item.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer Bottom*/}
        <div className="pt-8 border-t border-slate-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} MetSoc IIT Ropar. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
