import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        // Wait for the slide-up animation to finish before removing from DOM
        const timer = setTimeout(() => {
            setIsLoading(false)
            document.body.style.overflow = 'auto'
        }, 1200)

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[99999] pointer-events-none"
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                >
                    {/* Retro shutter sliding up */}
                    <motion.div
                        className="absolute inset-0 bg-black border-b-[16px] border-purple-500 flex items-center justify-center shadow-[0_20px_50px_rgba(168,85,247,0.3)] shadow-[0_20px_50px_rgba(168,85,247,0.3)]"
                        initial={{ y: 0 }}
                        animate={{ y: '-100%' }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                    >
                        {/* Subtle grid on the shutter to emphasize retro feel */}
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.8) 2px, transparent 2px), linear-gradient(90deg, rgba(168, 85, 247, 0.8) 2px, transparent 2px)`,
                                backgroundSize: '40px 40px',
                                backgroundPosition: 'center bottom'
                            }}
                        />

                        {/* Loading indication that scrolls up with the shutter */}
                        <div className="animate-pulse flex gap-2">
                            <div className="w-4 h-4 rounded-none bg-purple-500 border-2 border-gray-900" />
                            <div className="w-4 h-4 rounded-none bg-purple-500 border-2 border-gray-900 delay-75" />
                            <div className="w-4 h-4 rounded-none bg-purple-500 border-2 border-gray-900 delay-150" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Preloader
