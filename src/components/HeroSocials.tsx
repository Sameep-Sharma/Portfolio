import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSocials = () => {
    const socials = [
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/Sameep-Sharma',
            color: 'hover:text-[#2dba4e]',
            bg: 'hover:bg-[#2dba4e]/10',
            border: 'hover:border-[#2dba4e]/50'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://www.linkedin.com/in/sameep-sharma-39a676374/',
            color: 'hover:text-[#0077b5]',
            bg: 'hover:bg-[#0077b5]/10',
            border: 'hover:border-[#0077b5]/50'
        },
        {
            name: 'Email',
            icon: Mail,
            url: 'mailto:sharmasameep94@gmail.com',
            color: 'hover:text-[#ea4335]',
            bg: 'hover:bg-[#ea4335]/10',
            border: 'hover:border-[#ea4335]/50'
        }
    ];

    return (
        <div className="flex gap-4 pt-4">
            {socials.map((social, index) => (
                <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className={`relative group p-4 glass-strong rounded-xl border border-gray-200/50 dark:border-white/10 text-gray-600 dark:text-gray-400 transition-all duration-300 ${social.color} ${social.border} ${social.bg}`}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <social.icon size={24} strokeWidth={1.5} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />

                    {/* Tooltip */}
                    <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        whileHover={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-lg opacity-0 pointer-events-none whitespace-nowrap shadow-xl"
                    >
                        {social.name}
                        {/* Arrow */}
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white transform rotate-45" />
                    </motion.span>

                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10 ${social.bg.replace('hover:', '')}`} />
                </motion.a>
            ))}
        </div>
    );
};

export default HeroSocials;
