import styled from 'styled-components';
import type { ReactNode } from 'react';

const Bar = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space['1']}px ${({ theme }) => theme.space['3']}px;
  background: ${({ theme, $active }) => $active ? theme.colors.ink : theme.colors.paperSoft};
  color: ${({ theme, $active }) => $active ? theme.colors.inkPaper : theme.colors.ink};
  border-bottom: ${({ theme }) => theme.border.thin};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  user-select: none;
  cursor: grab;
  &:active { cursor: grabbing; }
`;

const Title = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['2']}px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Controls = styled.span`
  display: inline-flex;
  gap: ${({ theme }) => theme.space['2']}px;
`;

const CtrlBtn = styled.button<{ $accent?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ theme, $accent }) => $accent ? theme.colors.btc : 'inherit'};
  font-family: inherit;
  font-size: inherit;
  cursor: crosshair;
  padding: 0 ${({ theme }) => theme.space['1']}px;
`;

export interface WindowTitleBarProps {
  title: string;
  icon?: ReactNode;
  active: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onPointerDown: (e: React.PointerEvent) => void;
}

export const WindowTitleBar = ({ title, icon, active, onClose, onMinimize, onPointerDown }: WindowTitleBarProps) => (
  <Bar $active={active} onPointerDown={onPointerDown}>
    <Title>{icon}<span>▮ {title}</span></Title>
    <Controls>
      {onMinimize && <CtrlBtn onClick={onMinimize} aria-label="minimize">—</CtrlBtn>}
      <CtrlBtn $accent onClick={onClose} aria-label="close">✕</CtrlBtn>
    </Controls>
  </Bar>
);
