import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Instagram, ExternalLink } from 'lucide-react'
import useScrollToTop from '../hooks/useScrollToTop'

const Contact = () => {
  useScrollToTop()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScVvPofZSqJnzsaJ5fQYMEIYumYgzTp7kqaMYBC-9oEMYLfkw/formResponse';

      // Create a hidden iframe with a specific name
      const iframeName = 'hidden-iframe';
      let iframe = document.getElementById(iframeName);
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.setAttribute('id', iframeName);
        iframe.setAttribute('name', iframeName);
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      // Create the form element
      const form = document.createElement('form');
      form.setAttribute('method', 'POST');
      form.setAttribute('action', formUrl);
      form.setAttribute('target', iframeName);
      form.style.display = 'none';

      // Add form fields
      const formFields = {
        'entry.404139145': formData.name,
        'entry.1997859094': formData.email,
        'entry.850494410': formData.subject,
        'entry.1325979682': formData.message
      };

      // Create and append inputs
      Object.entries(formFields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', name);
        input.setAttribute('value', value);
        form.appendChild(input);
      });

      // Append form, submit it, and clean up
      document.body.appendChild(form);
      form.submit();
      
      // Remove form after submission
      setTimeout(() => {
        document.body.removeChild(form);
      }, 500);

      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup iframe on component unmount
  React.useEffect(() => {
    return () => {
      const iframe = document.getElementById('hidden-iframe');
      if (iframe) {
        document.body.removeChild(iframe);
      }
    };
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "IIT Ropar, Punjab, India - 140001",
      subtext: "IIT Ropar, Main Campus",
      link: "https://maps.app.goo.gl/JxxfDz4SQLrVNkwJ7"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "metsoc@iitrpr.ac.in",
      subtext: "We'll respond within 24 hours",
      link: "mailto:metsoc@iitrpr.ac.in"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 8619585751",
      subtext: "Mon-Fri 9am to 6pm",
      link: "tel:+918619585751"
    }
  ]

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      color: 'text-[#0A66C2]/70 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10', 
      link: 'https://www.linkedin.com/in/metsoc-iit-ropar-b1b150225' 
    },
    // { 
    //   name: 'Twitter', 
    //   icon: Twitter, 
    //   color: 'text-[#1DA1F2]/70 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10', 
    //   link: '#' 
    // },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'text-[#E4405F]/70 hover:text-[#E4405F] hover:bg-[#E4405F]/10', 
      link: 'https://www.instagram.com/metsoc_iitropar/' 
    }
  ]

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
            className="inline-block mb-8 px-6 py-2 mt-8 rounded-full bg-cyan-500/10 border border-cyan-500/20"
          >
            <span className="text-cyan-400">Get in Touch</span>
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">
            Contact Us
          </h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Have questions? We'd love to hear from you. Send us a message and we'll get back to you shortly.
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

      {/* Contact Grid */}
      <div className="max-w-7xl mx-auto mb-24">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.title}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/80 p-8 rounded-xl border border-cyan-500/20 shadow-xl backdrop-blur-xl group hover:border-cyan-500/40 transition-all h-full"
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col h-full justify-between items-center text-center">
                <div className="flex flex-col items-center gap-4">
                  <span className="p-3 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                    <info.icon className="w-6 h-6 text-cyan-400" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">
                      {info.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">{info.subtext}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 pt-4 border-t border-cyan-500/10 w-full">
                  <p className="text-lg text-slate-300 font-medium">{info.content}</p>
                  <ExternalLink className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Contact Form and Map Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/80 p-8 rounded-xl border border-cyan-500/20 shadow-xl backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Send Us a Message
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2 text-sm text-left px-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-slate-200" 
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2 text-sm text-left px-2">Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-slate-200" 
                    placeholder="Your Email Address"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm text-left px-2">Subject</label>
                <input 
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-slate-200" 
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2 text-sm text-left px-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-slate-200 h-32"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              {submitStatus.message && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/80 p-8 rounded-xl border border-cyan-500/20 shadow-xl backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Follow Us
            </h2>
            <div className="space-y-6 flex flex-col items-center text-center">
              <p className="text-slate-300">
                Connect with us on social media to stay updated with our latest events, research, and activities.
              </p>
              <div className="flex gap-4 justify-center">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center ${social.color} transition-all`}
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
              <div className="aspect-video w-full rounded-lg overflow-hidden mt-8 border border-cyan-500/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2876.767744095541!2d76.47225644894614!3d30.968454186679452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1734011863581!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
