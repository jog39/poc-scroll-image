import { useCallback, useEffect, useRef, useState } from 'react';
import { getImagePath } from '../utils/imageUtils';

export const useImageSequence = (
  totalImages: number,
  currentIndex: number,
  onIndexChange: (index: number) => void
) => {
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollDelta = window.scrollY - lastScrollY.current;
    const threshold = 5;
    
    if (Math.abs(scrollDelta) > threshold) {
      const direction = scrollDelta > 0 ? 1 : -1;
      const newIndex = Math.min(
        Math.max(0, currentIndex + direction),
        totalImages - 1
      );
      
      if (newIndex !== currentIndex) {
        onIndexChange(newIndex);
      }
    }
    
    lastScrollY.current = window.scrollY;
  }, [currentIndex, totalImages, onIndexChange]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { currentIndex };
};