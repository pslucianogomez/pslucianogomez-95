import styled from 'styled-components';
import { now } from '../../data/now';
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

export const Now = () => {
  const { language } = useLanguage();
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
    </div>
  );
};
