import LogoLoop from './LogoLoop'
import { useTheme } from '../contexts/ThemeContext'
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGit,
  SiSupabase,
  SiRemix,
  SiPostman,
  SiPostgresql
} from 'react-icons/si'

const skillLogos = [
  { node: <SiReact className="text-2xl" />, title: 'React', href: 'https://react.dev' },
  { node: <SiTypescript className="text-2xl" />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiNextdotjs className="text-2xl" />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiNodedotjs className="text-2xl" />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiHtml5 className="text-2xl" />, title: 'HTML5', href: 'https://html.spec.whatwg.org' },
  { node: <SiCss3 className="text-2xl" />, title: 'CSS3', href: 'https://www.w3.org/Style/CSS' },
  { node: <SiJavascript className="text-2xl" />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiGit className="text-2xl" />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiSupabase className="text-2xl" />, title: 'Supabase', href: 'https://supabase.com' },
  { node: <SiRemix className="text-2xl" />, title: 'Remix', href: 'https://remix.run' },
  { node: <SiPostman className="text-2xl" />, title: 'Postman', href: 'https://postman.com' },
  { node: <SiPostgresql className="text-2xl" />, title: 'PostgreSQL', href: 'https://www.postgresql.org/' },

]

const SkillsMarquee = () => {
  const { theme } = useTheme()

  const fadeColor = theme === 'dark' ? '#030712' : '#ffffff'

  return (
    <div className="py-6">
      <LogoLoop
        logos={skillLogos}
        speed={50}
        direction="left"
        logoHeight={40}
        gap={60}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor={fadeColor}
        ariaLabel="Technology skills"
      />
    </div>
  )
}

export default SkillsMarquee
