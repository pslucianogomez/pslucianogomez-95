import styled from 'styled-components';
import type { ReactNode } from 'react';
import { useDraggable, type Position } from './useDraggable';
import { WindowTitleBar } from './WindowTitleBar';

const Frame = styled.div<{ $active: boolean; $dragging: boolean; $z: number }>`
  position: absolute;
  background: ${({ theme }) => theme.colors.inkPaper};
  border: ${({ theme }) => theme.border.thick};
  box-shadow: ${({ theme, $active, $dragging }) =>
    $dragging ? theme.shadow.drag : $active ? theme.shadow.focus : theme.shadow.base};
  z-index: ${({ $z }) => $z};
  display: flex;
  flex-direction: column;
  min-width: 240px;
`;

const Body = styled.div`
  padding: ${({ theme }) => theme.space['4']}px;
  overflow: auto;
`;

export interface WindowProps {
  id: string;
  title: string;
  icon?: ReactNode;
  position: Position;
  size?: { w: number; h: number };
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onFocus: () => void;
  onPositionChange: (p: Position) => void;
  children: ReactNode;
}

export const Window = ({
  title, icon, position, size, zIndex, isActive,
  onClose, onMinimize, onFocus, onPositionChange, children,
}: WindowProps) => {
  const { position: pos, isDragging, onPointerDown } = useDraggable({
    initial: position,
    bounds: { width: window.innerWidth - 280, height: window.innerHeight - 80 },
    onDragEnd: (final) => onPositionChange(final),
  });

  return (
    <Frame
      $active={isActive}
      $dragging={isDragging}
      $z={zIndex}
      style={{ left: pos.x, top: pos.y, width: size?.w, height: size?.h }}
      onMouseDownCapture={() => { if (!isActive) onFocus(); }}
    >
      <WindowTitleBar
        title={title}
        icon={icon}
        active={isActive}
        onClose={onClose}
        onMinimize={onMinimize}
        onPointerDown={(e) => { onFocus(); onPointerDown(e); }}
      />
      <Body>{children}</Body>
    </Frame>
  );
};
