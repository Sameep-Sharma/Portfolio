import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CHAR_SET = " `.-':_,^=;><+!rc*z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@";

interface AsciiImageProps {
    imageUrl: string;
    cols?: number;
    bare?: boolean; // ✅ New: skip the window chrome when embedded
}

export default function AsciiImage({ imageUrl, cols = 80, bare = false }: AsciiImageProps) {
    const [asciiArt, setAsciiArt] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

    useEffect(() => {
        setLoading(true);
        setError(false);

        const img = new Image();
        img.crossOrigin = 'Anonymous';

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) return;

            const ratio = img.height / img.width;
            const rows = Math.floor(cols * ratio * 0.5);

            canvas.width = cols;
            canvas.height = rows;

            ctx.drawImage(img, 0, 0, cols, rows);
            const imageData = ctx.getImageData(0, 0, cols, rows);
            const pixels = imageData.data;

            const art: string[] = [];
            for (let row = 0; row < rows; row++) {
                let line = '';
                for (let col = 0; col < cols; col++) {
                    const idx = (row * cols + col) * 4;
                    const r = pixels[idx];
                    const g = pixels[idx + 1];
                    const b = pixels[idx + 2];
                    const a = pixels[idx + 3];

                    if (a < 50) { line += ' '; continue; }

                    let brightness = 0.299 * r + 0.587 * g + 0.114 * b;
                    brightness = Math.max(0, Math.min(255, (brightness - 128) * 1.2 + 128));
                    const charIdx = Math.floor((brightness / 255) * (CHAR_SET.length - 1));
                    line += CHAR_SET[charIdx];
                }
                art.push(line);
            }
            setAsciiArt(art);
            setLoading(false);
        };

        img.onerror = () => {
            setError(true);
            setLoading(false);
        };

        img.src = imageUrl;
    }, [imageUrl, cols]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    // ✅ Bare mode: just the ASCII content, no shell (for embedding)
    if (bare) {
        if (error) return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-red-500 font-mono text-sm uppercase">ERR_IMG_LOAD</p>
            </div>
        );
        return (
            <div
                className="w-full h-full flex items-center justify-center overflow-hidden cursor-crosshair group"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: 1000 }}
            >
                {loading ? (
                    <div className="text-purple-500 font-mono text-xs animate-pulse flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-b-2 border-purple-500 rounded-full animate-spin" />
                        <span>PROCESSING_IMAGE</span>
                    </div>
                ) : (
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="font-mono text-[5px] sm:text-[6.5px] md:text-[8px] lg:text-[10px] leading-[0.9] tracking-[0.1em] text-gray-900 dark:text-purple-500 whitespace-pre text-center select-none relative z-10 group-hover:text-purple-400"
                    >
                        {asciiArt.join('\n')}
                    </motion.div>
                )}
                <motion.div
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent to-purple-500/20 z-20 pointer-events-none border-b border-purple-500/50 mix-blend-overlay"
                />
            </div>
        );
    }

    // Standalone mode: full window chrome
    if (error) return (
        <div className="w-full aspect-square flex items-center justify-center bg-black border-4 border-gray-900 dark:border-red-500 shadow-[8px_8px_0px_0px_rgba(239,68,68,0.5)]">
            <p className="text-red-500 font-mono text-sm uppercase">ERR_IMG_LOAD</p>
        </div>
    );

    return (
        <div
            className="w-full aspect-square flex items-center justify-center bg-[#f4f4f0] dark:bg-black border-4 border-gray-900 dark:border-purple-500 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] dark:shadow-[8px_8px_0px_0px_rgba(168,85,247,1)] overflow-hidden relative cursor-crosshair group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
        >
            <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 border-b-4 border-gray-900 dark:border-purple-500 bg-gray-200 dark:bg-purple-500/10 flex items-center px-2 sm:px-3 justify-between z-20 pointer-events-none">
                <div className="flex gap-2 items-center">
                    <div className="h-2 w-2 sm:h-3 sm:w-3 border-2 border-gray-900 dark:border-purple-500 bg-[#f4f4f0] dark:bg-transparent" />
                    <span className="text-[8px] sm:text-[10px] font-mono font-bold text-gray-900 dark:text-purple-500 tracking-widest uppercase">
                        ASCII_RENDERER.EXE
                    </span>
                </div>
            </div>

            {loading ? (
                <div className="text-purple-500 font-mono text-xs animate-pulse pt-8 flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-b-2 border-purple-500 rounded-full animate-spin" />
                    <span>PROCESSING_IMAGE</span>
                </div>
            ) : (
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="font-mono text-[5px] sm:text-[6.5px] md:text-[8px] lg:text-[10px] leading-[0.9] tracking-[0.1em] text-gray-900 dark:text-purple-500 whitespace-pre text-center select-none pt-8 relative z-10 group-hover:text-purple-400"
                >
                    {asciiArt.join('\n')}
                </motion.div>
            )}

            <motion.div
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent to-purple-500/20 z-20 pointer-events-none border-b border-purple-500/50 mix-blend-overlay"
            />
        </div>
    );
}