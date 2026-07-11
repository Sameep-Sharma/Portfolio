import { motion } from 'framer-motion'

const MagicName = () => {
  return (
    <div className="py-16 px-4">
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="text-center">
          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tighter cursor-default"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="block relative z-20">
              {"Sameep Sharma".split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block relative cursor-grab active:cursor-grabbing bg-gradient-to-b from-blue-400 via-blue-600 to-indigo-600 bg-clip-text text-transparent transform-gpu"
                  drag
                  dragSnapToOrigin
                  dragElastic={0.2}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                  whileDrag={{ scale: 1.2, zIndex: 100, cursor: "grabbing", textShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                  whileHover={{
                    scale: 1.2,
                    y: -10,
                    rotate: Math.random() * 10 - 5,
                    filter: "brightness(1.2)"
                  }}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    damping: 12,
                    stiffness: 200,
                    delay: index * 0.05
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}

                  {/* Subtle Glow behind each letter that appears on drag */}
                  <motion.span
                    className="absolute inset-0 blur-lg bg-blue-500/30 -z-10 rounded-full"
                    initial={{ opacity: 0 }}
                    whileDrag={{ opacity: 1, scale: 1.5 }}
                  />
                </motion.span>
              ))}
            </span>
          </motion.h2>
          <motion.p
            className="mt-6 text-lg text-gray-600 dark:text-gray-400 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Full-stack developer & creative technologist
          </motion.p>
        </div>
      </div>
    </div>
  )
}

export default MagicName
