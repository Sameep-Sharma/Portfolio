import { motion } from 'framer-motion'
import { Mail, Github, MapPin, Send } from 'lucide-react'
import { useState } from 'react'

import SocialBadges from './SocialBadges'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState({
    submitting: false,
    succeeded: false,
    errors: [] as any[]
  })



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setStatus({ submitting: true, succeeded: false, errors: [] })

    // REPLACE THIS URL WITH YOUR OWN FORMSPREE ENDPOINT
    // Example: https://formspree.io/f/xyzkqwer
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjkjlqa'

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData, // Include existing form data
        })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ submitting: false, succeeded: true, errors: [] })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({ submitting: false, succeeded: false, errors: data.errors || [{ message: 'Submission failed' }] })
      }
    } catch (error) {
      setStatus({ submitting: false, succeeded: false, errors: [{ message: 'Network error. Please try again.' }] })
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="text-brand-purple" size={20} />,
      label: 'Email',
      value: 'sharmasameep94@gmail.com',
      link: 'mailto:sharmasameep94@gmail.com',
    },
    {
      icon: <Github className="text-brand-purple" size={20} />,
      label: 'GitHub',
      value: 'Sameep-Sharma',
      link: 'https://github.com/Sameep-Sharma',
    },
    {
      icon: <MapPin className="text-brand-purple" size={20} />,
      label: 'Location',
      value: 'Tumakuru,Karnataka,India',
      link: null,
    },
  ]

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 relative bg-white/10 dark:bg-gray-950/10 backdrop-blur-[2px] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-widest text-gray-900 dark:text-white uppercase text-shadow-retro">
              Get In <span className="text-purple-500">Touch</span>
            </h2>
            <div className="h-1 flex-1 max-w-24 bg-gray-900 dark:bg-purple-500" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
            <div className="retro-card p-6 sm:p-8">
              <h3 className="text-xl font-mono font-bold uppercase tracking-wider mb-8 text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-purple-500 pb-2">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 bg-[#f4f4f0] dark:bg-black border-2 border-gray-900 dark:border-purple-500 shadow-[2px_2px_0px_rgba(17,24,39,1)] group-hover:shadow-[4px_4px_0px_rgba(17,24,39,1)] group-hover:-translate-y-1 transition-all rounded-none flex-shrink-0">{info.icon}</div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs font-mono uppercase tracking-widest mb-1.5 font-bold">{info.label}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-gray-900 dark:text-white hover:text-purple-500 font-mono transition-colors text-lg font-bold"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 dark:text-white text-lg font-mono font-bold">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="retro-card p-6 sm:p-8">
              <h3 className="text-xl font-mono font-bold uppercase tracking-wider mb-6 text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-purple-500 pb-2">Education</h3>
              <p className="text-purple-500 text-xl font-mono uppercase tracking-tight font-bold mb-2">Information Science and Engineering(2024-28)</p>
              <p className="text-gray-900 dark:text-gray-100 font-mono font-bold text-lg">Siddaganga Institute of Technology</p>
              <p className="text-gray-700 dark:text-gray-400 text-sm mt-3 font-mono">Tumakuru, Karnataka, India</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="retro-card p-6 sm:p-8"
          >
            <h3 className="text-xl font-mono font-bold uppercase tracking-wider mb-8 text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-purple-500 pb-2">Send a Message</h3>

            {status.succeeded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-purple/10 text-brand-purple p-6 rounded-xl border border-brand-purple/20 text-center"
              >
                <p className="font-semibold text-lg mb-2">Message Sent!</p>
                <p className="text-gray-600 dark:text-gray-400">Thanks for reaching out. I'll get back to you shortly.</p>
                <button
                  onClick={() => setStatus({ submitting: false, succeeded: false, errors: [] })}
                  className="mt-4 text-sm font-medium underline hover:text-brand-purple-dark"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for bots */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} />

                <div>
                  <label htmlFor="name" className="block text-gray-900 dark:text-gray-100 mb-2.5 text-sm font-mono font-bold uppercase tracking-widest">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name" // Name attribute is required for Formspree
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={status.submitting}
                    className="w-full px-4 py-3.5 bg-[#f4f4f0] dark:bg-black border-2 border-gray-900 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 shadow-[4px_4px_0px_rgba(17,24,39,1)] dark:shadow-[4px_4px_0px_rgba(168,85,247,0.2)] focus:shadow-[6px_6px_0px_rgba(17,24,39,1)] dark:focus:shadow-[6px_6px_0px_rgba(168,85,247,0.5)] transition-all font-mono disabled:opacity-50 rounded-none terminal-cursor-focus"
                    placeholder="Identify yourself..."
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-900 dark:text-gray-100 mb-2.5 text-sm font-mono font-bold uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email" // Name attribute is required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={status.submitting}
                    className="w-full px-4 py-3.5 bg-[#f4f4f0] dark:bg-black border-2 border-gray-900 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 shadow-[4px_4px_0px_rgba(17,24,39,1)] dark:shadow-[4px_4px_0px_rgba(168,85,247,0.2)] focus:shadow-[6px_6px_0px_rgba(17,24,39,1)] dark:focus:shadow-[6px_6px_0px_rgba(168,85,247,0.5)] transition-all font-mono disabled:opacity-50 rounded-none terminal-cursor-focus"
                    placeholder="your.email@mainframe.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-900 dark:text-gray-100 mb-2.5 text-sm font-mono font-bold uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message" // Name attribute is required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    disabled={status.submitting}
                    className="w-full px-4 py-3.5 bg-[#f4f4f0] dark:bg-black border-2 border-gray-900 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 shadow-[4px_4px_0px_rgba(17,24,39,1)] dark:shadow-[4px_4px_0px_rgba(168,85,247,0.2)] focus:shadow-[6px_6px_0px_rgba(17,24,39,1)] dark:focus:shadow-[6px_6px_0px_rgba(168,85,247,0.5)] transition-all font-mono disabled:opacity-50 resize-none rounded-none terminal-cursor-focus"
                    placeholder="Enter message..."
                  />
                </div>



                {status.errors.length > 0 && (
                  <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-200 dark:border-red-800">
                    {status.errors.map((err: any, i) => (
                      <p key={i}>Error: {err.message || "Something went wrong. Please try again."}</p>
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full retro-btn py-4 text-lg"
                >
                  {status.submitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Social Badges Section */}
        <div className="mt-16 sm:mt-24">
          <SocialBadges />
        </div>

        {/* Retro Marquee Section */}
        <div className="mt-24 overflow-hidden border-y-4 border-gray-900 dark:border-purple-500 bg-purple-400 dark:bg-purple-500/10 py-4 -mx-4 sm:-mx-6 lg:-mx-8">
          <motion.div
            className="flex whitespace-nowrap gap-8 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 15,
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="text-4xl font-mono font-black text-gray-900 dark:text-purple-500 tracking-widest uppercase">
                  Sameep Sharma
                </span>
                <span className="text-4xl font-mono text-gray-900 dark:text-purple-500">
                  ✦
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section >
  )
}

export default Contact
