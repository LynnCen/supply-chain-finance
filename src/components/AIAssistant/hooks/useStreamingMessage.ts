import { useState, useEffect, useRef } from 'react';
import { ANIMATION_DURATION } from '../constants';

interface UseStreamingMessageOptions {
  content: string;
  speed?: number;
  onComplete?: () => void;
}

export const useStreamingMessage = ({
  content,
  speed = ANIMATION_DURATION.TYPING_SPEED,
  onComplete,
}: UseStreamingMessageOptions) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  const indexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!content) return;

    indexRef.current = 0;
    setDisplayedContent('');
    setIsStreaming(true);

    const streamText = () => {
      if (indexRef.current < content.length) {
        setDisplayedContent(content.slice(0, indexRef.current + 1));
        indexRef.current++;
        timerRef.current = setTimeout(streamText, speed);
      } else {
        setIsStreaming(false);
        onComplete?.();
      }
    };

    streamText();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [content, speed, onComplete]);

  const skipStreaming = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDisplayedContent(content);
    setIsStreaming(false);
    onComplete?.();
  };

  return {
    displayedContent,
    isStreaming,
    skipStreaming,
  };
};

