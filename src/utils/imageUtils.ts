export const getImagePath = (index: number) => {
  const paddedIndex = String(index + 1).padStart(3, '0');
  return `/images/out-${paddedIndex}.jpg`;
};