import { useEffect, useState } from 'react';

export function useWindowSize() {
  const [size, setSize] = useState<{
    width: number;
    height: number;
  }>({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    function handleWindowResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      document.documentElement.style.setProperty(
        '--max-window-height',
        `${window.innerHeight}px`
      );
    }
    // Add event listener
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  return size;
}
