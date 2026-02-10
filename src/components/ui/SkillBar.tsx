import { useEffect, useState } from 'react';

interface SkillBarProps {
  name: string;
  level: number;
  years?: number;
  delay?: number;
}

export const SkillBar = ({ name, level, years, delay = 0 }: SkillBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(level);
    }, delay);
    return () => clearTimeout(timeout);
  }, [level, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-sm text-foreground">{name}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {level}% {years && `| ${years}yr`}
        </span>
      </div>
      <div className="status-bar h-2">
        <div
          className="status-bar-fill"
          style={{ width: `${width}%`, transition: 'width 1s ease-out' }}
        />
      </div>
    </div>
  );
};
