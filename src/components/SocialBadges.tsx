import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, MapPin, Linkedin, ArrowUpRight } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

interface GitHubProfile {
    login: string;
    avatar_url: string;
    html_url: string;
    name: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    location: string;
}

const SocialBadges = () => {    
    const [githubData, setGithubData] = useState<GitHubProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch GitHub Data
        fetch('https://api.github.com/users/Sameep-Sharma')
            .then(res => res.json())
            .then(data => {
                setGithubData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching GitHub data:', err);
                setLoading(false);
            });
    }, []);

    const linkedinProfile = {
        name: "Sameep Sharma",
        title: "Sophomore| Web Dev | DSA",
        location: "Tumakuru,Karnataka,India",
        url: "https://www.linkedin.com/in/sameep-sharma-39a676374/",
        avatar: "6677af9b46a5b1d9d281897dee91b79d.jpeg"
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto items-stretch justify-center">
            {/* Custom LinkedIn Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="md:flex-1 h-[300px]"
            >
                <SpotlightCard className="h-full group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black shadow-lg hover:shadow-xl transition-all duration-300" spotlightColor="rgba(59, 130, 246, 0.2)">
                    {/* Banner */}
                    <div className="h-24 bg-gradient-to-r from-blue-700 to-blue-500 relative">
                        <div className="absolute top-4 right-4 text-white/20">
                            <Linkedin size={48} />
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="px-6 pb-6 h-[calc(100%-6rem)] flex flex-col relative">
                        {/* Avatar */}
                        <div className="relative -mt-10 mb-3">
                            <div className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-900 bg-white dark:bg-gray-800 overflow-hidden shadow-lg">
                                <img
                                    src={linkedinProfile.avatar}
                                    alt={linkedinProfile.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {linkedinProfile.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2 line-clamp-2">
                                {linkedinProfile.title}
                            </p>

                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4">
                                <MapPin size={14} className="text-blue-500" />
                                {linkedinProfile.location}
                            </div>
                        </div>

                        <a
                            href={linkedinProfile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 rounded-lg border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold text-center hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all flex items-center justify-center gap-2 group/btn"
                        >
                            <span>Connect on LinkedIn</span>
                            <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                </SpotlightCard>
            </motion.div>

            {/* GitHub Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:flex-1 h-[300px]"
            >
                <SpotlightCard className="h-full group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black shadow-lg hover:shadow-xl transition-all duration-300" spotlightColor="rgba(168, 85, 247, 0.2)">
                    <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="p-6 h-full flex flex-col justify-between">
                        {loading ? (
                            <div className="animate-pulse space-y-4 w-full">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-700/50 rounded-full" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 w-32 bg-gray-700/50 rounded" />
                                        <div className="h-3 w-24 bg-gray-700/50 rounded" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 w-full bg-gray-700/50 rounded" />
                                    <div className="h-3 w-2/3 bg-gray-700/50 rounded" />
                                </div>
                            </div>
                        ) : githubData ? (
                            <a
                                href={githubData.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full relative z-10 w-full flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={githubData.avatar_url}
                                            alt={githubData.name}
                                            className="w-16 h-16 rounded-full border-2 border-brand-purple shadow-lg shadow-brand-purple/20"
                                        />
                                        <div className="min-w-0">
                                            <h3 className="text-gray-900 dark:text-white font-bold text-lg group-hover:text-brand-purple transition-colors line-clamp-1 truncate">
                                                {githubData.name || githubData.login}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm truncate">@{githubData.login}</p>
                                        </div>
                                    </div>
                                    <Github className="text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors flex-shrink-0" size={24} />
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 min-h-[40px] flex-1">
                                    {githubData.bio || "Full Stack Developer"}
                                </p>

                                <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-200 dark:border-white/10 border-b mb-3">
                                    <div className="text-center">
                                        <div className="text-brand-purple font-bold text-lg">{githubData.public_repos}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider text-[10px]">Repos</div>
                                    </div>
                                    <div className="text-center border-l border-gray-200 dark:border-white/10">
                                        <div className="text-brand-purple font-bold text-lg">{githubData.followers}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider text-[10px]">Followers</div>
                                    </div>
                                    <div className="text-center border-l border-gray-200 dark:border-white/10">
                                        <div className="text-brand-purple font-bold text-lg">{githubData.following}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider text-[10px]">Following</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <MapPin size={14} className="text-brand-purple flex-shrink-0" />
                                        <span className="truncate max-w-[100px]">{githubData.location || "Earth"}</span>
                                    </div>
                                    <div className="flex items-center gap-1 group-hover:text-brand-purple transition-colors flex-shrink-0">
                                        Visit Profile <ExternalLink size={14} />
                                    </div>
                                </div>
                            </a>
                        ) : (
                            <div className="text-center text-red-400 py-4 m-auto">
                                Failed to load GitHub profile
                            </div>
                        )}
                    </div>
                </SpotlightCard>
            </motion.div>
        </div>
    );
};

export default SocialBadges;
