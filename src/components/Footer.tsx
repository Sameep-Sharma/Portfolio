import { motion } from 'framer-motion'
import TerminalEasterEgg from './TerminalEasterEgg'

const Footer = () => {
  const endText = "END"

  return (
    <footer className="relative bg-[#f4f4f0] dark:bg-black border-t-8 border-gray-900 dark:border-purple-500 overflow-hidden py-16 pb-32 md:pb-16 retro-card rounded-none">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.8) 2px, transparent 2px), linear-gradient(90deg, rgba(168, 85, 247, 0.8) 2px, transparent 2px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="text-center flex flex-col items-center justify-center gap-8">

          {/* END Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border-4 border-gray-900 dark:border-purple-500 bg-gray-900 dark:bg-purple-500 px-8 py-4 shadow-[8px_8px_0px_rgba(168,85,247,1)] dark:shadow-[8px_8px_0px_rgba(244,244,240,0.8)]"
          >
            <span className="text-4xl sm:text-5xl md:text-6xl font-mono font-black text-[#f4f4f0] dark:text-gray-900 tracking-widest uppercase">
              {endText}
            </span>
          </motion.div>

          {/* Divider */}
          <div className="w-full max-w-md h-2 bg-gray-900 dark:bg-purple-500/50 mt-4" />

          {/* Interactive Terminal Easter Egg */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-3xl mx-auto"
          >
            <TerminalEasterEgg />
          </motion.div>

          {/* Year & License & Repo Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4 mt-4"
          >
            <p className="text-gray-900 dark:text-purple-500 font-mono font-bold tracking-widest uppercase bg-[#f4f4f0] dark:bg-black px-4 py-2 border-2 border-gray-900 dark:border-purple-500">
              SYSTEM HALTED © {new Date().getFullYear()}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
