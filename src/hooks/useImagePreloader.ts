import { useCallback, useEffect, useRef } from 'react';

export const useImagePreloader = () => {
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const loadingImages = useRef<Map<string, Promise<HTMLImageElement>>>(new Map());

  const preloadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    if (imageCache.current.has(src)) {
      return Promise.resolve(imageCache.current.get(src)!);
    }

    if (loadingImages.current.has(src)) {
      return loadingImages.current.get(src)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        imageCache.current.set(src, img);
        loadingImages.current.delete(src);
        resolve(img);
      };
      img.onerror = reject;
      img.src = src;
    });

    loadingImages.current.set(src, promise);
    return promise;
  }, []);

  const preloadImages = useCallback((srcs: string[]) => {
    return Promise.all(srcs.map(preloadImage));
  }, [preloadImage]);

  const getPreloadedImage = useCallback((src: string) => {
    return imageCache.current.get(src);
  }, []);

  return { preloadImage, preloadImages, getPreloadedImage };
};