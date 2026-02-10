import { useState, useEffect } from 'react';

interface LoadingSequenceProps {
  onComplete?: () => void;
  messages?: string[];
}

const defaultMessages = [
  '[SYSTEM] Initializing secure connection...',
  '[KERNEL] Loading core modules...',
  '[NET] Establishing encrypted tunnel...',
  '[AUTH] Verifying credentials...',
  '[DATA] Fetching user profile...',
  '[RENDER] Preparing interface...',
  '[DONE] Access granted.',
];

export const LoadingSequence = ({ onComplete, messages = defaultMessages }: LoadingSequenceProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentLine < messages.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, messages[currentLine]]);
        setCurrentLine(prev => prev + 1);
        setProgress(((currentLine + 1) / messages.length) * 100);
      }, 200 + Math.random() * 300);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        onComplete?.();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, messages, onComplete]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl p-8">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500" />
            <div className="terminal-dot bg-yellow-500" />
            <div className="terminal-dot bg-green-500" />
            <span className="ml-4 text-muted-foreground text-sm">system_boot.sh</span>
          </div>
          <div className="p-4 font-mono text-sm min-h-[300px]">
            {displayedLines.map((line, i) => (
              <div key={i} className="mb-1">
                <span className="text-muted-foreground">{`[${String(i).padStart(2, '0')}]`}</span>
                <span className={line.includes('[DONE]') ? 'text-green-500' : 'text-foreground'}> {line}</span>
              </div>
            ))}
            {currentLine < messages.length && (
              <span className="inline-block w-2 h-4 bg-primary animate-blink" />
            )}
          </div>
          <div className="px-4 pb-4">
            <div className="status-bar">
              <div className="status-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-right">
              {Math.round(progress)}% complete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
