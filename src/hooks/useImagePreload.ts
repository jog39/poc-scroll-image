import { useEffect } from 'react';

export function useImagePreload(images: string[], currentIndex: number, preloadCount: number = 10) {
  useEffect(() => {
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + preloadCount, images.length);

    // Preload next images
    for (let i = startIndex; i < endIndex; i++) {
      const img = new Image();
      img.src = images[i];
    }
  }, [currentIndex, images, preloadCount]);
}