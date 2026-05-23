import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Desktop, DesktopIcon, StatusStrip } from './Desktop';
import { Taskbar, TaskbarItem } from './Taskbar';
import { Window } from './Window';
import { Glyph, type GlyphName } from './Glyph';
import { useWindows, type WindowId } from '../contexts/WindowsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BootSequence } from './Boot';
import { ErrorBoundary } from './ErrorBoundary';
import { useIsMobile } from '../hooks/useIsMobile';
import { MobileLayout } from './MobileLayout';

const ICON_MAP: Array<{ id: WindowId; route: string; glyph: GlyphName; tKey: string }> = [
  { id: 'profile',    route: '/profile',    glyph: 'user',      tKey: 'icon.profile' },
  { id: 'experience', route: '/experience', glyph: 'briefcase', tKey: 'icon.experience' },
  { id: 'stack',      route: '/stack',      glyph: 'box',       tKey: 'icon.stack' },
  { id: 'now',        route: '/now',        glyph: 'pulse',     tKey: 'icon.now' },
  { id: 'contact',    route: '/contact',    glyph: 'mail',      tKey: 'icon.contact' },
];

export const Shell = ({ children }: { children: (id: WindowId) => React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { windows, open, close, focus, toggleMinimize, updatePosition, updateSize, topId } = useWindows();
  const { t, language, setLanguage } = useLanguage();

  const [highlighted, setHighlighted] = useState<WindowId | null>(null);

  // START button → quick guided tour: open each window in sequence so a
  // visitor sees every part of the site in one go.
  const tourTimers = useRef<number[]>([]);
  const runTour = useCallback(() => {
    tourTimers.current.forEach(clearTimeout);
    tourTimers.current = ICON_MAP.map((m, i) =>
      window.setTimeout(() => open(m.id, m.route), i * 850),
    );
  }, [open]);
  useEffect(() => () => tourTimers.current.forEach(clearTimeout), []);

  // sync route → open window
  useEffect(() => {
    const match = ICON_MAP.find((i) => location.pathname.startsWith(i.route));
    if (match) open(match.id, match.route);
  }, [location.pathname, open]);

  // sync focused window → URL (replace, not push). Only navigate when the
  // top-window changes — not on every windows[] mutation (e.g. dragging).
  useEffect(() => {
    if (topId) {
      const match = ICON_MAP.find((i) => i.id === topId);
      if (match && !location.pathname.startsWith(match.route)) {
        navigate(match.route, { replace: true });
      }
    } else if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
    // location.pathname intentionally excluded — only react to topId changes
    // to avoid the open()→navigate()→open() feedback loop Chrome throttles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topId, navigate]);

  // Boot intro plays on every load (desktop AND mobile). First visit shows the
  // full sequence; once seen (localStorage flag) returning visits get a short,
  // small-type 4-line version.
  const [showBoot, setShowBoot] = useState(true);
  const [bootCompact] = useState(() => {
    try { return localStorage.getItem('pslg.boot-seen') === 'true'; } catch { return false; }
  });
  const dismissBoot = () => {
    setShowBoot(false);
    try { localStorage.setItem('pslg.boot-seen', 'true'); } catch { /* ignore quota */ }
  };
  const boot = showBoot && <BootSequence compact={bootCompact} onDone={dismissBoot} />;

  const isMobile = useIsMobile();
  if (isMobile) {
    return <>{boot}<MobileLayout render={children} /></>;
  }

  return (
    <>
      {boot}
      <StatusStrip language={language} onToggleLanguage={() => setLanguage(language === 'es' ? 'en' : 'es')} />
      <Desktop
        icons={ICON_MAP.map((i) => (
          <DesktopIcon
            key={i.id}
            label={t(i.tKey)}
            icon={<Glyph name={i.glyph} size={26} />}
            highlighted={highlighted === i.id}
            onHighlight={() => setHighlighted(i.id)}
            onActivate={() => navigate(i.route)}
          />
        ))}
      >
        {windows.filter(w => !w.minimized).map((w) => {
          const meta = ICON_MAP.find((m) => m.id === w.id);
          return (
            <Window
              key={w.id}
              id={w.id}
              title={meta ? t(meta.tKey) : w.id}
              icon={meta ? <Glyph name={meta.glyph} size={14} /> : null}
              position={w.position}
              size={w.size}
              zIndex={w.zIndex}
              isActive={topId === w.id}
              onClose={() => close(w.id)}
              onMinimize={() => toggleMinimize(w.id)}
              onFocus={() => focus(w.id)}
              onPositionChange={(p) => updatePosition(w.id, p)}
              onSizeChange={(s) => updateSize(w.id, s)}
            >
              <ErrorBoundary>{children(w.id)}</ErrorBoundary>
            </Window>
          );
        })}
      </Desktop>
      <Taskbar
        onStart={runTour}
        items={windows.map((w) => {
          const meta = ICON_MAP.find((m) => m.id === w.id);
          return (
            <TaskbarItem
              key={w.id}
              label={meta ? t(meta.tKey) : w.id}
              active={topId === w.id && !w.minimized}
              minimized={w.minimized}
              onClick={() => {
                if (w.minimized) focus(w.id);
                else if (topId === w.id) toggleMinimize(w.id);
                else focus(w.id);
              }}
            />
          );
        })}
      />
    </>
  );
};
