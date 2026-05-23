import { useWindows } from '../contexts/WindowsContext';

// Convenience wrapper around useWindows for the common "give me state of one window" lookup.
export const useWindow = (id: Parameters<ReturnType<typeof useWindows>['open']>[0]) => {
  const { windows, topId } = useWindows();
  const w = windows.find((x) => x.id === id);
  return { window: w, isActive: topId === id };
};
