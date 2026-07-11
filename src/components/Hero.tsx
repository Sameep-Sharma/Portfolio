import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import HeroSocials from './HeroSocials'
import TextReveal from './TextReveal'
import AnimatedHeroGraphic from './AnimatedHeroGraphic'
import ScrambleText from './ScrambleText'

const Hero = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
  const mouseXSpring = useSpring(x, springConfig)
  const mouseYSpring = useSpring(y, springConfig)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const normX = (e.clientX - rect.left) / rect.width - 0.5
    const normY = (e.clientY - rect.top) / rect.height - 0.5
    x.set(normX)
    y.set(normY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-20 md:pt-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.4) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-brand-purple font-mono text-xs tracking-[0.2em] uppercase font-medium"
              >
                <ScrambleText text="Software Engineer" delay={500} />
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-gray-900 dark:text-white tracking-tight uppercase text-shadow-retro"
              >
                <span className="block glitch-hover w-fit" data-text="Hi, I'm">Hi, I'm</span>
                <span className="block mt-2 relative z-20">
                  {"Sameep Sharma".split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block text-brand-purple cursor-grab active:cursor-grabbing relative"
                      drag
                      dragSnapToOrigin
                      dragElastic={0.2}
                      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                      whileDrag={{ scale: 1.2, zIndex: 100, cursor: "grabbing" }}
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
            </div>

            <TextReveal
              text="Information Science and Engg. student at SIT Tumakuru, specializing in full-stack development and Problem Solving. I build scalable applications and Solve Problems for fun."
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl"
              delay={5}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <a href="#projects" className="retro-btn px-8 py-4 text-sm sm:text-base group">
                <span className="mr-2">View Projects</span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowDown size={18} />
                </motion.div>
              </a>
              <a href="#contact" className="px-8 py-4 text-sm sm:text-base font-mono font-bold uppercase tracking-wider border-2 border-gray-900 dark:border-gray-200 text-gray-900 dark:text-[#f4f4f0] transition-transform shadow-[4px_4px_0px_rgba(17,24,39,1)] dark:shadow-[4px_4px_0px_rgba(244,244,240,0.5)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(17,24,39,1)] active:translate-y-1 active:translate-x-1 active:shadow-none bg-transparent">
                Get In Touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <HeroSocials />
            </motion.div>
          </motion.div>

          {/* Right side - Professional Info Card / SVG Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50, perspective: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="hidden lg:block relative z-20 w-full max-w-md mx-auto"
          >
            <div className="relative z-10 w-full" style={{ transform: "translateZ(30px)" }}>
              <AnimatedHeroGraphic />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600"
        >
          <span className="text-xs font-mono uppercase tracking-wider">Scroll</span>
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
