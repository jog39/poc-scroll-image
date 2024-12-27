import { useEffect, useRef } from 'react';

interface UseCanvasProps {
  onResize?: () => void;
}

export const useCanvas = ({ onResize }: UseCanvasProps = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      onResize?.();
    };

    // Initial setup
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onResize]);

  return canvasRef;
};