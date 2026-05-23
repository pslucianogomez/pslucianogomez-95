import styled from 'styled-components';

export const Panel = styled.div<{ $accent?: boolean; $soft?: boolean }>`
  background: ${({ theme, $soft }) => $soft ? theme.colors.paperSoft : theme.colors.inkPaper};
  border: ${({ theme }) => theme.border.thick};
  box-shadow: ${({ theme, $accent }) => $accent ? theme.shadow.btc : theme.shadow.base};
  padding: ${({ theme }) => theme.space['4']}px;
`;
