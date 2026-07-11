import { useRef, HTMLAttributes, ReactNode, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, MotionProps } from 'framer-motion'

// Combine HTML attributes with Motion props, omitting conflicting ones
type BaseProps = Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps>
interface SpotlightCardProps extends BaseProps {
    children: ReactNode
    className?: string
    spotlightColor?: string
}

const SpotlightCard = ({
    children,
    className = "",
    ...props
}: SpotlightCardProps & MotionProps) => {
    const divRef = useRef<HTMLDivElement>(null)

    // 3D Tilt Effect Springs
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const mouseXSpring = useSpring(x, { damping: 20, stiffness: 300 })
    const mouseYSpring = useSpring(y, { damping: 20, stiffness: 300 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7])

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return
        const rect = divRef.current.getBoundingClientRect()

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
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            initial={{ perspective: 1200 }}
            className={`relative overflow-visible retro-card ${className}`}
            {...props}
        >
            <div className="relative h-full z-10">{children}</div>
        </motion.div>
    )
}

export default SpotlightCard
