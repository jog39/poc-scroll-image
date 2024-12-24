import { useState, useEffect } from 'react';

export function useScrollImage(images: string[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
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
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, images.length]);

  return {
    currentImage: images[currentIndex],
    currentIndex,
  };
}