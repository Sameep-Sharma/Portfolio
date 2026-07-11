import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import AsciiImage from './AsciiImage'

const AnimatedHeroGraphic = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="relative w-full aspect-square flex items-center justify-center bg-[#f4f4f0] dark:bg-black border-4 border-gray-900 dark:border-purple-500 retro-card overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-20 dark:opacity-40"
                style={{
                    backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.4) 2px, transparent 2px), linear-gradient(90deg, rgba(168, 85, 247, 0.4) 2px, transparent 2px)`,
                    backgroundSize: '30px 30px',
                    backgroundPosition: '0 0'
                }}
            />

            {/* Premium Retro Window */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[85%] h-[85%] bg-[#f4f4f0] dark:bg-black border-4 border-gray-900 dark:border-purple-500 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] dark:shadow-[8px_8px_0px_0px_rgba(168,85,247,1)] flex flex-col"
            >
                {/* Title bar */}
                <div className="h-12 border-b-4 border-gray-900 dark:border-purple-500 bg-gray-200 dark:bg-purple-500/10 flex items-center px-4 justify-between">
                    <div className="flex gap-2">
                        <div className="w-4 h-4 bg-gray-900 dark:bg-purple-500 rounded-full" />
                        <div className="w-4 h-4 bg-gray-900 dark:bg-purple-500 rounded-full opacity-50" />
                        <div className="w-4 h-4 bg-gray-900 dark:bg-purple-500 rounded-full opacity-25" />
                    </div>
                    <div className="text-xs font-mono font-bold text-gray-900 dark:text-purple-500 tracking-widest uppercase">
                        SYS_MONITOR_v1.0
                    </div>
                </div>

                {/* Content area */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-4">
                    {/* Top Full: Live ASCII Wireframe */}
                    <div className="border-2 border-gray-900 dark:border-purple-500/50 flex-1 relative overflow-hidden bg-white dark:bg-black">
                        <AsciiImage imageUrl="/6677af9b46a5b1d9d281897dee91b79d.jpeg" cols={70} />
                    </div>

                    {/* Bottom Full: Data Readout Panel */}
                    <div className="h-32 border-2 border-gray-900 dark:border-purple-500/50 p-4 bg-gray-900 dark:bg-black overflow-hidden flex flex-col justify-center gap-2">
                        <div className="flex gap-4 items-start">
                            <div className="text-purple-500 font-mono font-bold text-[10px] xl:text-xs uppercase w-24 flex-shrink-0 pt-1 terminal-cursor">
                                &gt; EDUCATION
                            </div>
                            <div className="text-gray-300 dark:text-gray-400 font-mono text-[10px] xl:text-xs">
                                <span className="text-white">Sophomore,ISE</span>
                                <br />
                                SIT Tumakuru
                            </div>
                        </div>
                        <div className="h-px w-full bg-gray-800 dark:bg-purple-900/50 my-1" />
                        <div className="flex gap-4 items-start">
                            <div className="text-purple-500 font-mono font-bold text-[10px] xl:text-xs uppercase w-24 flex-shrink-0 pt-1 terminal-cursor">
                                &gt; FOCUS
                            </div>
                            <div className="text-gray-300 dark:text-gray-400 font-mono text-[10px] xl:text-xs">
                                <span className="text-white">Full-Stack Development</span>
                                <br />
                                Backend Tinkerer
                                <br />
                                Modern React Applications
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default AnimatedHeroGraphic
