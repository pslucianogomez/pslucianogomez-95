import styled from 'styled-components';
import { cosmetic } from '../theme/tokens';

const Span = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1px;
`;

export const HexAddress = ({ value = cosmetic.pseudoAddress }: { value?: string }) => (
  <Span>{value}</Span>
);
