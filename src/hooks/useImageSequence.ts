import { useCallback, useRef } from 'react';
import { useSmoothScroll } from './useSmoothScroll';

export const useImageSequence = (
  totalImages: number,
  currentIndex: number,
  onIndexChange: (index: number) => void
) => {
  const scrollHeight = useRef(document.documentElement.scrollHeight - window.innerHeight);
  
  const handleScroll = useCallback((scrollY: number) => {
    const progress = Math.min(1, Math.max(0, scrollY / scrollHeight.current));
    const newIndex = Math.min(
      totalImages - 1,
      Math.floor(progress * totalImages)
    );
    
    if (newIndex !== currentIndex) {
      onIndexChange(newIndex);
    }
  }, [currentIndex, totalImages, onIndexChange]);

  useSmoothScroll(handleScroll, { damping: 0.1 });

  return { currentIndex };
};