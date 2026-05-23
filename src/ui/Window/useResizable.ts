import { useEffect, useRef, useState, useCallback } from 'react';

export interface Size { w: number; h: number }

export interface UseResizableOptions {
  initial: Size;
  min?: Size;
  onResizeEnd?: (final: Size) => void;
}

export function useResizable({ initial, min = { w: 240, h: 140 }, onResizeEnd }: UseResizableOptions) {
  const [size, setSize] = useState<Size>(initial);
  const [isResizing, setIsResizing] = useState(false);
  const startRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const sizeRef = useRef<Size>(initial);
  sizeRef.current = size;

  // Track external size changes (e.g. when WindowsContext is the source of truth and
  // initial is replaced after an opening offset).
  const initialRef = useRef(initial);
  useEffect(() => {
    if (initial.w !== initialRef.current.w || initial.h !== initialRef.current.h) {
      initialRef.current = initial;
      setSize(initial);
    }
  }, [initial]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY, w: sizeRef.current.w, h: sizeRef.current.h };
    setIsResizing(true);
  }, []);

  useEffect(() => {
    if (!isResizing) return;
    const move = (ev: PointerEvent) => {
      if (!startRef.current) return;
      const w = Math.max(min.w, startRef.current.w + (ev.clientX - startRef.current.x));
      const h = Math.max(min.h, startRef.current.h + (ev.clientY - startRef.current.y));
      setSize({ w, h });
    };
    const up = () => {
      setIsResizing(false);
      onResizeEnd?.(sizeRef.current);
    };
    const cancel = () => setIsResizing(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', cancel);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', cancel);
    };
  }, [isResizing, min.w, min.h, onResizeEnd]);

  return { size, isResizing, onPointerDown };
}
