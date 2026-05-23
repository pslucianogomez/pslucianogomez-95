import { useEffect, useState } from 'react';

// Use the touch/mobile layout on phones AND tablets: narrow screens OR a
// coarse primary pointer (touch). Notebooks/PCs with a mouse keep the
// draggable-window desktop. The two queries are OR'd by the comma.
const QUERY = '(max-width: 1024px), (pointer: coarse)';

export const useIsMobile = () => {
  const [is, setIs] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(QUERY).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = (e: MediaQueryListEvent) => setIs(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return is;
};
