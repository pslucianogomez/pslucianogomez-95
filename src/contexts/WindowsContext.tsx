import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type WindowId = 'profile' | 'experience' | 'contact' | 'stack' | 'now' | 'not-found';

export interface OpenWindow {
  id: WindowId;
  route: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  zIndex: number;
  minimized: boolean;
}

interface WindowsContextValue {
  windows: OpenWindow[];
  open: (id: WindowId, route: string) => void;
  close: (id: WindowId) => void;
  focus: (id: WindowId) => void;
  toggleMinimize: (id: WindowId) => void;
  updatePosition: (id: WindowId, position: { x: number; y: number }) => void;
  topId: WindowId | null;
}

const Ctx = createContext<WindowsContextValue | null>(null);

const Z_BASE = 1000;

const DEFAULTS: Record<WindowId, { position: { x: number; y: number }; size: { w: number; h: number } }> = {
  profile:     { position: { x: 140, y: 80 },  size: { w: 420, h: 360 } },
  experience:  { position: { x: 180, y: 110 }, size: { w: 560, h: 440 } },
  contact:     { position: { x: 220, y: 140 }, size: { w: 460, h: 480 } },
  stack:       { position: { x: 260, y: 170 }, size: { w: 420, h: 360 } },
  now:         { position: { x: 300, y: 200 }, size: { w: 320, h: 340 } },
  'not-found': { position: { x: 200, y: 200 }, size: { w: 360, h: 200 } },
};

const nextZ = (prev: OpenWindow[]) =>
  prev.reduce((max, w) => (w.zIndex > max ? w.zIndex : max), Z_BASE) + 1;

export const WindowsProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<OpenWindow[]>([]);

  const open = useCallback((id: WindowId, route: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        // Already top and visible → no-op (avoids re-renders and z thrash).
        const maxZ = prev.reduce((m, w) => (w.zIndex > m ? w.zIndex : m), Z_BASE);
        if (!existing.minimized && existing.zIndex === maxZ) return prev;
        const z = maxZ + 1;
        return prev.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: z } : w));
      }
      const def = DEFAULTS[id];
      return [...prev, { id, route, position: def.position, size: def.size, zIndex: nextZ(prev), minimized: false }];
    });
  }, []);

  const close = useCallback((id: WindowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focus = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const target = prev.find((w) => w.id === id);
      if (!target) return prev;
      // Already top and visible → no-op.
      const maxZ = prev.reduce((m, w) => (w.zIndex > m ? w.zIndex : m), Z_BASE);
      if (!target.minimized && target.zIndex === maxZ) return prev;
      const z = maxZ + 1;
      return prev.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: z } : w));
    });
  }, []);

  const toggleMinimize = useCallback((id: WindowId) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)));
  }, []);

  const updatePosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position } : w)));
  }, []);

  const topId = useMemo<WindowId | null>(() => {
    const visible = windows.filter((w) => !w.minimized);
    if (visible.length === 0) return null;
    return visible.reduce((top, w) => (w.zIndex > top.zIndex ? w : top)).id;
  }, [windows]);

  const value = useMemo<WindowsContextValue>(() => ({
    windows, open, close, focus, toggleMinimize, updatePosition, topId,
  }), [windows, open, close, focus, toggleMinimize, updatePosition, topId]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useWindows = (): WindowsContextValue => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useWindows must be used inside <WindowsProvider>');
  return v;
};
