import styled from 'styled-components';
import { stack } from '../../data/stack';

const Group = styled.section`
  margin-bottom: ${({ theme }) => theme.space['4']}px;
`;

const Category = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  border-bottom: 1px dashed ${({ theme }) => theme.colors.ink};
  padding-bottom: ${({ theme }) => theme.space['1']}px;
  margin: 0 0 ${({ theme }) => theme.space['2']}px 0;
  font-weight: 700;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space['2']}px;
`;

const Badge = styled.span<{ $core?: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['1']}px ${({ theme }) => theme.space['2']}px;
  border: ${({ theme }) => theme.border.thin};
  background: ${({ theme }) => theme.colors.inkPaper};
  box-shadow: ${({ theme, $core }) => $core ? theme.shadow.btc : theme.shadow.base};
  cursor: help;
`;

const LEVEL_LABEL: Record<'advanced' | 'medium' | 'low', string> = {
  advanced: 'ADVANCED',
  medium:   'MEDIUM',
  low:      'LOW',
};

export const Stack = () => (
  <div>
    {stack.map((g) => (
      <Group key={g.category}>
        <Category>{g.category}</Category>
        <Grid>
          {g.items.map((it) => (
            <Badge key={it.name} $core={it.level === 'advanced'} title={LEVEL_LABEL[it.level]}>
              {it.name}
            </Badge>
          ))}
        </Grid>
      </Group>
    ))}
  </div>
);
