import { useCallback } from 'react';
import { getImagePath } from '../utils/imageUtils';

interface DrawImageProps {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
}

const drawImageToCanvas = ({ canvas, image }: DrawImageProps) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Calculate dimensions to maintain aspect ratio and cover canvas
  const scale = Math.max(
    canvas.width / image.width,
    canvas.height / image.height
  );
  const x = (canvas.width - image.width * scale) / 2;
  const y = (canvas.height - image.height * scale) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    image,
    x,
    y,
    image.width * scale,
    image.height * scale
  );
};

export const useCanvasDrawing = (getPreloadedImage: (src: string) => HTMLImageElement | undefined) => {
  const drawImage = useCallback(async (canvas: HTMLCanvasElement, index: number) => {
    const image = await getPreloadedImage(getImagePath(index));
    if (!image) return;
    
    drawImageToCanvas({ canvas, image });
  }, [getPreloadedImage]);

  return { drawImage };
};