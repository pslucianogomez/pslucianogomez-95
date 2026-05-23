import styled from 'styled-components';
import { useRef, type ReactNode } from 'react';
import { Panel } from './Panel';
import { Glyph, type GlyphName } from './Glyph';
import { StatusStrip } from './Desktop/StatusStrip';
import { useLanguage } from '../contexts/LanguageContext';
import type { WindowId } from '../contexts/WindowsContext';

const Page = styled.div`
  padding-top: 44px;
  padding-bottom: 64px;
`;

const Section = styled.section`
  scroll-margin-top: 44px;
  margin: ${({ theme }) => theme.space['4']}px;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.space['2']}px;
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

const NavBtn = styled.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: transparent;
  color: ${({ theme }) => theme.colors.inkPaper};
  border: none;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 10px;
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
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const scrollTo = (id: WindowId) => refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <>
      <StatusStrip language={language} onToggleLanguage={() => setLanguage(language === 'es' ? 'en' : 'es')} />
      <Page>
        {ORDER.map((o) => (
          <Section key={o.id} ref={(el) => { refs.current[o.id] = el; }} id={o.id}>
            <SectionTitle>{t(o.tKey)}</SectionTitle>
            <Panel>{render(o.id)}</Panel>
          </Section>
        ))}
      </Page>
      <BottomNav>
        {ORDER.map((o) => (
          <NavBtn key={o.id} onClick={() => scrollTo(o.id)} aria-label={t(o.tKey)}>
            <Glyph name={o.glyph} size={20} />
            {t(o.tKey)}
          </NavBtn>
        ))}
      </BottomNav>
    </>
  );
};
