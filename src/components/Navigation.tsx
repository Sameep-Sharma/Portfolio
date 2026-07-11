import { useState, useEffect } from 'react'
import { Sun, Moon, Home, Briefcase, Mail, User } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { motion, useScroll, useSpring } from 'framer-motion'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, toggleTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)

    // Active section spy
    const sections = ['home', 'about', 'projects', 'contact']
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, {
      threshold: 0.15,
      rootMargin: '-20% 0px -20% 0px'
    })

    sections.forEach(section => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ]

  return (
    <>
      {/* ==========================================
          DESKTOP NAVIGATION (Medium screens and up)
         ========================================== */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="hidden md:block md:fixed md:top-0 md:left-0 md:right-0 md:z-[100]"
      >
        <div className="relative">
          <nav
            className={`transition-all duration-300 border-b-4 border-gray-900 dark:border-purple-500 px-8 py-3 flex items-center justify-between ${isScrolled
              ? 'bg-[#f4f4f0] dark:bg-black shadow-[0px_6px_0px_rgba(17,24,39,1)] dark:shadow-[0px_6px_0px_rgba(168,85,247,0.5)]'
              : 'bg-[#f4f4f0] dark:bg-black'
              }`}
          >
            {/* Logo */}
            <motion.a
              href="#home"
              className="text-lg font-mono font-bold text-gray-900 dark:text-white uppercase tracking-wider text-shadow-retro glitch-hover"
              data-text="Sameep Sharma"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              Sameep Sharma
            </motion.a>

            {/* Links */}
            <ul className="flex items-center gap-1" onMouseLeave={() => setHoveredIndex(null)}>
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1)

                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="relative"
                  >
                    <a
                      href={item.href}
                      onMouseEnter={() => setHoveredIndex(index)}
                      className={`px-4 py-2 text-sm font-mono font-bold uppercase transition-colors relative z-10 ${hoveredIndex === index || (isActive && hoveredIndex === null)
                        ? 'text-gray-900 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400'
                        }`}
                    >
                      {item.name}
                    </a>

                    {/* Hover Box */}
                    {hoveredIndex === index && (
                      <motion.div
                        layoutId="navbar-pill"
                        className="absolute inset-0 bg-purple-400 dark:bg-gray-800 border-2 border-gray-900 dark:border-purple-500 -z-0"
                        transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                      />
                    )}

                    {/* Active Section Indicator (when not hovering) */}
                    {isActive && hoveredIndex === null && (
                      <motion.div
                        layoutId="navbar-pill"
                        className="absolute inset-x-2 bottom-0 h-1 bg-gray-900 dark:bg-purple-500 -z-0"
                        transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                      />
                    )}
                  </motion.li>
                )
              })}
            </ul>

            {/* Divider */}
            <div className="w-0.5 h-6 bg-gray-900 dark:bg-purple-500/50" />

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative p-2.5 border-2 border-gray-900 dark:border-purple-500 bg-purple-400 dark:bg-[#111] text-gray-900 dark:text-purple-400 hover:bg-purple-500 dark:hover:bg-gray-800 shadow-[2px_2px_0px_rgba(17,24,39,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all duration-100 group"
              aria-label="Toggle theme"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >

              <div className="relative z-10">
                <motion.div
                  initial={false}
                  animate={{
                    rotate: theme === 'dark' ? 360 : 0,
                    scale: theme === 'dark' ? 1 : 0.8,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {theme === 'light' ? <Moon size={18} strokeWidth={2.5} /> : <Sun size={18} strokeWidth={2.5} />}
                </motion.div>
              </div>
            </motion.button>
          </nav>

          {/* Scroll Progress Bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-400 origin-left"
            style={{ scaleX }}
          />
        </div>
      </motion.header>


      {/* ==========================================
          MOBILE NAVIGATION (Small screens only)
         ========================================== */}

      {/* 1. Mobile Top Bar (Logo + Theme) */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`md:hidden fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center bg-[#f4f4f0] dark:bg-black border-b-4 border-gray-900 dark:border-purple-500 shadow-[0px_4px_0px_rgba(17,24,39,1)] dark:shadow-[0px_4px_0px_rgba(168,85,247,0.5)]`}
      >
        <a href="#home" className="text-xl font-mono font-bold text-gray-900 dark:text-white uppercase tracking-wider text-shadow-retro glitch-hover" data-text="SAMEEP">
          SAMEEP
        </a>
        <motion.button
          onClick={toggleTheme}
          className="relative p-2.5 border-2 border-gray-900 dark:border-purple-500 bg-purple-400 dark:bg-[#111] text-gray-900 dark:text-purple-400 hover:bg-purple-500 dark:hover:bg-gray-800 shadow-[2px_2px_0px_rgba(17,24,39,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all duration-100 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative z-10">
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 360 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {theme === 'light' ? <Moon size={20} strokeWidth={2.5} /> : <Sun size={20} strokeWidth={2.5} />}
            </motion.div>
          </div>
        </motion.button>
      </motion.div>

      {/* 2. Mobile Bottom Bar - Brutalist Dock */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#f4f4f0] dark:bg-black border-t-4 border-gray-900 dark:border-purple-500"
      >
        <div className="relative px-2">

          <ul className="flex justify-around items-center relative z-10">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.href.substring(1)

              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`group flex flex-col items-center gap-1 transition-all duration-100 px-3 py-2 border-2 border-transparent active:scale-95 transform relative ${isActive ? 'text-gray-900 dark:text-purple-400 border-gray-900 dark:border-purple-500 bg-purple-400 dark:bg-gray-800 shadow-[2px_2px_0px_rgba(17,24,39,1)]' : 'text-gray-600 dark:text-gray-400 hover:border-gray-900 dark:hover:border-purple-500 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                  >
                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className="relative z-10 transition-transform duration-100" />
                    <span className="text-[10px] font-mono font-bold tracking-wider relative z-10 uppercase">{item.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </motion.nav>

      {/* Spacers to prevent content overlap */}
      <div className="md:hidden h-16" /> {/* Spacer for bottom nav */}
    </>
  )
}

export default Navigation
