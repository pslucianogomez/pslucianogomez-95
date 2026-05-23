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
`;

// Only the title area is the drag handle. Controls (—, ✕) live in a
// separate region so their clicks aren't swallowed by setPointerCapture.
const DragHandle = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['2']}px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: grab;
  flex: 1;
  min-width: 0;
  &:active { cursor: grabbing; }
`;

const Controls = styled.span`
  display: inline-flex;
  gap: ${({ theme }) => theme.space['2']}px;
  flex-shrink: 0;
`;

const CtrlBtn = styled.button<{ $accent?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ theme, $accent }) => $accent ? theme.colors.btc : 'inherit'};
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  padding: 0 ${({ theme }) => theme.space['1']}px;
  &:hover { color: ${({ theme }) => theme.colors.btc}; }
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
  <Bar $active={active}>
    <DragHandle onPointerDown={onPointerDown}>
      {icon}<span>▮ {title}</span>
    </DragHandle>
    <Controls>
      {onMinimize && <CtrlBtn onClick={onMinimize} aria-label="minimize">—</CtrlBtn>}
      <CtrlBtn $accent onClick={onClose} aria-label="close">✕</CtrlBtn>
    </Controls>
  </Bar>
);
