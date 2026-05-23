import styled from 'styled-components';
import type { ReactNode } from 'react';

const Root = styled.div`
  position: absolute;
  top: 34px; bottom: 38px; left: 0; right: 0;
  background-color: ${({ theme }) => theme.colors.paper};
  background-image: radial-gradient(${({ theme }) => theme.colors.ink} 1px, transparent 1px);
  background-size: 12px 12px;
  background-position: 0 0;
  /* dots are 35% opacity by virtue of paper bg dominating; if needed, mask: */
  &::before {
    content: '';
    position: absolute; inset: 0;
    background: ${({ theme }) => theme.colors.paper};
    opacity: 0.65;
    pointer-events: none;
  }
  & > * { position: relative; }
`;

const IconColumn = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space['4']}px;
  left: ${({ theme }) => theme.space['3']}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['3']}px;
  z-index: 1;
`;

const WindowCanvas = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  & > * { pointer-events: auto; }
`;

export const Desktop = ({ icons, children }: { icons: ReactNode; children: ReactNode }) => (
  <Root>
    <IconColumn>{icons}</IconColumn>
    <WindowCanvas>{children}</WindowCanvas>
  </Root>
);
