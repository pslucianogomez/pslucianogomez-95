import styled from 'styled-components';
import { useState, type ReactNode } from 'react';
import { Panel } from './Panel';
import { Glyph, type GlyphName } from './Glyph';
import { StatusStrip } from './Desktop/StatusStrip';
import { useLanguage } from '../contexts/LanguageContext';
import type { WindowId } from '../contexts/WindowsContext';

// Full-screen content area between the status strip (34px) and bottom nav (56px).
const Screen = styled.div`
  position: fixed;
  top: 34px;
  bottom: 56px;
  left: 0;
  right: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: ${({ theme }) => theme.space['4']}px;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin: 0 0 ${({ theme }) => theme.space['2']}px 0;
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 56px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: ${({ theme }) => theme.colors.ink};
  border-top: ${({ theme }) => theme.border.thick};
  z-index: 20;
`;

const NavBtn = styled.button<{ $active: boolean }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: ${({ theme, $active }) => ($active ? theme.colors.btc : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.ink : theme.colors.inkPaper)};
  border: none;
  border-right: 1px solid ${({ theme }) => theme.colors.muted};
  &:last-child { border-right: none; }
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 10px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
`;

const ORDER: Array<{ id: WindowId; glyph: GlyphName; tKey: string }> = [
  { id: 'profile',    glyph: 'user',      tKey: 'icon.profile' },
  { id: 'now',        glyph: 'pulse',     tKey: 'icon.now' },
  { id: 'stack',      glyph: 'box',       tKey: 'icon.stack' },
  { id: 'experience', glyph: 'briefcase', tKey: 'icon.experience' },
  { id: 'contact',    glyph: 'mail',      tKey: 'icon.contact' },
];

export const MobileLayout = ({ render }: { render: (id: WindowId) => ReactNode }) => {
  const { t, language, setLanguage } = useLanguage();
  const [active, setActive] = useState<WindowId>(ORDER[0].id);
  const activeMeta = ORDER.find((o) => o.id === active) ?? ORDER[0];

  return (
    <>
      <StatusStrip language={language} onToggleLanguage={() => setLanguage(language === 'es' ? 'en' : 'es')} />
      <Screen key={active}>
        <SectionTitle>{t(activeMeta.tKey)}</SectionTitle>
        <Panel>{render(active)}</Panel>
      </Screen>
      <BottomNav>
        {ORDER.map((o) => (
          <NavBtn
            key={o.id}
            $active={active === o.id}
            onClick={() => setActive(o.id)}
            aria-label={t(o.tKey)}
            aria-current={active === o.id}
          >
            <Glyph name={o.glyph} size={20} />
            {t(o.tKey)}
          </NavBtn>
        ))}
      </BottomNav>
    </>
  );
};
