import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export const TypewriterText = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  showCursor = true,
  onComplete,
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let index = 0;

    const startTyping = () => {
      setIsTyping(true);
      const type = () => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
          timeout = setTimeout(type, speed + Math.random() * 30);
        } else {
          setIsTyping(false);
          onComplete?.();
        }
      };
      type();
    };

    timeout = setTimeout(startTyping, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className={`inline-block w-2 h-5 bg-primary ml-1 ${isTyping ? 'animate-blink' : ''}`} />
      )}
    </span>
  );
};
