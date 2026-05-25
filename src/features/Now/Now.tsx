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

// Role label inline next to the link, same type as the link (mono, same size).
const ItemRole = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.ink};
`;

const ItemNote = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.muted};
  padding-left: 14px;
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

// Dark terminal palette for the ambient pixel scenes (honeytree-style:
// chunky pixel art over a dark background + a status line). Local colours,
// not the site's ink/paper tokens.
const TERM_BG = '#161616';
const TERM_DIM = '#b3ad9f';
const TERM_TEXT = '#f0ece2';

const PALETTE: Record<string, string> = {
  G: '#7ec850', // bright green
  g: '#4f8a3a', // dark green
  P: '#e89ab0', // blossom pink
  W: '#8a6a3a', // trunk/wood
  A: '#b5763c', // gourd brown
  a: '#d49a5c', // light gourd
  S: '#c2c2cc', // steel / grill
  O: '#f7931a', // fire orange
  R: '#c4452a', // ember red
  Y: '#f0c850', // sun / yellow
  M: '#9a4a3a', // meat
  C: '#f5f1e8', // card cream
  B: '#5a3e26', // wood counter
  k: '#2a2a22', // shadow ground
  L: '#74acdf', // celeste (Argentine flag)
  w: '#eef2f5', // flag white
};

const GameWindow = styled.div`
  border: ${({ theme }) => theme.border.thick};
  box-shadow: ${({ theme }) => theme.shadow.base};
  background: ${TERM_BG};
  overflow: hidden;
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

const Scene = styled.div`
  padding: ${({ theme }) => theme.space['2']}px;
  background: ${TERM_BG};
  & > svg { display: block; width: 100%; height: auto; }
`;

const GameShot = styled.img`
  display: block;
  width: 100%;
  background: ${TERM_BG};
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 6px ${({ theme }) => theme.space['3']}px 8px;
  background: ${TERM_BG};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 11px;
  color: ${TERM_DIM};
`;

const GameName = styled.span`
  color: ${TERM_TEXT};
  font-weight: 700;
`;

const Sep = styled.span` opacity: 0.45; `;

const Bar = styled.span`
  display: inline-block;
  width: 46px;
  height: 8px;
  background: #333;
  border: 1px solid #4a4a4a;
`;

const BarFill = styled.span<{ $p: number }>`
  display: block;
  height: 100%;
  width: ${({ $p }) => Math.round($p * 100)}%;
  background: ${PALETTE.G};
`;

const PixelScene = ({ rows }: { rows: string[] }) => {
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="crispEdges"
    >
      {rows.flatMap((row, y) =>
        row.split('').map((ch, x) => {
          const fill = PALETTE[ch];
          return fill ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} /> : null;
        }),
      )}
    </svg>
  );
};

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
                    {it.role && <ItemRole> {it.role[language]}</ItemRole>}
                    {it.note && <ItemNote>{it.note[language]}</ItemNote>}
                  </li>
                ))}
              </Items>
            ) : (
              <Value $truncate={r.truncate} title={r.value?.[language] ?? ''}>{r.value?.[language] ?? ''}</Value>
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
                : <Scene><PixelScene rows={g.pixels} /></Scene>}
              <Status>
                <GameName>{g.name}</GameName>
                <Sep>·</Sep><span>{g.count?.[language] ?? ''}</span>
                <Sep>·</Sep><span>{g.time?.[language] ?? ''}</span>
                <Sep>·</Sep><Bar><BarFill $p={g.progress} /></Bar>
                <span>next: {g.next}</span>
              </Status>
            </GameWindow>
          ))}
        </Gallery>
      </ComingSoon>
    </div>
  );
};
