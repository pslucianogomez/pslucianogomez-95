import styled from 'styled-components';

export const Badge = styled.span<{ $accent?: boolean }>`
  display: inline-flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['1']}px ${({ theme }) => theme.space['2']}px;
  border: ${({ theme }) => theme.border.thin};
  background: ${({ theme }) => theme.colors.inkPaper};
  color: ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme, $accent }) => $accent ? theme.shadow.btc : theme.shadow.base};
`;
