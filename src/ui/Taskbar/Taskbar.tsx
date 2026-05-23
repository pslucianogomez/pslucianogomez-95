import styled from 'styled-components';
import { useEffect, useState, type ReactNode } from 'react';
import { BlockBadge } from './BlockBadge';

const Bar = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 38px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['2']}px;
  padding: 0 ${({ theme }) => theme.space['2']}px;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.inkPaper};
  border-top: ${({ theme }) => theme.border.thick};
  z-index: 10;
`;

const Start = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.btc};
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xs};
  border: 2px solid ${({ theme }) => theme.colors.inkPaper};
  padding: 5px 10px;
  cursor: crosshair;
  transition: ${({ theme }) => theme.transition};
  &:hover { transform: translate(2px, 2px); }
`;

const Right = styled.span`
  margin-left: auto;
  display: inline-flex;
  gap: ${({ theme }) => theme.space['3']}px;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const Clock = () => {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  const hh = String(t.getHours()).padStart(2, '0');
  const mm = String(t.getMinutes()).padStart(2, '0');
  const offset = -t.getTimezoneOffset() / 60;
  const tz = `GMT${offset >= 0 ? '+' : ''}${offset}`;
  return <span>{hh}:{mm} {tz}</span>;
};

export const Taskbar = ({ items }: { items: ReactNode }) => (
  <Bar>
    <Start aria-label="start" tabIndex={-1}>⬢ Start</Start>
    {items}
    <Right>
      <BlockBadge />
      <Clock />
    </Right>
  </Bar>
);
