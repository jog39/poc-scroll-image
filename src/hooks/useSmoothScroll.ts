import { useEffect, useRef } from 'react';

export const useSmoothScroll = (
  onScroll: (scrollY: number) => void,
  options = { damping: 0.1 }
) => {
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const updateScroll = () => {
      const delta = targetScrollY.current - currentScrollY.current;
      if (Math.abs(delta) > 0.1) {
        currentScrollY.current += delta * options.damping;
        onScroll(currentScrollY.current);
        animationFrame.current = requestAnimationFrame(updateScroll);
      }
    };

    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [onScroll, options.damping]);
};