import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { bootLines, TOTAL_BOOT_MS } from './bootLines';

const fadeOut = keyframes`from { opacity: 1 } to { opacity: 0 }`;

const Root = styled.div<{ $exiting: boolean }>`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.md};
  padding: ${({ theme }) => theme.space['6']}px;
  z-index: 9999;
  ${({ $exiting }) => $exiting && `animation: ${fadeOut} 200ms forwards;`}
`;

const Line = styled.div` line-height: 1.7; `;
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

export const BootSequence = ({ onDone }: { onDone: () => void }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delayMs));
    const endTimer = setTimeout(() => setExiting(true), TOTAL_BOOT_MS - 200);
    const doneTimer = setTimeout(onDone, TOTAL_BOOT_MS);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(endTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <Root $exiting={exiting}>
      {bootLines.slice(0, visibleCount).map((l, i) => (
        <Line key={i}>{l.text}{i === visibleCount - 1 && <Cursor>_</Cursor>}</Line>
      ))}
      <Skip onClick={onDone}>skip</Skip>
    </Root>
  );
};
