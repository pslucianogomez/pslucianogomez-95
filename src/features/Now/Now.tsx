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

const GameWindow = styled.div`
  border: ${({ theme }) => theme.border.thick};
  box-shadow: ${({ theme }) => theme.shadow.base};
  background: ${({ theme }) => theme.colors.ink};
`;

const GameBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px ${({ theme }) => theme.space['2']}px;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.inkPaper};
  border-bottom: 1px solid ${({ theme }) => theme.colors.muted};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1px;
`;

const GameScreen = styled.pre`
  margin: 0;
  padding: ${({ theme }) => theme.space['3']}px;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 10px;
  line-height: 1.5;
  white-space: pre;
  overflow-x: auto;
`;

const GameShot = styled.img`
  display: block;
  width: 100%;
  background: ${({ theme }) => theme.colors.ink};
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
