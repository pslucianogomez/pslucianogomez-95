import styled from 'styled-components';
import { now } from '../../data/now';
import { useLanguage } from '../../contexts/LanguageContext';

const Row = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
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

const Value = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.md};
  min-width: 0;
  overflow-wrap: anywhere;
`;

export const Now = () => {
  const { language } = useLanguage();
  return (
    <div>
      {now
        .filter((r) => r.value !== null)
        .map((r) => (
          <Row key={r.label}>
            <RowLabel>{r.label}</RowLabel>
            <Value>{r.value![language]}</Value>
          </Row>
        ))}
    </div>
  );
};
