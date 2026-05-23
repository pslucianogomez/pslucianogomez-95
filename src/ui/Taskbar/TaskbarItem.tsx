import styled from 'styled-components';

const Btn = styled.button<{ $active: boolean; $minimized: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['1']}px ${({ theme }) => theme.space['3']}px;
  background: ${({ theme, $active }) => $active ? theme.colors.inkPaper : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.ink : theme.colors.inkPaper};
  border: 2px solid ${({ theme, $active }) => $active ? theme.colors.inkPaper : theme.colors.muted};
  opacity: ${({ $minimized }) => $minimized ? 0.5 : 1};
  text-decoration: ${({ $minimized }) => $minimized ? 'line-through' : 'none'};
  cursor: crosshair;
`;

export interface TaskbarItemProps {
  label: string;
  active: boolean;
  minimized: boolean;
  onClick: () => void;
}

export const TaskbarItem = ({ label, active, minimized, onClick }: TaskbarItemProps) => (
  <Btn $active={active} $minimized={minimized} onClick={onClick}>{label}</Btn>
);
