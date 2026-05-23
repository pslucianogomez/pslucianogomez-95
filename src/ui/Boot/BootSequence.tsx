import styled, { keyframes, css } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { bootLines, TOTAL_BOOT_MS, COMPACT_BOOT_MS, COMPACT_LINE_COUNT } from './bootLines';

const fadeOut = keyframes`from { opacity: 1 } to { opacity: 0 }`;

const Root = styled.div<{ $exiting: boolean }>`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 10px;
  line-height: 1.5;
  padding: ${({ theme }) => theme.space['4']}px;
  z-index: 9999;
  ${({ $exiting }) => $exiting && css`animation: ${fadeOut} 200ms forwards;`}
`;

const Line = styled.div``;
const blink = keyframes`50% { opacity: 0 }`;
const Cursor = styled.span` animation: ${blink} 700ms steps(2) infinite; `;
const Skip = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.space['3']}px;
  bottom: ${({ theme }) => theme.space['3']}px;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 8px;
  cursor: crosshair;
`;

export const BootSequence = ({ onDone, compact = false }: { onDone: () => void; compact?: boolean }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const lines = compact ? bootLines.slice(0, COMPACT_LINE_COUNT) : bootLines;
  const total = compact ? COMPACT_BOOT_MS : TOTAL_BOOT_MS;

  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delayMs));
    const endTimer = setTimeout(() => setExiting(true), total - 200);
    const doneTimer = setTimeout(() => onDoneRef.current(), total);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(endTimer);
      clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Root $exiting={exiting}>
      {lines.slice(0, visibleCount).map((l, i) => (
        <Line key={i}>{l.text}{i === visibleCount - 1 && <Cursor>_</Cursor>}</Line>
      ))}
      <Skip onClick={() => onDoneRef.current()}>skip</Skip>
    </Root>
  );
};
