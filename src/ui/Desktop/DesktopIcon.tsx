import styled from 'styled-components';
import type { ReactNode } from 'react';

const Wrap = styled.button<{ $highlight: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 78px;
  gap: ${({ theme }) => theme.space['1']}px;
  padding: ${({ theme }) => theme.space['1']}px;
  background: transparent;
  border: 2px dashed ${({ theme, $highlight }) => $highlight ? theme.colors.ink : 'transparent'};
  cursor: crosshair;
`;

const Tile = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.inkPaper};
  border: ${({ theme }) => theme.border.thin};
  box-shadow: 3px 3px 0 ${({ theme }) => theme.colors.ink};
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  onActivate: () => void;
  onHighlight: () => void;
  highlighted: boolean;
}

export const DesktopIcon = ({ label, icon, onActivate, onHighlight, highlighted }: DesktopIconProps) => (
  <Wrap
    $highlight={highlighted}
    onClick={onHighlight}
    onDoubleClick={onActivate}
  >
    <Tile>{icon}</Tile>
    <Label>{label}</Label>
  </Wrap>
);
