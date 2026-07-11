import { motion, useScroll, useTransform } from 'framer-motion'
import { Code, GraduationCap, CheckCircle2 } from 'lucide-react'
import { useRef } from 'react'
import SkillsMarquee from './SkillsMarquee'

const About = () => {
  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Remix.js'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
    { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'Supabase'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vs Code', 'Postman'] },
  ]

  const experience = [
    {
      icon: <GraduationCap className="text-brand-purple" size={22} />,
      title: 'Information Science and Engineering',
      institution: 'Siddaganga Institute of Technology',
      period: 'Present',
      description: 'Pursuing Bachelor\'s degree in Information Science and Engineering with focus on software architecture, algorithms, and modern development practices.',
    },
    {
      icon: <Code className="text-brand-purple" size={22} />,
      title: 'Full-Stack Developer',
      description: 'Developing scalable web applications and decentralized solutions. Specialized in React, Node.js, and Full-Stack technologies.',
    },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Parallax values
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const contentY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"])
  const contentY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])

  return (
    <section ref={containerRef} id="about" className="py-16 sm:py-24 md:py-32 relative bg-white/10 dark:bg-gray-950/10 backdrop-blur-[2px] overflow-hidden">
      {/* Parallax Background Shape */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[120px] -z-10 pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 sm:mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-gray-900 dark:text-white tracking-widest uppercase text-shadow-retro">
              About <span className="text-purple-500">Me</span>
            </h2>
            <div className="h-1 flex-1 max-w-24 bg-gray-900 dark:bg-purple-500" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed">
            I'm Sameep Sharma, a Information Science and Engineering student at Siddaganga Institute of Technology with a passion for building
            innovative solutions. My expertise spans full-stack web development, with a particular
            focus on JS Frameworks and modern web technologies. I enjoy solving complex problems
            and creating user-centric applications that make a difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-24">
          {/* Experience & Education */}
          <motion.div
            style={{ y: contentY1 }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-10"
          >
            <h3 className="text-2xl font-mono font-bold text-gray-900 dark:text-white mb-8 uppercase text-shadow-retro">Experience & Education</h3>
            <div className="space-y-6">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="retro-card p-4 sm:p-6 border-l-8 border-gray-900 dark:border-purple-500 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white dark:bg-black border-2 border-gray-900 dark:border-purple-500 rounded-none flex-shrink-0 group-hover:-translate-y-1 transition-transform duration-300">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 uppercase font-mono">{item.title}</h4>
                      <p className="text-purple-500 text-sm font-bold mb-2 uppercase tracking-wider">{item.institution} • {item.period}</p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-mono">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            style={{ y: contentY2 }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-10"
          >
            <h3 className="text-2xl font-mono font-bold text-gray-900 dark:text-white mb-8 uppercase text-shadow-retro">Technical Skills</h3>
            <div className="space-y-5">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="retro-card p-4 sm:p-6 group hover:border-gray-900 dark:hover:border-purple-400 transition-all duration-300"
                >
                  <h4 className="text-xs font-mono text-gray-900 dark:text-purple-500 uppercase tracking-widest mb-4 font-bold border-b-2 border-gray-900 dark:border-purple-500 pb-2">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1.5 bg-[#f4f4f0] dark:bg-black border-2 border-gray-900 dark:border-gray-600 shadow-[2px_2px_0px_rgba(17,24,39,1)] text-sm font-mono font-bold text-gray-900 dark:text-gray-100 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(168,85,247,1)] hover:border-purple-500 transition-all cursor-crosshair"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scrolling Skills Marquee */}
          <div className="col-span-full lg:col-span-2 -mx-4 sm:-mx-6 overflow-hidden">
            <SkillsMarquee />
          </div>
        </div>

        {/* Values / Approach */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="retro-card p-10"
        >
          <h3 className="text-2xl font-mono font-bold text-gray-900 dark:text-white mb-8 uppercase text-shadow-retro">My Approach</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Clean Code', desc: 'Writing maintainable, scalable, and well-documented code that stands the test of time' },
              { title: 'User-Centric', desc: 'Focusing on creating exceptional user experiences that solve real problems' },
              { title: 'Continuous Learning', desc: 'Staying updated with latest technologies and best practices in software development' },
            ].map((item, index) => (
              <div key={index} className="space-y-3 group hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 border-2 border-gray-900 dark:border-purple-500 bg-purple-400 text-gray-900 shadow-[2px_2px_0px_rgba(17,24,39,1)] group-hover:shadow-[4px_4px_0px_rgba(17,24,39,1)] transition-all">
                    <CheckCircle2 size={20} strokeWidth={3} />
                  </div>
                  <h4 className="font-mono font-bold text-gray-900 dark:text-white text-lg uppercase tracking-tight">{item.title}</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm font-mono leading-relaxed border-l-2 border-purple-500 pl-3 ml-5">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
