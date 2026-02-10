import { ReactNode } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const TerminalWindow = ({ title = 'terminal', children, className = '' }: TerminalWindowProps) => {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="ml-4 text-muted-foreground text-sm font-mono">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  );
};
