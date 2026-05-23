import { useEffect, useState } from 'react';

const QUERY = '(max-width: 767px)';

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
