import { useEffect, useState } from 'react';
import { cosmetic } from '../../theme/tokens';

const compute = () =>
  cosmetic.blockBaseline + Math.floor((Date.now() - cosmetic.blockEpoch) / cosmetic.blockTickMs);

export const useBlockNumber = () => {
  const [n, setN] = useState(compute);
  useEffect(() => {
    const id = setInterval(() => setN(compute()), cosmetic.blockTickMs);
    return () => clearInterval(id);
  }, []);
  return n;
};

export const getBlockNumber = compute;
