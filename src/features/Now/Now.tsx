import styled from 'styled-components';
import { now } from '../../data/now';
import { games } from '../../data/games';
import { useLanguage } from '../../contexts/LanguageContext';

const Row = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: start;
  gap: ${({ theme }) => theme.space['2']}px;
  padding: ${({ theme }) => theme.space['1']}px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.ink};
  &:last-child { border-bottom: none; }
`;

const RowLabel = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.6;
`;

const Value = styled.span<{ $truncate?: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.md};
  min-width: 0;
  ${({ $truncate }) => $truncate
    ? `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`
    : `overflow-wrap: anywhere;`}
`;

const Items = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const ItemLink = styled.a`
  display: inline-block;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.ink};
  text-decoration: none;
  overflow-wrap: anywhere;
  &::before {
    content: '▸ ';
    color: ${({ theme }) => theme.colors.btc};
    font-weight: 700;
  }
  &:hover { color: ${({ theme }) => theme.colors.btcDeep}; text-decoration: underline; }
`;

const ComingSoon = styled.section`
  margin-top: ${({ theme }) => theme.space['5']}px;
`;

const ComingSoonHeading = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  border-bottom: 1px dashed ${({ theme }) => theme.colors.ink};
  padding-bottom: ${({ theme }) => theme.space['1']}px;
  margin: 0 0 ${({ theme }) => theme.space['3']}px 0;
  font-weight: 700;
`;

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['3']}px;
`;

// Cozy CRT palette — local to the games console (warm phosphor, not the
// site's stark ink/paper) so the previews read as a glowing little terminal.
const CRT_BG = '#181410';
const CRT_BAR = '#241d16';
const CRT_TEXT = '#e8b06a';
const CRT_DIM = '#9c7a4f';

const GameWindow = styled.div`
  border: ${({ theme }) => theme.border.thick};
  box-shadow: ${({ theme }) => theme.shadow.base};
  background: ${CRT_BG};
  overflow: hidden;
`;

const GameBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px ${({ theme }) => theme.space['2']}px;
  background: ${CRT_BAR};
  color: ${CRT_TEXT};
  border-bottom: 1px solid ${CRT_DIM};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1px;
`;

const GameScreen = styled.pre`
  position: relative;
  margin: 0;
  padding: ${({ theme }) => theme.space['4']}px;
  background:
    radial-gradient(120% 120% at 50% 0%, rgba(232, 176, 106, 0.06), transparent 60%),
    ${CRT_BG};
  color: ${CRT_TEXT};
  text-shadow: 0 0 6px rgba(232, 176, 106, 0.35);
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 11px;
  line-height: 1.65;
  white-space: pre;
  overflow-x: auto;

  /* subtle CRT scanlines */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0 2px,
      rgba(0, 0, 0, 0.18) 2px 3px
    );
  }
`;

const GameShot = styled.img`
  display: block;
  width: 100%;
  background: ${CRT_BG};
`;

const GameFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space['2']}px;
  padding: ${({ theme }) => theme.space['2']}px;
  background: ${({ theme }) => theme.colors.inkPaper};
  border-top: ${({ theme }) => theme.border.thin};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const SoonBadge = styled.span`
  flex-shrink: 0;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 2px 6px;
  border: ${({ theme }) => theme.border.thin};
  box-shadow: 2px 2px 0 ${({ theme }) => theme.colors.btc};
  background: ${({ theme }) => theme.colors.btc};
  color: ${({ theme }) => theme.colors.ink};
`;

export const Now = () => {
  const { t, language } = useLanguage();
  return (
    <div>
      {now
        .filter((r) => r.value != null || (r.items && r.items.length > 0))
        .map((r) => (
          <Row key={r.label}>
            <RowLabel>{r.label}</RowLabel>
            {r.items ? (
              <Items>
                {r.items.map((it) => (
                  <li key={it.href}>
                    <ItemLink href={it.href} target="_blank" rel="noopener noreferrer">{it.label}</ItemLink>
                  </li>
                ))}
              </Items>
            ) : (
              <Value $truncate={r.truncate} title={r.value![language]}>{r.value![language]}</Value>
            )}
          </Row>
        ))}

      <ComingSoon>
        <ComingSoonHeading>{t('now.comingSoon')}</ComingSoonHeading>
        <Gallery>
          {games.map((g) => (
            <GameWindow key={g.exe}>
              <GameBar>
                <span>▮ {g.exe}</span>
                <span>— □ ✕</span>
              </GameBar>
              {g.image
                ? <GameShot src={g.image} alt={g.exe} />
                : <GameScreen>{g.screen}</GameScreen>}
              <GameFoot>
                <span>{g.tagline[language]}</span>
                <SoonBadge>{t('now.soon')}</SoonBadge>
              </GameFoot>
            </GameWindow>
          ))}
        </Gallery>
      </ComingSoon>
    </div>
  );
};
