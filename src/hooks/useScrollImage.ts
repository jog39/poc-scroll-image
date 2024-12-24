import { useState, useEffect } from 'react';

export function useScrollImage(images: string[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      
      // Add a time-based throttle (300ms between changes)
      if (currentTime - lastScrollTime < 300) {
        return;
      }

      // Add a minimum scroll threshold (100px)
      if (Math.abs(currentScrollY - lastScrollY) < 100) {
        return;
      }
      
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setCurrentIndex(prev => 
          prev < images.length - 1 ? prev + 1 : prev
        );
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setCurrentIndex(prev => 
          prev > 0 ? prev - 1 : prev
        );
      }
      
      setLastScrollY(currentScrollY);
      setLastScrollTime(currentTime);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, lastScrollTime, images.length]);

  return {
    currentImage: images[currentIndex],
    currentIndex,
  };
}