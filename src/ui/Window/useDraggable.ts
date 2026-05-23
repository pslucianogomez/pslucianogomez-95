import { useEffect, useRef, useState, useCallback } from 'react';

export type Position = { x: number; y: number };

export interface UseDraggableOptions {
  initial: Position;
  bounds?: { width: number; height: number }; // viewport clamp
  snap?: number; // grid snap (px)
  onDragStart?: () => void;
  onDragEnd?: (final: Position) => void;
}

export function useDraggable({ initial, bounds, snap = 0, onDragStart, onDragEnd }: UseDraggableOptions) {
  const [position, setPosition] = useState<Position>(initial);
  const [isDragging, setIsDragging] = useState(false);
  const offsetRef = useRef<Position>({ x: 0, y: 0 });
  const positionRef = useRef<Position>(initial);

  // Keep ref in sync so handlers can read latest without re-binding.
  positionRef.current = position;

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    offsetRef.current = { x: e.clientX - positionRef.current.x, y: e.clientY - positionRef.current.y };
    setIsDragging(true);
    onDragStart?.();
  }, [onDragStart]);

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: PointerEvent) => {
      let nx = e.clientX - offsetRef.current.x;
      let ny = e.clientY - offsetRef.current.y;
      if (snap > 0) {
        nx = Math.round(nx / snap) * snap;
        ny = Math.round(ny / snap) * snap;
      }
      if (bounds) {
        nx = Math.max(0, Math.min(nx, bounds.width));
        ny = Math.max(0, Math.min(ny, bounds.height));
      }
      setPosition({ x: nx, y: ny });
    };
    const up = () => {
      setIsDragging(false);
      onDragEnd?.(positionRef.current);
    };
    const cancel = () => {
      setIsDragging(false);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', cancel);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', cancel);
    };
  }, [isDragging, bounds, snap, onDragEnd]);

  return { position, isDragging, onPointerDown, setPosition };
}
