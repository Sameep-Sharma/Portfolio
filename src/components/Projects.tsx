import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, Star, GitFork, ArrowRight } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

interface Repository {
  name: string
  full_name: string
  description: string | null
  language: string | null
  homepage: string | null
  html_url: string
  stars: number
  forks: number
  pushed_at: string | null
  visibility: string
}

interface ProjectsProps {
  githubData: {
    repositories: Repository[]
  }
}

const Projects = ({ githubData }: ProjectsProps) => {
  const featuredProjects = [
    ...githubData.repositories
      .filter((repo) => repo.visibility === 'public' && repo.description)
      .slice(0, 3),
    {
      name: "Weather-App",
      full_name: "Sameep-Sharma/Weather-App",
      description: "Weather-App is a sleek, futuristic weather dashboard that provides real-time weather data, 5-day forecasts, and air quality information. It features animated backgrounds and weather effects that change based on current conditions and time of day.",
      language: "JavaScript",
      license: null,
      homepage: "https://weather-app-ivory-31.vercel.app/",
      html_url: "https://github.com/Sameep-Sharma/Weather-App",
      stars: 0,
      forks: 0,
      pushed_at: null,
      size_kb: 32,
      topics: [],
      visibility: "public"
    },
    {
      name: 'Card-Game',
      full_name: 'Sameep-Sharma/Card-Game',
      description: 'A card game made in React.js',
      language: 'JavaScript',
      homepage: null,
      html_url: 'https://github.com/Sameep-Sharma/Card-Game',
      stars: 0,
      forks: 0,
      pushed_at: null,
      visibility: 'public',
    },

  ]

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      Python: '#3776ab',
      HTML: '#e34c26',
      CSS: '#1572b6',
      Solidity: '#363636',
    }
    return colors[language || ''] || '#a855f7'
  }

  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize() // Check initially
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const headingY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

  return (
    <section ref={containerRef} id="projects" className="py-16 sm:py-24 md:py-32 relative bg-gray-50/10 dark:bg-gray-900/10 backdrop-blur-[2px] overflow-hidden">
      {/* Background Parallax Element */}
      <motion.div
        style={{ y: bgY }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[100px] -z-10 pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <motion.div
          style={{ y: headingY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-gray-900 dark:text-white tracking-widest uppercase text-shadow-retro">
              Featured <span className="text-purple-500">Projects</span>
            </h2>
            <div className="h-1 flex-1 max-w-24 bg-gray-900 dark:bg-purple-500" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl">
            A selection of projects showcasing my expertise in full-stack development, Web3 technologies, and modern web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {featuredProjects.map((project, index) => {
            // First project is featured (larger in Bento grid)
            const isFeatured = index === 0

            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40, perspective: 1000 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className={`group ${isFeatured ? 'md:col-span-2 md:row-span-2' : 'col-span-1'} relative z-10 w-full`}
                style={{ transformStyle: "preserve-3d" }}
                drag={!isMobile}
                dragConstraints={containerRef}
                dragSnapToOrigin
                dragElastic={0.1}
                whileDrag={{ scale: 1.02, zIndex: 50, cursor: "grabbing" }}
              >
                <div className={`h-full ${!isMobile ? 'cursor-grab active:cursor-grabbing' : ''} border-4 border-gray-900 dark:border-purple-500 bg-[#f4f4f0] dark:bg-black shadow-[8px_8px_0px_rgba(17,24,39,1)] dark:shadow-[8px_8px_0px_rgba(168,85,247,1)] flex flex-col transition-shadow hover:shadow-[12px_12px_0px_rgba(17,24,39,1)] dark:hover:shadow-[12px_12px_0px_rgba(168,85,247,1)]`}>

                  {/* Retro Window Title Bar */}
                  <div className="h-8 border-b-4 border-gray-900 dark:border-purple-500 bg-gray-200 dark:bg-purple-500/10 flex items-center px-3 justify-between pointer-events-none">
                    <div className="flex gap-2 items-center">
                      <div className="h-3 w-3 border-2 border-gray-900 dark:border-purple-500 bg-[#f4f4f0] dark:bg-transparent" />
                      <span className="text-[10px] font-mono font-bold text-gray-900 dark:text-purple-500 tracking-widest uppercase">
                        {project.name.substring(0, 15).replace(/\s+/g, '_')}.EXE
                      </span>
                    </div>
                    <div className="flex gap-1.5 pointer-events-auto">
                      <button className="w-3.5 h-3.5 border-2 border-gray-900 dark:border-purple-500 hover:bg-gray-400 dark:hover:bg-purple-500/50 transition-colors" aria-label="Minimize" />
                      <button className="w-3.5 h-3.5 border-2 border-gray-900 dark:border-purple-500 hover:bg-gray-400 dark:hover:bg-purple-500/50 transition-colors" aria-label="Maximize" />
                      <button className="w-3.5 h-3.5 border-2 border-gray-900 dark:border-purple-500 bg-red-400 hover:bg-red-500 transition-colors flex items-center justify-center" aria-label="Close">
                        <span className="text-[8px] font-bold text-gray-900 leading-none block rotate-45 mb-[1px]">+</span>
                      </button>
                    </div>
                  </div>

                  {/* Window Content */}
                  <div className={`p-6 sm:p-8 flex flex-col flex-1 pointer-events-auto ${isFeatured ? 'justify-between' : ''}`}>

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0 pr-4">
                        <div
                          className={`${isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'} font-mono font-bold uppercase tracking-tight text-gray-900 dark:text-white mb-3 group-hover:text-purple-500 transition-colors terminal-cursor-focus underline decoration-purple-500/30 underline-offset-4`}
                        >
                          {project.name}
                        </div>

                        {project.language && (
                          <div className="flex items-center gap-2 mb-4">
                            <div
                              className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                              style={{ backgroundColor: getLanguageColor(project.language) }}
                            />
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono uppercase tracking-wider">{project.language}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {project.html_url && (
                          <a
                            href={project.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full text-gray-500 hover:text-brand-purple hover:bg-brand-purple/10 transition-colors"
                            aria-label="GitHub"
                          >
                            <Github size={isFeatured ? 24 : 20} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className={`text-gray-700 dark:text-gray-300 font-mono leading-relaxed mb-6 ${isFeatured ? 'text-lg md:text-xl line-clamp-4' : 'text-sm line-clamp-3'}`}>
                      {project.description || 'A professional project showcasing modern development practices.'}
                    </p>

                    <div className={`mt-auto pt-6 border-t border-gray-100 dark:border-gray-800/50 flex items-center justify-between ${isFeatured ? 'flex-row' : 'flex-col sm:flex-row gap-4 sm:gap-0'}`}>
                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Star size={16} className={`${isFeatured ? 'text-yellow-400' : ''}`} />
                          <span className="font-medium">{project.stars}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GitFork size={16} />
                          <span className="font-mono font-bold">{project.forks}</span>
                        </div>
                      </div>

                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`retro-btn px-4 py-2 group/link ${isFeatured ? 'text-sm' : 'text-xs'}`}
                        >
                          Live Demo
                          <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/Sameep-Sharma"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-dark font-semibold transition-colors"
          >
            <span>View All Projects on GitHub</span>
            <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
