import styled from 'styled-components';
import { useBlockNumber } from './useBlockNumber';

const Chip = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.85;
`;

export const BlockBadge = () => {
  const n = useBlockNumber();
  return <Chip>BLOCK #{n.toLocaleString('en-US')}</Chip>;
};
