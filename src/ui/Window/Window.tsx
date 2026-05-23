import styled from 'styled-components';
import type { ReactNode } from 'react';
import { useDraggable, type Position } from './useDraggable';
import { useResizable, type Size } from './useResizable';
import { WindowTitleBar } from './WindowTitleBar';

const Frame = styled.div<{ $active: boolean; $dragging: boolean }>`
  position: absolute;
  background: ${({ theme }) => theme.colors.inkPaper};
  border: ${({ theme }) => theme.border.thick};
  box-shadow: ${({ theme, $active, $dragging }) =>
    $dragging ? theme.shadow.drag : $active ? theme.shadow.focus : theme.shadow.base};
  display: flex;
  flex-direction: column;
  min-width: 240px;
  min-height: 140px;
`;

const Body = styled.div`
  padding: ${({ theme }) => theme.space['4']}px;
  overflow: auto;
  flex: 1;
  min-height: 0;
`;

const ResizeHandle = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nwse-resize;
  background:
    linear-gradient(135deg, transparent 0 7px, ${({ theme }) => theme.colors.ink} 7px 9px, transparent 9px 12px, ${({ theme }) => theme.colors.ink} 12px 14px, transparent 14px);
  &:hover {
    background:
      linear-gradient(135deg, transparent 0 7px, ${({ theme }) => theme.colors.btc} 7px 9px, transparent 9px 12px, ${({ theme }) => theme.colors.btc} 12px 14px, transparent 14px);
  }
`;

export interface WindowProps {
  id: string;
  title: string;
  icon?: ReactNode;
  position: Position;
  size: Size;
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onFocus: () => void;
  onPositionChange: (p: Position) => void;
  onSizeChange: (s: Size) => void;
  children: ReactNode;
}

export const Window = ({
  title, icon, position, size, zIndex, isActive,
  onClose, onMinimize, onFocus, onPositionChange, onSizeChange, children,
}: WindowProps) => {
  const { position: pos, isDragging, onPointerDown: onDragPointerDown } = useDraggable({
    initial: position,
    bounds: { width: window.innerWidth - 280, height: window.innerHeight - 80 },
    onDragEnd: (final) => onPositionChange(final),
  });

  const { size: liveSize, onPointerDown: onResizePointerDown } = useResizable({
    initial: size,
    onResizeEnd: (final) => onSizeChange(final),
  });

  return (
    <Frame
      $active={isActive}
      $dragging={isDragging}
      style={{ left: pos.x, top: pos.y, width: liveSize.w, height: liveSize.h, zIndex }}
      onMouseDownCapture={() => { if (!isActive) onFocus(); }}
    >
      <WindowTitleBar
        title={title}
        icon={icon}
        active={isActive}
        onClose={onClose}
        onMinimize={onMinimize}
        onPointerDown={(e) => { onFocus(); onDragPointerDown(e); }}
      />
      <Body>{children}</Body>
      <ResizeHandle onPointerDown={onResizePointerDown} aria-label="resize" />
    </Frame>
  );
};
