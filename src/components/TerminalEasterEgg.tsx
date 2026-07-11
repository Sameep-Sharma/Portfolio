import { useState, useRef, useEffect } from 'react';

const TerminalEasterEgg = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([
        'SYS_MAIN: Terminal Initialized...',
        'Type "help" to view available commands.',
    ]);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only auto-scroll if user has entered commands (history > initial 2 lines)
        if (history.length > 2) {
            endRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if (!cmd) return;

        let response = '';
        switch (cmd) {
            case 'help':
                response = 'AVAILABLE COMMANDS: whoami, stack, ping, clear, sudo';
                break;
            case 'whoami':
                response = 'Sameep Sharma | Sophomore@SIT, Tumakuru | STATUS: ONLINE';
                break;
            case 'stack':
                response = 'CORE_STACK: [REACT, TYPESCRIPT, NODE.JS, NEXT.JS]';
                break;
            case 'ping':
                response = 'PONG! CONNECTION_LATENCY: 12ms';
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case 'sudo':
                response = 'ACCESS DENIED: THIS INCIDENT WILL BE REPORTED.';
                break;
            default:
                response = `COMMAND NOT FOUND: ${cmd}`;
        }

        setHistory(prev => [...prev, `> ${cmd}`, response]);
        setInput('');
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-16 bg-black border-4 border-gray-900 dark:border-purple-500 shadow-[8px_8px_0px_rgba(168,85,247,0.2)] dark:shadow-[8px_8px_0px_rgba(168,85,247,1)] p-4 sm:p-6 text-left font-mono h-64 flex flex-col relative overflow-hidden group">

            {/* Ambient Scanline for Terminal */}
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                background: 'linear-gradient(rgba(168, 85, 247, 0.4) 50%, transparent 50%)',
                backgroundSize: '100% 4px',
            }} />

            <div className="flex items-center gap-2 mb-4 border-b-2 border-gray-900 dark:border-purple-900 pb-2">
                <div className="w-3 h-3 bg-red-500" />
                <div className="w-3 h-3 bg-yellow-500" />
                <div className="w-3 h-3 bg-purple-500" />
                <span className="ml-2 text-xs text-gray-500 font-bold uppercase">ROOT@SYS_SERVER_01:~</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 text-sm sm:text-base text-purple-400 no-scrollbar pr-2 relative z-10">
                {history.map((line, i) => (
                    <div key={i} className={line.startsWith('>') ? 'text-gray-400' : 'text-purple-500 font-bold'}>
                        {line}
                    </div>
                ))}
                <div ref={endRef} />
            </div>

            <form onSubmit={handleCommand} className="mt-4 flex gap-2 relative z-10">
                <span className="text-purple-500 font-bold">&gt;</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-purple-500 font-mono font-bold focus:ring-0 terminal-cursor-focus"
                    autoComplete="off"
                    spellCheck="false"
                />
            </form>
        </div>
    );
};

export default TerminalEasterEgg;
