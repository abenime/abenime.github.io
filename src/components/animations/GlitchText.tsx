import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
}

export const GlitchText = ({ text, className = '', glitchOnHover = false }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(!glitchOnHover);
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(text);
      return;
    }

    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    let interval: NodeJS.Timeout;

    const glitch = () => {
      const glitched = text
        .split('')
        .map((char) => {
          if (Math.random() < 0.1) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return char;
        })
        .join('');
      setDisplayText(glitched);
    };

    interval = setInterval(glitch, 100);

    const resetTimeout = setTimeout(() => {
      clearInterval(interval);
      setDisplayText(text);
    }, 300);

    const nextGlitch = setTimeout(() => {
      if (isGlitching) {
        interval = setInterval(glitch, 100);
      }
    }, 2000 + Math.random() * 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(resetTimeout);
      clearTimeout(nextGlitch);
    };
  }, [text, isGlitching]);

  return (
    <span
      className={`relative ${className}`}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      onMouseLeave={() => glitchOnHover && setIsGlitching(false)}
      data-text={text}
    >
      <span className="glitch" data-text={displayText}>
        {displayText}
      </span>
    </span>
  );
};
